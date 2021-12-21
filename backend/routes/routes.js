const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');
const personController = require('../controllers/personController');
const reviewController = require('../controllers/reviewController');
const userController = require('../controllers/userController');

router.get('/movies', movieController.getAllMovies);

router.post('/user', userController.addUser);

module.exports = router;