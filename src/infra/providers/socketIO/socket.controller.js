const {
    agentsService,
    chatsService,
    openaiService,
} = require('../../../services');

const createResourceId = () => {
    const arr = new Uint8Array(12);
    globalThis.crypto.getRandomValues(arr);
    return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
};

const getThreadMessages = async ({ userId, chatId }) => {
    const { messages } = await chatsService.getChatById({
        userId,
        chatId,
    });

    const chatMessages = messages.map((message, index) => {
        var role = '';

        if (index === 0) role = 'system';
        else {
            if (message.authorId == userId) role = 'user';
            else role = 'assistant';
        }

        return {
            role: role,
            content: message.body,
        };
    });

    console.log(chatMessages, 'chatMessages');

    return chatMessages;
};

const getAgent = async ({ userId, agentId }) => {
    const agent = await agentsService.getAgentById({ userId, agentId });

    return agent;
};

class SocketController {
    constructor(io) {
        this.io = io;
        this.onlineUsers = new Map(); // userID -> socketID
        this.activeChatSessions = new Map(); // userID -> activeRoomID
        this.activeChats = new Map();
        this.loadedAgents = new Map();
    }

    onConnection(socket) {
        this.authenticateUser(socket);
        this.setupListeners(socket);
    }

    authenticateUser(socket) {
        // Authentication logic to set socket.user
    }

    setupListeners(socket) {
        socket.on('onConnection', (data) =>
            this.handleOnConnection(socket, data),
        );
        socket.on('joinRoom', (data) => this.handleJoinRoom(socket, data));
        socket.on('newMessage', (message) =>
            this.handleNewMessage(socket, message),
        );
        socket.on('disconnect', () => this.handleDisconnect(socket));
    }

    handleOnConnection(socket, { user }) {
        console.log(
            'CONNECTED. SETTING SOCKET USER AND USER AS ONLINE...',
            `User: `,
            user,
        );

        socket.user = user;
        this.onlineUsers.set(user.id, user);
    }

    handleJoinRoom(socket, { threadId }) {
        if (!socket.user) return;

        console.log(
            'JOINING ROOM...',
            `Room ID: ${threadId} - Member: ${socket?.user?.name}`,
            socket?.user?.id,
            threadId,
        );

        socket.join(threadId);
        this.activeChatSessions.set(socket?.user?.id, threadId);
    }

    async handleNewMessage(socket, { userId, threadId, message }) {
        const activeRoom = this.activeChatSessions.get(userId);

        console.log(
            '@handleNewMessage',
            { userId, threadId, message },
            activeRoom,
        );

        if (activeRoom && activeRoom === threadId) {
            const threadMessages = await getThreadMessages({
                userId,
                chatId: threadId,
            });

            const response = await openaiService.chatCompletion(threadMessages);

            console.log(response);

            const messageData = {
                id: createResourceId(),
                attachments: [],
                body: response.content,
                contentType: 'text',
                createdAt: new Date().toISOString(),
                authorId: '655b488c79298e3bfb205705',
            };

            await chatsService.saveMessage({
                chatId: threadId,
                messageData,
            });

            socket.emit('newMessage', {
                roomId: threadId,
                message: messageData,
            });
        }
    }

    handleDisconnect(socket) {
        let userId = null;

        for (let [key, value] of this.onlineUsers.entries()) {
            if (value === socket.id) {
                userId = key;
                break;
            }
        }

        if (userId) {
            this.onlineUsers.delete(userId);
            this.activeChatSessions.delete(userId);
            // Notify others in the user's active chat room
            // this.io.to(this.activeChatSessions.get(userId)).emit('userLeft', userId);
        }
    }

    // Additional methods and functionalities...
}

module.exports = SocketController;
