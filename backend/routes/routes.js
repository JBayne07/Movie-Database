const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');
const personController = require('../controllers/personController');
const reviewController = require('../controllers/reviewController');
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.get('/users/:id', userController.getUser);
router.get('/users', userController.getAllUsers);
router.post('/users', userController.addUser);
router.post('/users/watchlist/:id', userController.addWatchlist);
router.put('/users/watchlist/:id', userController.removeWatchlist);
router.post('/users/followperson/:id', userController.followPerson);
router.put('/users/unfollowperson/:id', userController.unfollowPerson);
router.post('/users/followuser/:id', userController.followUser);
router.put('/users/unfollowuser/:id', userController.unfollowUser);
router.post('/users/contribute', userController.changeContribute);

router.get('/movies/:id', movieController.getMovie);
router.get('/movies', movieController.getAllMovies);
router.post('/movies', movieController.addMovie);

router.get('/people/:id', personController.getPerson);
router.get('/people', personController.getAllPeople);
router.post('/people', personController.addPerson);

router.post('/reviews', reviewController.addReview);
router.get('/reviews', reviewController.getReview);

module.exports = router;