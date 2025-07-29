import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
    film_name: { type: String, required: true },
    imdb_rating: { type: String },
    filam_description: { type: String },
    filam_language: [{ type: String }],
    filam_genre: [{ type: String }],
    downloadable_link: { type: String },
    isMoviePlayAble: { type: Boolean, default: false },
    filam_pics: [{ type: String }],
    filam_video: { type: String }
}, { timestamps: true });

export const Movie = mongoose.model("Movie", movieSchema);