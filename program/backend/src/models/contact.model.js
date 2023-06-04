const mongoose = require('mongoose');
const validator = require("validator");
const {Schema} = mongoose;

const contactSchema = mongoose.Schema(
    {
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        firstName: {
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
        phoneNumber: {
            type: String,
            required: true,
            validate: {
                validator : function(v) {
                    return /\d{10}/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: 'Address'
        }
    }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;