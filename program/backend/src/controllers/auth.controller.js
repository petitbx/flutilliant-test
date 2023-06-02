require('express-async-errors');
const {authService, userService} = require("../services");
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const token = jwt.sign({
        name: user.name,
        email: user.email,
        role: user.role
    }, 'ThisIsNotSecretAtAll', {expiresIn: 604800})
    await user.newAuthToken(token);
    res.json({ access_token: token });
};

const logout = async (req, res) => {
    const user = req.user;
    await user.removeToken(req.token);
    res.json({message: "Deconnected"});
}

module.exports = {
    login,
    logout
}