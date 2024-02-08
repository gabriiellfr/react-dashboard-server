const httpStatus = require('http-status');
const openaiService = require('./openai.service');

const { Agent, User, Summary } = require('../models');
const { ApiError, fillPromptData } = require('../utils');

const createAgent = async ({ userId, agentData }) => {
    const newAgent = await Agent.create(agentData);

    await User.updateOne({ _id: userId }, { $push: { agents: newAgent.id } });

    return newAgent;
};

const getMyAgents = async ({ userId }) => {
    const user = await User.findOne({
        _id: userId,
    });

    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    const agents = await Agent.find({
        _id: { $in: user.agents },
        createdBy: user.id,
    });

    return agents;
};

const getAgentById = async ({ userId, agentId }) => {
    if (!userId || !agentId)
        throw new ApiError(httpStatus.NOT_FOUND, 'UserId or AgentId not found');

    const agent = await Agent.findOne({ _id: agentId });

    if (!agent)
        throw new ApiError(
            httpStatus.NOT_FOUND,
            `Agent not found ${userId} -  ${agentId}`,
        );

    if (userId !== agent.createdBy && agent.allowCopy === false)
        throw new ApiError(httpStatus.NOT_FOUND, 'Agent is private');

    return agent;
};

const updateAgentById = async ({ userId, agentData }) => {
    return await Agent.updateOne(
        { _id: agentData.id, createdBy: userId },
        { $set: agentData },
    );
};

const getAgentsCopyAllowed = async ({ userId }) => {
    if (!userId) throw new ApiError(httpStatus.NOT_FOUND, 'userId not found');

    const agents = await Agent.find({
        createdBy: { $ne: userId },
        allowCopy: true,
    });

    return agents;
};

const getAgentsByName = async ({ userId, name }) => {
    if (!userId) throw new ApiError(httpStatus.NOT_FOUND, 'userId not found');

    const agents = await Agent.find({
        createdBy: userId,
        name: { $regex: name, $options: 'i' },
        agentType: 'virtual-assistant',
    });

    return agents;
};

const getAllAgents = async (usedId) => {
    const agents = await Agent.find({ createdBy: usedId });
    return agents;
};

const getAgentsCopy = async (usedId) => {
    const agents = await Agent.find({
        createdBy: { $ne: usedId },
    });
    return agents;
};

const getAgentsByType = async (usedId, agentType) => {
    const agents = await Agent.find({ createdBy: usedId, agentType });
    return agents;
};

const copyAgent = async (agentData) => {
    const agent = {
        agentType: agentData.agentType,
        allowCopy: agentData.allowCopy,
        createdBy: agentData.createdBy,
        description: agentData.description,
        initialPrompt: agentData.initialPrompt,
        name: agentData.name,
        skills: agentData.skills,
    };
    return await Agent.create(agent);
};

const deleteUserById = async (userId) => {
    const user = await getUserById(userId);

    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    await user.remove();
    return user;
};

const createSummary = async (bookData) => {
    summary = await Summary.create({
        ...bookData,
        summary: 'Please wait, AI is creating summary...',
    });
    addSummary(summary);

    return true;
};

const addSummary = async (bookData) => {
    const agent = await getAgentById(bookData.agentId);

    const prompt = await fillPromptData(agent.initialPrompt, bookData);

    const summary = await openAI.chatCompletion(prompt);

    return await Summary.updateOne({ _id: bookData.id }, { $set: { summary } });
};

const getAllSummaries = async (userId) => {
    const summaries = await Summary.find({ createdBy: userId });
    return summaries;
};

const getSummaryById = async (summaryId) => {
    const summary = await Summary.findOne({ _id: summaryId });
    return summary;
};

module.exports = {
    createAgent,
    getMyAgents,
    getAgentById,
    updateAgentById,
    getAgentsCopyAllowed,
    getAgentsByName,

    getAllAgents,

    getAgentsByType,

    getAgentsCopy,
    copyAgent,

    createSummary,
    getAllSummaries,
    getSummaryById,
};
