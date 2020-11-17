import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [likedMovieIds, setLikedMovieIds] = useState([]);

  useEffect(() => {
    const likedMoviesString = localStorage.getItem("likedMovies");
    if (likedMoviesString) {
      setLikedMovieIds(JSON.parse(likedMoviesString));
    }
  }, []);

  return (
    <div className="Navbar">
      <div className="navbar-contanier">
        <Link style={{ textDecoration: "none" }} to="/">
          <h1 className="navbar-title">Movie Finder Pro</h1>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/likedmovies">
          <h6 className="navbar-Liked-movie">Liked Movies</h6>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
