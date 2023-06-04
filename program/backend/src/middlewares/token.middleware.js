const jwt = require('jsonwebtoken')
const {userService} = require("../services");
const ApiError = require("../errors/ApiError");
const httpStatus = require("http-status");
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(403);
    const decoded = jwt.verify(token, "ThisIsNotSecretAtAll");
    const user = await userService.getUserByEmailAndToken(decoded.email, token);
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Please Authenticate');
    }
    req.token = token;
    req.user = user;
    return next();
}

module.exports = verifyToken;