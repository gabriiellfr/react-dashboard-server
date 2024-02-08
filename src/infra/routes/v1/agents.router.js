const express = require('express');

const { auth, validate } = require('../../middlewares');

const { agentsController } = require('../../../controllers');

const router = express.Router();

router
    .route('/createAgent')
    .post(
        auth('createAgent'),
        validate(agentsController.createAgent),
        agentsController.createAgent,
    );

router
    .route('/getMyAgents')
    .post(
        auth('getMyAgents'),
        validate(agentsController.getMyAgents),
        agentsController.getMyAgents,
    );

router
    .route('/getAgentById')
    .post(
        auth('getAgentById'),
        validate(agentsController.getAgentById),
        agentsController.getAgentById,
    );

router
    .route('/updateAgentById')
    .post(
        auth('updateAgentById'),
        validate(agentsController.updateAgentById),
        agentsController.updateAgentById,
    );

router
    .route('/getAgentsCopyAllowed')
    .post(
        auth('getAgentsCopyAllowed'),
        validate(agentsController.getAgentsCopyAllowed),
        agentsController.getAgentsCopyAllowed,
    );

router
    .route('/getAgentsByName')
    .post(
        auth('getAgentsByName'),
        validate(agentsController.getAgentsByName),
        agentsController.getAgentsByName,
    );

router
    .route('/getAgentsCopy/:userId')
    .get(
        auth('getAgents'),
        validate(agentsController.getAgentsCopy),
        agentsController.getAgentsCopy,
    );

router
    .route('/copyAgent')
    .post(
        auth('getAgents'),
        validate(agentsController.copyAgent),
        agentsController.copyAgent,
    );

router
    .route('/getAgentsByType/:userId/:agentType')
    .get(
        auth('getAgents'),
        validate(agentsController.getAgentsByType),
        agentsController.getAgentsByType,
    );

router
    .route('/getAllSummaries/:userId')
    .get(
        auth('getAgents'),
        validate(agentsController.getAllSummaries),
        agentsController.getAllSummaries,
    );

router
    .route('/getSummaryById/:summaryId')
    .get(
        auth('getAgents'),
        validate(agentsController.getSummaryById),
        agentsController.getSummaryById,
    );

router
    .route('/createSummary')
    .post(
        auth('getAgents'),
        validate(agentsController.createSummary),
        agentsController.createSummary,
    );

module.exports = router;
