import { User } from '../models'

const getUserByEmail = async (email) => {
    return User.findOne({ email });
}

const getUserById = async (id) => {
    return User.findById(id);
}

module.exports = {
    getUserById,
    getUserByEmail
};