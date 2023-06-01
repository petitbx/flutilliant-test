const mongoose= require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { roles } = require('../enums/role.enum')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid Email');
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 8,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-z]A-Z/)) {
                    throw new Error('Password invalid, must contain one number and one letter');
                }
            }
        },
        role: {
            type: String,
            enum: roles,
            default: 'user'
        }
    }
);

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;