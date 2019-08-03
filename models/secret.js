const mongoose = require("mongoose"),
    secretSchema = new mongoose.Schema({
        secret: {
            type: String,
            required: true
        },
        url: {
            type: String
        },
        name: {
            type: String
        },
        pwd: {
            type: String,
            expose: true
        }
    });

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/secret_db", 
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

module.exports = mongoose.model("Secret", secretSchema);