const mongoose = require('mongoose');
const validator = require("validator");
const {Schema} = mongoose;

const addressSchema = mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
            validate: {
                validator : function(v) {
                    return /\d{5}/.test(v);
                },
                message: props => `${props.value} is not a valid postal Code!`
            }
        },
        city: {
            type: String,
            required: true,
        },
        contact: {
            type: Schema.Types.ObjectId,
            ref: 'Contact'
        }
    }
);

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;

