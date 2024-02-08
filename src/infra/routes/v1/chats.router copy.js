const express = require('express');
const fs = require('fs');
const multer = require('multer');
const OpenAI = require('openai');
const path = require('path');

const booksController = require('../../../controllers/books.controller');

const openAI = require('./openai');

const apiKey = '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';

const router = express.Router();
const upload = multer({ dest: path.join(__dirname, 'uploads') });
const client = new OpenAI({ apiKey });

async function transcribeAudio(filePath) {
    const audioFile = fs.createReadStream(filePath);
    const transcriptResponse = await openAI.whisper(audioFile);

    return transcriptResponse;
}

router.post('/audioToText', upload.single('audio'), async (req, res) => {
    const tempPath = path.join(req.file.path);
    const targetPath = path.join(
        __dirname,
        `./uploads/${req.file.filename}.mp3`,
    );

    try {
        // Rename the file to have an .mp3 extension
        fs.renameSync(tempPath, targetPath);

        // Call the function to transcribe audio
        const transcript = await transcribeAudio(targetPath);
        res.json(transcript);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing the audio file');
    }
});

module.exports = router;
