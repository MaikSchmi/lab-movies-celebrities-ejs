const { Schema, model } = require("mongoose");

const celebrity = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String,
})

const CelebrityModel = model("celebrity", celebrity);
module.exports = CelebrityModel;