import React, { useEffect, useState } from "react";
import "./LikedMoviesPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import PreviewCard from "../components/PreviewCard";
import testUtils from "react-dom/test-utils";
function LikedMoviesPage() {
  const [likedMoviesDetails, setLikedMoviesDetails] = useState([]);

  async function fetchItems() {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${likedMovieIDs[likedMovieCount]}?api_key=f3e744226b13ef39764f0e35686bff5e&language=en-US
      `
    );

    const itemData = await data.json();
    temporaryLikedMovieDetailArray.push(itemData);
    if (
      temporaryLikedMovieDetailArray.length === likedMovieIDs.length &&
      likedMoviesDetails.length === 0
    ) {
      setLikedMoviesDetails(temporaryLikedMovieDetailArray);
    }
  }

  //Get Liked movie IDs
  const likedMovieIDs = JSON.parse(localStorage.getItem("likedMovies"));

  //Getting liked movie details
  let temporaryLikedMovieDetailArray = [];
  let likedMovieCount = likedMovieIDs.length - 1;
  while (likedMovieCount >= 0) {
    fetchItems();
    likedMovieCount--;
  }

  const handleUnlikedMovie = (id) => {
    const updateLikedMoviesID = likedMovieIDs.filter((ID) => ID !== id);
    localStorage.setItem("likedMovies", JSON.stringify(updateLikedMoviesID));
    setLikedMoviesDetails((currentLikedMovies) => {
      return currentLikedMovies.filter(
        (currentLikedMovies) => currentLikedMovies.id !== id
      );
    });
  };

  const handleLikedMovie = () => {
    console.log("no functinality in this page");
  };
  return (
    <div className="LikedMoviesPage">
      <Navbar />
      <div className="liked-movies-preview-container">
        {likedMoviesDetails.map((movie) => {
          return (
            <PreviewCard
              key={movie.id}
              id={movie.id}
              isLiked={true}
              onUnliked={handleUnlikedMovie}
              onLiked={handleLikedMovie}
              name={movie.original_title}
              overview={movie.overview}
              imgPath={movie.poster_path}
              ratingScore={movie.vote_average}
            />
          );
        })}
      </div>
    </div>
  );
}

export default LikedMoviesPage;
