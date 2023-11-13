const loginUserWithEmailAndPassword = async (email, password) => {
    console.log('loginUserWithEmailAndPassword');
};

const logout = async (refreshToken) => {
    console.log('logout');
};

const refreshAuth = async (refreshToken) => {
    console.log('lorefreshAuthgout');
};

const resetPassword = async (resetPasswordToken, newPassword) => {
    console.log('resetPassword');
};

const verifyEmail = async (verifyEmailToken) => {
    console.log('verifyEmail');
};

module.exports = {
    loginUserWithEmailAndPassword,
    logout,
    refreshAuth,
    resetPassword,
    verifyEmail,
};
