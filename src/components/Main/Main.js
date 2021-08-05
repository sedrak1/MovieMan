import axios from "axios";
import { useEffect, useState } from "react";
import cn from "classnames";
import reactDom from "react-dom";

const API_KEY = "e8e227add2a2e5c168f7c3845928d8db";
const API_URL = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const navBar = cn({
    flex: true,
    "text-center": true,
    "justify-around	": true,
});
export default function GetAllMovies() {
    let [film, setFilm] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US`)
            .then((response) => setFilm(response.data.results));
    }, []);

    return (
        <div className="App">
            <header>
                <nav className={navBar}>
                    <ul>
                        <a href="/">Home</a>
                    </ul>
                    <ul>
                        <a href="/favorites">Favorites</a>
                    </ul>
                    <ul>
                        <a href="/login">Log In</a>
                    </ul>
                </nav>
            </header>
            <div>
              {film.map(e=> {return <img src={`${IMG_URL}${e.poster_path}`}></img>})}
            </div>
            
        </div>
    );
}

export function getMoviesByPage(page) {
    return axios
        .get(
            `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
        )
        .then((response) => response.data);
}
export function getMovieById(id) {
    return axios
        .get(`${API_URL}movie/${id}?api_key=${API_KEY}&language=en-US`)
        .then((res) => res.json());
}
export function getGenres() {
    return axios
        .get(`${API_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`)
        .then((res) => res.json());
}
export function getImgUrl(path) {
    return `${IMG_URL}${path}`;
}
export function getMovieByQuery(query) {
    return axios
        .get(`${API_URL}search/movie?api_key=${API_KEY}&query=${query}`)
        .then((res) => res.json());
}
