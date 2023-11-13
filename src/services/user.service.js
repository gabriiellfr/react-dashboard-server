const createUser = async (userBody) => {
    console.log('createUser');
};

const queryUsers = async (filter, options) => {
    console.log('queryUsers');
};

const getUserById = async (id) => {
    console.log('getUserById');
};

const getUserByEmail = async (email) => {
    console.log('getUserById');
};

const updateUserById = async (userId, updateBody) => {
    console.log('getUserById');
};

const deleteUserById = async (userId) => {
    console.log('deleteUserById');
};

module.exports = {
    createUser,
    queryUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
};
