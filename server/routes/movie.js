const router = require('express').Router();
const MovieModel = require("../models/movie.model");

router.route('/insert').post( async (req,res) => {
    const movieName = req.body.movieName;
    const watchTime = req.body.lastWatched;
    const rate = req.body.rating;

    const movie = new MovieModel({movieName: movieName, watchDate: watchTime, rating: rate});
    try {
        await movie.save();
        res.send("inserted data");  
    } catch(err) {
        console.log(err);
    }
}); 

router.route('/read').get( async (req,res) => {
    MovieModel.find({}, (err, result) => {
        if(err) res.send(err);
        res.send(result);
    })
});

module.exports = router;