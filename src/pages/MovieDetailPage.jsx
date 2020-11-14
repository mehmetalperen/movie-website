import React, {PureComponent, useEffect, useState} from 'react'
import './MovieDetailPage.css';
import Navbar from '../components/Navbar';
import CirledPic from '../components/CirledPic'
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
      genres: itemData.genres,
      production: itemData.production_companies,
      homepageURL: itemData.homepage,
      runtime: itemData.runtime
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
    genres: [],
    production: [],
    homepageURL: '',
    runtime: ''
  });

  console.log(movieDetail.production)
    return (
    <div className="MovieDetailPage">
      <Navbar />
      <div className="image-container">
        <a href={movieDetail.homepageURL}><img src={`https://image.tmdb.org/t/p/original${movieDetail.imgURL}`} alt="" className="movie-poster"/></a>
      </div>

      <div className="movie-detail-container">
        <h1 className="movie-name">{movieDetail.name}</h1>
        <h5 className="movie-overview">{movieDetail.overview}</h5>
        <div className="little-detail-container">
          <div>
            <h6 style={{display: "inline-block"}} className="imdb-score">IMDB score: {movieDetail.imdbScore}</h6>
          </div>
          <div>
            <h6 style={{display: "inline-block"}} className="released-date">{movieDetail.realesdDate}</h6>
          </div>
          <div>
            <h6 style={{display: "inline-block"}} className="spoken-languages">Spoken Languages: </h6>
              {movieDetail.spokenLang.map((lang, index) => {
                return <h6 style={{display: "inline"}}>{lang.name}{index === movieDetail.spokenLang.length-1? null: " /"}</h6>
              })}
          </div>
            <h6 style={{display: "inline-block"}} className="genres">Genre{movieDetail.genres.length>1? 's: ':': '}</h6>
            {movieDetail.genres.map((genre, index) => {
                return <h6 style={{display: "inline"}}>{genre.name}{index === movieDetail.genres.length-1? null: " /"}</h6>
              })}
          <div>
            <h6 style={{display: "inline-block"}} className="run-time">Run time: {movieDetail.runtime}</h6>
          </div>
        </div>

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {movieDetail.production.map(productionInfo => {
            return <CirledPic key={productionInfo.id} imgURL={productionInfo.logo_path} company={productionInfo.name}/>
          })}
        </div>

      </div>

      <div className="comment-wrapper">
        <h1>zcomment</h1>
        <h1>zcomment</h1>
        <h1>zcomment</h1>
        <h1>zcomment</h1>
        <h1>zcomment</h1>
        
        <h1>zcomment</h1>
        <h1>zcomment</h1>
        <h1>zcomment</h1>
        <h1>zcomment</h1>
      </div>
    </div>
  );
}

export default MovieDetailPage;
