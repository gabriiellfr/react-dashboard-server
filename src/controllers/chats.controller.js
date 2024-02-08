const httpStatus = require('http-status');

const { chatsService } = require('../services');

const { catchAsync } = require('../utils');

const createChat = catchAsync(async (req, res) => {
    const { chatData } = req.body;

    const chat = await chatsService.createChat({ chatData });

    res.status(httpStatus.CREATED).send(chat);
});

const getAllChats = catchAsync(async (req, res) => {
    const { userId } = req.body;

    const chats = await chatsService.getAllChats({ userId });

    res.status(httpStatus.CREATED).send(chats);
});

const getChatById = catchAsync(async (req, res) => {
    const { userId, chatId } = req.body;

    const chat = await chatsService.getChatById({ userId, chatId });

    res.status(httpStatus.CREATED).send(chat);
});

const getChatByParticipants = catchAsync(async (req, res) => {
    const { userId, contactId } = req.body;

    const chat = await chatsService.getChatByParticipants({
        userId,
        contactId,
    });

    res.status(httpStatus.CREATED).send(chat);
});

const saveMessage = catchAsync(async (req, res) => {
    const { chatId, messageData } = req.body;

    await chatsService.saveMessage({ chatId, messageData });

    res.status(httpStatus.NO_CONTENT).send();
});

const generateMindmap = catchAsync(async (req, res) => {
    const { text } = req.body;
    const { keywords, response } = await chatsService.generateMindmap({ text });

    res.status(httpStatus.CREATED).send({ keywords, response });
});

module.exports = {
    createChat,
    getAllChats,
    getChatById,
    getChatByParticipants,
    saveMessage,

    generateMindmap,
};
