const mongoose = require("mongoose"),
    secretSchema = new mongoose.Schema({
        secret: {
            type: String,
            required: true
        },
        url: {
            type: String,
            unique: true
        },
        name: {
            type: String
        },
        password: {
            type: String
        }
    });

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/secret_db", {useNewUrlParser: true});

module.exports = mongoose.model("Secret", secretSchema);