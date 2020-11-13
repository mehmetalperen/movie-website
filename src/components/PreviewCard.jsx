import React from 'react'
import './PreviewCard.css';
import {Link} from 'react-router-dom'

function PreviewCard(props) {
  return (
    <div className="PreviewCard">
      <div className="previewCard-contanier">
    
          <Link to={`/moviedetail/${props.id}`} style={{ textDecoration: 'none', color: "black" }}><img src={`https://image.tmdb.org/t/p/original/${props.imgPath}`} alt="movie-poster"/></Link>
          <Link to={`/moviedetail/${props.id}`} style={{ textDecoration: 'none', color: "black" }}><h3 className="previewCard-title">{props.name}</h3></Link>
          <h6>{props.overview}</h6>
      </div>
      <div className="rating-box">
        <i style={{fontStyle: "normal"}}>IMDB: {props.ratingScore}</i>
      </div>
    </div>
  );
}

export default PreviewCard;
