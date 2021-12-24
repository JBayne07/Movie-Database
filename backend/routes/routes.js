const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');
const personController = require('../controllers/personController');
const reviewController = require('../controllers/reviewController');
const userController = require('../controllers/userController');

router.get('/user', userController.findUser);
router.get('/users/:id', userController.getUser);
router.get('/users', userController.getAllUsers);
router.post('/users', userController.addUser);

router.get('/movies/:id', movieController.getMovie);
router.get('/movies', movieController.getAllMovies);
router.post('/movies', movieController.addMovie);

router.get('/people/:id', personController.getPerson);
router.get('/people', personController.getAllPeople);
router.post('/people', personController.addPerson);

module.exports = router;