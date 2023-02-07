const { Schema, model } = require("mongoose");

const movie = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: {
        type: [Schema.Types.ObjectId],
        ref: "celebrity",
    },
})

const MovieModel = model("movie", movie);
module.exports = MovieModel;