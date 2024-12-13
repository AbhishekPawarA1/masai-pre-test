import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const apikey = "fa843bcb";

  useEffect(() => {
    fetchDefaultMovies();
  }, []);
  useEffect(() => {
    if (searchTerm.length >= 2) {
      const timeout = setTimeout(() => {
        searchMovies(searchTerm);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchDefaultMovies = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/`, {
        params: {
          apikey: apikey,
          s: "batman", 
        },
      });
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching default movies: ", error);
    }
  };

  const searchMovies = async (query) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/`, {
        params: {
          apikey: apikey,
          s: query,
        },
      });
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching searched movies: ", error);
    }
  };

  return (
    <div>
      <h1 id="main-head">Movies</h1>
      <div id="center">
        <input
          type="text"
          id="moviesearch"
          placeholder="Search Movie"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div id="displaymovies">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} id="card">
              <img src={movie.Poster} alt={movie.Title} />
              <h2>{movie.Title}</h2>
              <h3>Type: {movie.Type}</h3>
              <h3>Year: {movie.Year}</h3>
              <div>
                <button>Download</button>
              </div>
            </div>
          ))
        ) : (
          <div id="card">
            <h2 id="text-center">No Movie Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
