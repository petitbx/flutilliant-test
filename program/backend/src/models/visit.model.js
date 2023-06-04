const mongoose = require('mongoose');
const validator = require("validator");
const {Schema} = mongoose;

const visitSchema = mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        nbArticlesSold: {
            type: Number,
            required: true,
        },
        turnover: {
            type: Number,
            required: true,
        },
        nextVisitDate: {
            type: Date,
            required: true,
        },
        forecastTurnover: {
            type: Number,
            required: true,
        },
        forecastNbArticles: {
            type: Number,
            required: true,
        },
        salesRep: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        contact: {
            type: Schema.Types.ObjectId,
            ref: 'Contact'
        }
    }
);

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;