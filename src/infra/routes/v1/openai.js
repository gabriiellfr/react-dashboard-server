const oai = require('openai');

const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

const openAiClient = new oai({
    apiKey: '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',
});

const openAi = {
    whisper: async (audioFile, options = { model: 'gpt-3.5-turbo-1106' }) => {
        const formData = new FormData();

        formData.append('file', audioFile);
        formData.append('model', 'whisper-1');

        try {
            const response = await fetch(
                'https://api.openai.com/v1/audio/transcriptions',
                {
                    method: 'POST',
                    headers: {
                        Authorization:
                            'Bearer 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',
                        ...formData.getHeaders(), // This will include the 'Content-Type' header
                    },
                    body: formData,
                },
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error sending audio file to OpenAI:', error);
        }
    },
};

module.exports = openAi;
