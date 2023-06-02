const { authController } = require('../../controllers');
const express = require('express');
const { authValidator } = require('../../validator');
const router = express.Router();
const validate = require('../../middlewares/validator.middleware')
const verifyToken = require('../../middlewares/token.middleware');

router.post('/logout', verifyToken, authController.logout);
router.post('/login', validate(authValidator.login), authController.login);

module.exports = router;