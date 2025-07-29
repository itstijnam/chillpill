import { User } from "../models/user.model.js";
import { Movie } from "../models/movie.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDatauri from "../utils/datauri.js";
import { streamUpload } from "../utils/streamUpload.js";


const extractPublicId = (url, type = 'image') => {
    try {
        const parts = url.split('/');
        const fileName = parts[parts.length - 1]; // example: abc123.jpg
        const publicIdWithExt = fileName.split('.')[0]; // abc123
        const folder = type === 'video' ? 'movies/videos' : 'movies/posters';
        return `${folder}/${publicIdWithExt}`;
    } catch (err) {
        return null;
    }
};


export const uploadMovie = async (req, res) => {
    try {
        const {
            film_name,
            imdb_rating,
            filam_description,
            filam_language,
            filam_genre,
            downloadable_link,
            isMoviePlayAble = 'false'
        } = req.body;


        const files = req.files;
        const imageFile = files?.filam_pics?.[0];
        const videoFile = files?.filam_video?.[0];

        if (!film_name) {
            return res.status(400).json({ success: false, message: 'Please enter movie name' });
        }

        if (!imageFile) {
            return res.status(400).json({ success: false, message: 'Please upload a movie poster' });
        }

        const urlPattern = /^https?:\/\/.+/;
        if (!urlPattern.test(downloadable_link)) {
            return res.status(400).json({ success: false, message: 'Invalid download link' });
        }

        // Upload poster image to Cloudinary
        const imageUri = getDatauri(imageFile);
        const uploadedImage = await cloudinary.uploader.upload(imageUri, {
            folder: 'movies/posters',
        });

        // Validate user is the owner
        const ownerId = req.id;
        const owner = await User.findById(ownerId);
        if (!owner) {
            return res.status(400).json({ success: false, message: 'Author not found' });
        }
        if (owner.username !== process.env.owner_key) {
            return res.status(403).json({ success: false, message: 'Only owner can upload movies' });
        }

        // Handle video upload only if playable movie
        let uploadedVideoUrl = null;

        if (isMoviePlayAble === 'true') {
            if (!videoFile) {
                return res.status(400).json({ success: false, message: 'Movie video required if isMoviePlayAble is true' });
            }

            const uploadedVideo = await streamUpload(videoFile.buffer, {
                resource_type: 'video',
                folder: 'movies/videos',
            });

            uploadedVideoUrl = uploadedVideo.secure_url;
        }

        const newMovie = await Movie.create({
            film_name,
            imdb_rating,
            filam_description,
            filam_language: Array.isArray(filam_language) ? filam_language : [filam_language],
            filam_genre: Array.isArray(filam_genre) ? filam_genre : [filam_genre],
            downloadable_link,
            isMoviePlayAble: isMoviePlayAble === 'true',
            filam_pics: [uploadedImage.secure_url],
            filam_video: uploadedVideoUrl,
        });

        return res.status(200).json({
            success: true,
            message: "Movie uploaded successfully",
            movie: newMovie
        });

    } catch (error) {
        console.error("uploadMovie error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find().sort({ createdAt: -1 }); // latest first
        return res.status(200).json({
            success: true,
            count: movies.length,
            movies
        });
    } catch (error) {
        console.error("getAllMovies error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch movies"
        });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }

        return res.status(200).json({
            success: true,
            movie
        });
    } catch (error) {
        console.error("getMovieById error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch movie"
        });
    }
};

export const editMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            film_name,
            imdb_rating,
            filam_description,
            filam_language,
            filam_genre,
            downloadable_link,
            isMoviePlayAble = 'false'
        } = req.body;

        const files = req.files;
        const newPoster = files?.filam_pics?.[0];
        const newVideo = files?.filam_video?.[0];

        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        // Verify ownership
        const ownerId = req.id;
        const owner = await User.findById(ownerId);
        if (!owner || owner.username !== process.env.owner_key) {
            return res.status(403).json({ success: false, message: 'Unauthorized to edit this movie' });
        }

        // Update poster if new one is uploaded
        if (newPoster) {
            // Delete old poster(s) from Cloudinary
            for (const url of movie.filam_pics) {
                const publicId = extractPublicId(url);
                await cloudinary.uploader.destroy(publicId);
            }

            const posterUri = getDatauri(newPoster);
            const uploadedPoster = await cloudinary.uploader.upload(posterUri, {
                folder: 'movies/posters',
            });
            movie.filam_pics = [uploadedPoster.secure_url];
        }

        // Update video if new one is uploaded
        if (newVideo) {
            if (movie.filam_video) {
                const publicId = extractPublicId(movie.filam_video, 'video');
                await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
            }

            const videoUri = getDatauri(newVideo);
            const uploadedVideo = await streamUpload(newVideo.buffer, {
                resource_type: 'video',
                folder: 'movies/videos',
            });

            movie.filam_video = uploadedVideo.secure_url;
        }

        // Update all other fields
        if (film_name) movie.film_name = film_name;
        if (imdb_rating) movie.imdb_rating = imdb_rating;
        if (filam_description) movie.filam_description = filam_description;
        if (downloadable_link) movie.downloadable_link = downloadable_link;
        if (filam_language) movie.filam_language = Array.isArray(filam_language) ? filam_language : [filam_language];
        if (filam_genre) movie.filam_genre = Array.isArray(filam_genre) ? filam_genre : [filam_genre];
        movie.isMoviePlayAble = isMoviePlayAble === 'true';

        await movie.save();

        return res.status(200).json({
            success: true,
            message: "Movie updated successfully",
            movie
        });

    } catch (error) {
        console.error("editMovie error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        // Authorization check
        const owner = await User.findById(req.id);
        if (!owner || owner.username !== process.env.owner_key) {
            return res.status(403).json({ success: false, message: 'Unauthorized to delete this movie' });
        }

        // Delete poster(s) from Cloudinary
        if (movie.filam_pics && movie.filam_pics.length > 0) {
            for (const url of movie.filam_pics) {
                const publicId = extractPublicId(url);
                if (publicId) {
                    await cloudinary.uploader.destroy(publicId);
                }
            }
        }

        // Delete video if present
        if (movie.filam_video) {
            const videoPublicId = extractPublicId(movie.filam_video, 'video');
            if (videoPublicId) {
                await cloudinary.uploader.destroy(videoPublicId, { resource_type: 'video' });
            }
        }

        // Remove the movie from DB
        await Movie.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: 'Movie deleted successfully' });

    } catch (error) {
        console.error("deleteMovie error:", error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
