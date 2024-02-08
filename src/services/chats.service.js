const httpStatus = require('http-status');
const nlp = require('compromise');

const { Chat } = require('../models');
const { ApiError } = require('../utils');
const openaiService = require('./openai.service');

const createChat = async ({ chatData }) => {
    if (!chatData)
        throw new ApiError(httpStatus.NOT_FOUND, 'chatData not found');

    return await Chat.create(chatData);
};

const getAllChats = async ({ userId }) => {
    if (!userId) throw new ApiError(httpStatus.NOT_FOUND, 'userId  not found');

    return await Chat.find({ participantIds: userId });
};

const getChatById = async ({ userId, chatId }) => {
    console.log({ userId, chatId });
    if (!userId || !chatId)
        throw new ApiError(httpStatus.NOT_FOUND, 'userId or chatId not found');

    const chat = await Chat.findById({ _id: chatId });

    if (!chat) throw new ApiError(httpStatus.NOT_FOUND, 'chat not found');

    return chat;
};

const getChatByParticipants = async ({ userId, contactId }) => {
    if (!userId || !contactId)
        throw new ApiError(
            httpStatus.NOT_FOUND,
            'userId or contactId not found',
        );

    const chats = await Chat.findOne({
        participantIds: { $size: 2, $all: [userId, contactId] },
        type: 'ONE_TO_ONE',
    });

    return chats || {};
};

const saveMessage = async ({ chatId, messageData }) => {
    console.log('saveMessage', { chatId, messageData });
    if (!chatId || !messageData)
        throw new ApiError(
            httpStatus.NOT_FOUND,
            'chatId or messageData not found',
        );

    return await Chat.updateOne(
        { _id: chatId },
        { $push: { messages: messageData } },
    );
};

const extractKeywords = async (text) => {
    let doc = await nlp(text);
    let nouns = await doc.nouns().out('array');
    let adjectives = await doc.adjectives().out('array');
    let verbs = await doc.verbs().out('array');
    // Combine and deduplicate keywords
    let keywords = await [...new Set([...nouns, ...adjectives, ...verbs])];
    return keywords;
};

const generateMindmap = async ({ text }) => {
    const response = await openaiService.chatCompletion(text);

    keywords = await extractKeywords(response);

    console.log(response, keywords);

    return { keywords, response };
};

module.exports = {
    createChat,
    getAllChats,
    getChatById,
    getChatByParticipants,
    saveMessage,
    generateMindmap,
};
