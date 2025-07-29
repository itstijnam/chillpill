
import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { deleteMovie, editMovie, getAllMovies, getMovieById, uploadMovie } from '../controllers/movie.controller.js';
import multiUpload from '../middlewares/multer.js';

const router = express.Router();


// router.route('/add').post(isAuthenticated, upload.single('filam_pics'), uploadMovie);
router.route('/add').post(isAuthenticated, multiUpload, uploadMovie);
router.route('/getmovies').get(getAllMovies);
router.route('/movie/:id').get(getMovieById);
router.route('/update/:id').put(isAuthenticated, editMovie);
router.route('/delete/:id').put(isAuthenticated, deleteMovie);

export default router;