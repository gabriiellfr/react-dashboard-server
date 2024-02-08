const oai = require('openai');

const openAiClient = new oai({
    apiKey: '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',
});

const roles = [
    {
        role: 'system',
        content:
            'You are the most advanced assistant in the word. Please provide as a good service in Portugues Brasileiro, use uma linguagem informal.',
    },
];

const openaiService = {
    chatCompletionX: async (messages, options = { model: 'gpt-4' }) => {
        try {
            messages.unshift(roles[0]);

            return {
                role: 'system',
                content:
                    'You are the most advanced assistant in the word. Please provide as a good service in Portugues Brasileiro, use uma linguagem informal.',
            };
        } catch (error) {
            throw error;
        }
    },
    chatCompletion: async (
        messages,
        options = { model: 'gpt-4-1106-preview' },
    ) => {
        try {
            const response = await openAiClient.chat.completions.create({
                messages,
                model: options.model,
            });

            return response.choices[0].message;
        } catch (error) {
            throw error;
        }
    },
    chatCompletionXXX: async (
        prompt,
        options = { model: 'gpt-3.5-turbo-1106' },
    ) => {
        try {
            const response = await openAiClient.chat.completions.create({
                messages: [{ role: 'user', content: prompt }],
                model: options.model,
            });

            return response.choices[0].message.content;
        } catch (error) {
            throw error;
        }
    },
};

module.exports = openaiService;
