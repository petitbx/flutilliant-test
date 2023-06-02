const mongoose= require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
//const { roles } = require('../enums/role.enum')

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
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('Password invalid, must contain one number and one letter');
                }
            }
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        tokens:[{
            token:{
                type:String,
                required: true
            }
        }]
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

userSchema.methods.newAuthToken = async function (token) {
    const user = this;
    user.tokens = user.tokens.concat({ token })
    await user.save();
}

userSchema.methods.removeToken = async function (token) {
    const user = this;
    user.tokens = user.tokens.filter ((userToken) => {
        return userToken.token !== token;
    })
    await user.save();
}

const User = mongoose.model('User', userSchema);

module.exports = User;