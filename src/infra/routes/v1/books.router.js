const express = require('express');

const booksController = require('../../../controllers/books.controller');

const router = express.Router();

router.post('/getSummary', booksController.getSummary);

module.exports = router;
