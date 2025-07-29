import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        movies: [],
        
        selectedMovie:null
    },
    reducers: {
        setMovies: (state, action)=>{
            state.movies = action.payload
        },
        setSelectedMovie: (state, action)=>{
            state.selectedMovie = action.payload
        }
    }
});

export const {setMovies, setSelectedMovie} = movieSlice.actions;
export default movieSlice.reducer;