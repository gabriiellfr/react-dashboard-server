const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const agentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        initialPrompt: {
            type: String,
            required: true,
            trim: true,
        },
        skills: [
            {
                type: String,
                default: '',
            },
        ],
        agentType: {
            type: String,
            required: true,
            trim: true,
        },
        avatar: {
            type: String,
            default: '',
            trim: true,
        },
        allowCopy: {
            type: Boolean,
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true, // Automatically creates createdAt and updatedAt fields
    },
);

// add plugin that converts mongoose to json
agentSchema.plugin(toJSON);
agentSchema.plugin(paginate);

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
