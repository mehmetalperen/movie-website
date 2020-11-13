import React, {useEffect, useState} from 'react'
import './MovieDetailPage.css';

//Handle get detail data
function MovieDetailPage({match}) {

  useEffect(() => {
    getMovieData();
  },[]);

  async function getMovieData() {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=f3e744226b13ef39764f0e35686bff5e&language=en-US`);
    const itemData = await data.json();
    setMovieDetail({
      id: itemData.id,
      name: itemData.title,
      overview: itemData.overview,
      imgURL: itemData.poster_path,
      imdbScore: itemData.vote_average,
      realesdDate: itemData.release_date,
      spokenLang: itemData.spoken_languages,
      genres: itemData.genres
    });
    console.log(itemData);
  }
  
  const [movieDetail, setMovieDetail] = useState({
    id: '',
    name: '',
    overview: '',
    imgURL: '',
    imdbScore: '',
    realesdDate: '',
    spokenLang: [],
    genres: []
  });

  console.log(match.params.id)
    return (
    <div className="MovieDetailPage">
      <div className="movie-detail-info-wrapper">
        {/* clicked --> take user to its homepage */}
        <img src={`https://image.tmdb.org/t/p/original${movieDetail.imgURL}`} alt="" className="movie-poster"/>
        <div className="movie-detail-container">
          <h1 className="movie-name">{movieDetail.name}</h1>
          <h4 className="overview-paragraph">{movieDetail.overview}</h4>

          <div className="little-detail-container">
            <ul>
              <li>
                <h6 style={{textAlign: 'left'}} className="rating">IMDB score: {movieDetail.imdbScore}</h6>
              </li>

              <li>
                <h6 style={{textAlign: 'left'}}>Realsed Date: {movieDetail.realesdDate}</h6>
              </li>

              <li>
                <h6 style={{display: "inline"}}>Spoken Languages:</h6>
                {movieDetail.spokenLang.map(lang => {
                  return <h6 style={{display: "inline"}}> {lang.name}</h6>
                })}
              </li>

              <li>
                <h6 style={{display: "inline"}}>Genres:</h6>
                {movieDetail.genres.map(genre => {
                    return <h6 style={{display: "inline"}}> {genre.name}</h6>
                })}
              </li>
            </ul>





           
            {/* <i>genres - depends on the movie some movies can have more than one genre </i> */}
          </div>
          
        </div>
      </div>
      <div className="comment-wrapper">
      <h1>Comments</h1>
      <h1>Comments</h1>
      <h1>Comments</h1>
      <h1>Comments</h1>
      <h1>Comments</h1>
      <h1>Comments</h1>
      </div>
    </div>
  );
}

export default MovieDetailPage;
