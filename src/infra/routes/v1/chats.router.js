const express = require('express');

const chatsController = require('../../../controllers/chats.controller');

const router = express.Router();

router.post('/createChat', chatsController.createChat);
router.post('/getAllChats', chatsController.getAllChats);
router.post('/getChatById', chatsController.getChatById);
router.post('/getChatByParticipants', chatsController.getChatByParticipants);
router.post('/saveMessage', chatsController.saveMessage);
router.post('/generateMindmap', chatsController.generateMindmap);

module.exports = router;
