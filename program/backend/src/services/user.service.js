const { User } = require('../models')

const getUserByEmail = async (email) => {
    return User.findOne({ email });
}

const getUserById = async (id) => {
    return User.findById(id);
}

const getUserByEmailAndToken = async (email, token) => {
    return User.findOne({
        email: email,
        'tokens.token': token
    });
}

module.exports = {
    getUserById,
    getUserByEmail,
    getUserByEmailAndToken
};