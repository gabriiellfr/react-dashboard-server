const config = require('../config/config');

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
    console.log('generateToken');
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    console.log('saveToken');
};

const verifyToken = async (token, type) => {
    console.log('verifyToken');
};

const generateAuthTokens = async (user) => {
    console.log('generateAuthTokens');
};

const generateResetPasswordToken = async (email) => {
    console.log('generateResetPasswordToken');
};

const generateVerifyEmailToken = async (user) => {
    console.log('generateVerifyEmailToken');
};

module.exports = {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthTokens,
    generateResetPasswordToken,
    generateVerifyEmailToken,
};
