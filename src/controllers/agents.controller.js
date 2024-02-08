const httpStatus = require('http-status');

const { agentsService } = require('../services');

const { catchAsync } = require('../utils');

const createAgent = catchAsync(async (req, res) => {
    const { userId, agentData } = req.body;

    const newAgent = await agentsService.createAgent({ userId, agentData });

    res.status(httpStatus.CREATED).send(newAgent);
});

const getMyAgents = catchAsync(async (req, res) => {
    const { userId } = req.body;

    const agents = await agentsService.getMyAgents({ userId });

    res.status(httpStatus.CREATED).send(agents);
});

const getAgentById = catchAsync(async (req, res) => {
    const { userId, agentId } = req.body;

    const agent = await agentsService.getAgentById({ userId, agentId });

    res.status(httpStatus.CREATED).send(agent);
});

const updateAgentById = catchAsync(async (req, res) => {
    const { userId, agentData } = req.body;

    await agentsService.updateAgentById({ userId, agentData });

    res.status(httpStatus.NO_CONTENT).send();
});

const getAgentsCopyAllowed = catchAsync(async (req, res) => {
    const { userId } = req.body;

    const agents = await agentsService.getAgentsCopyAllowed({ userId });

    res.status(httpStatus.CREATED).send(agents);
});

const getAgentsByName = catchAsync(async (req, res) => {
    const { userId, name } = req.body;

    const agents = await agentsService.getAgentsByName({ userId, name });

    res.status(httpStatus.CREATED).send(agents);
});

const getAllAgents = catchAsync(async (req, res) => {
    const agents = await agentsService.getAllAgents(req.params.userId);
    res.status(httpStatus.CREATED).send(agents);
});

const getAgentsCopy = catchAsync(async (req, res) => {
    const agents = await agentsService.getAgentsCopy(req.params.userId);
    res.status(httpStatus.CREATED).send(agents);
});

const getAgentsByType = catchAsync(async (req, res) => {
    const agents = await agentsService.getAgentsByType(
        req.params.userId,
        req.params.agentType,
    );
    res.status(httpStatus.CREATED).send(agents);
});

const copyAgent = catchAsync(async (req, res) => {
    await agentsService.copyAgent(req.body);
    res.status(httpStatus.NO_CONTENT).send();
});

const getAllSummaries = catchAsync(async (req, res) => {
    const summaries = await agentsService.getAllSummaries(req.params.userId);
    res.status(httpStatus.CREATED).send(summaries);
});

const getSummaryById = catchAsync(async (req, res) => {
    const summary = await agentsService.getSummaryById(req.params.summaryId);
    res.status(httpStatus.CREATED).send(summary);
});

const createSummary = catchAsync(async (req, res) => {
    const summary = await agentsService.createSummary(req.body);
    res.status(httpStatus.CREATED).send(summary);
});

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
