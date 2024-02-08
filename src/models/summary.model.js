const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const summarySchema = new mongoose.Schema(
    {
        author: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        writingStyle: {
            type: String,
            required: true,
            trim: true,
        },
        textSize: {
            type: Number,
            required: true,
        },
        language: {
            type: String,
            required: true,
            trim: true,
        },
        summary: {
            type: String,
            required: true,
            trim: true,
        },
        agentId: {
            type: String,
            required: true,
            trim: true,
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
summarySchema.plugin(toJSON);
summarySchema.plugin(paginate);

const Summary = mongoose.model('BookSummaries', summarySchema);

module.exports = Summary;
