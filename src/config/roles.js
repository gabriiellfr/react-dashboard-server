const allRoles = {
    user: [
        'createAgent',
        'getMyAgents',
        'getAgentById',
        'updateAgentById',
        'getAgentsCopyAllowed',
        'getAgentsByName',
    ],
    admin: ['*'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
    roles,
    roleRights,
};
