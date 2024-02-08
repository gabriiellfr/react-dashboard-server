const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const messageSchema = new mongoose.Schema({
    id: String, // Assuming this is an ObjectID
    attachments: [String], // Array of strings if there are multiple attachments
    body: String,
    contentType: String,
    createdAt: String,
    authorId: String, // Assuming this is an ObjectID
});

const chatSchema = new mongoose.Schema(
    {
        messages: {
            type: [messageSchema],
            required: true,
            trim: true,
        },
        participantIds: {
            type: [String], // Assuming these are ObjectIDs
            required: true,
            trim: true,
        },
        type: {
            type: String,
            required: true,
            trim: true,
        },
        createdBy: {
            type: String, // Assuming this is an ObjectID
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

chatSchema.plugin(toJSON);
chatSchema.plugin(paginate);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
