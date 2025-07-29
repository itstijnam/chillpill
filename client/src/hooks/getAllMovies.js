import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { baseUrl } from "../utils/baseUrl";
import { setMovies } from "../redux/movieSlice";

const useGetAllMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllMovies = async () => {
            try {
                const res = await axios.get(`${baseUrl}/movie/getmovies`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setMovies(res.data.movies))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllMovies();
    }, []);
};

export default useGetAllMovies;