const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema ({
    movieName: {
        type: String,
        required: true,
    },
    watchDate: {
        type: Date, 
        required: true, 
    },
    rating: {
        type: Number, 
        required: true,
    },
    review: {
        type: String, 
        required: false,
    },
});

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;