import React, { useState } from "react";
import "./PreviewCard.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function PreviewCard(props) {
  const [showFullOverview, setShowFullOverview] = useState(false);

  return (
    <div className="PreviewCard">
      <div className="previewCard-contanier">
        <Link
          to={`/moviedetail/${props.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <img
            src={`https://image.tmdb.org/t/p/original/${props.imgPath}`}
            alt="movie-poster"
          />
        </Link>
        <Link
          to={`/moviedetail/${props.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <h3 className="previewCard-title">{props.name}</h3>
        </Link>

        {props.isLiked ? (
          <Button
            variant="outline-dark"
            className="Unlike-btn"
            onClick={() => {
              props.onUnliked(props.id);
            }}
          >
            Unlike
          </Button>
        ) : (
          <Button
            variant="outline-danger"
            className="Like-btn"
            onClick={() => {
              props.onLiked(props.id);
            }}
          >
            Like
          </Button>
        )}

        <h6>{props.overview}</h6>
      </div>
      <div className="rating-box">
        <i style={{ fontStyle: "normal" }}>IMDB: {props.ratingScore}</i>
      </div>
    </div>
  );
}

export default PreviewCard;
