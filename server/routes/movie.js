const router = require('express').Router();
const MovieModel = require("../models/movie.model");

router.route('/insert').post( async (req,res) => {
    const movieName = req.body.movieName;
    const watchTime = req.body.lastWatched;
    const rate = req.body.rating;
    const review = req.body.review;

    const movie = new MovieModel({movieName: movieName, watchDate: watchTime, rating: rate, review: review});
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

router.route('/update').put( async (req,res) => {
    const newName = req.body.newName;
    const id = req.body.id;

    try {
        await MovieModel.findById(id, (err, updatedMovie) => {
            updatedMovie.movieName = newName;
            updatedMovie.save();
            res.send("Updated data");
        });
    } catch(err) {
        console.log(err);
    }
}); 

router.route('/delete/:id').delete( async (req,res) => {
    const id = req.params.id;   
    res.send(id);
    await MovieModel.findByIdAndRemove(id).exec();
    res.send("Deleted");
});

module.exports = router;