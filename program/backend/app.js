const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');

mongoose.connect('mongodb://127.0.0.1:27017/flutilient', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

const publicRoutes = require('./src/routes/public/auth.route')
const bodyParser = require("body-parser");

const cors = require('cors');

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use('/', publicRoutes);
const whitelist = ["http://localhost:8081"]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({error: err});
});

app.listen(3000, () => {
    console.log('Server started.')
})

