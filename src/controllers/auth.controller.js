const httpStatus = require('http-status');

const userService = require('../services/user.service');
const authService = require('../services/auth.service');
const tokenService = require('../services/token.service');

const register = async (req, res) => {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(
        email,
        password,
    );
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
};

const logout = async (req, res) => {
    console.log('dfsfdsfs');
};

const refreshTokens = async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
};

const forgotPassword = async (req, res) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(
        req.body.email,
    );
    await emailService.sendResetPasswordEmail(
        req.body.email,
        resetPasswordToken,
    );
    res.status(httpStatus.NO_CONTENT).send();
};

const resetPassword = async (req, res) => {
    await authService.resetPassword(req.query.token, req.body.password);
    res.status(httpStatus.NO_CONTENT).send();
};

const sendVerificationEmail = async (req, res) => {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(
        req.user,
    );
    await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
    res.status(httpStatus.NO_CONTENT).send();
};

const verifyEmail = async (req, res) => {
    await authService.verifyEmail(req.query.token);
    res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail,
};
