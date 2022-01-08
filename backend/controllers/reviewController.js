const Review = require('../models/reviewModel');
const Movie = require('../models/movieModel');

module.exports.addReview = async (req, res) => {
    console.log('add review', req.body);
    if(req.session.userId){
        let review = new Review({
            score: req.body.score,
            summary: req.body.summary,
            details: req.body.details,
            user: req.session.userId
        })
    
        await review.save(async (err, result) => {
            if(err) return console.log(err);
            const movieResult = await Movie.findByIdAndUpdate(req.body.movieId, {$push:{reviews: result._id}}).exec();
            console.log(result);
            console.log(movieResult);
    
    
            res.status(200).json(movieResult);
        });
    }else{
        res.status(400).json({error: 'User is not logged in'});
    }
    

    

}