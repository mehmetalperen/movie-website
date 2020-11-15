import React, { PureComponent, useEffect, useState } from "react";
import "./MovieDetailPage.css";
import Navbar from "../components/Navbar";
import CirledPic from "../components/CirledPic";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
//Handle get detail data
function MovieDetailPage({ match }) {
  useEffect(() => {
    getMovieData();
  }, []);

  async function getMovieData() {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=f3e744226b13ef39764f0e35686bff5e&language=en-US`
    );
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
      runtime: itemData.runtime,
    });
  }

  const [movieDetail, setMovieDetail] = useState({
    id: "",
    name: "",
    overview: "",
    imgURL: "",
    imdbScore: "",
    realesdDate: "",
    spokenLang: [],
    genres: [],
    production: [],
    homepageURL: "",
    runtime: "",
  });

  //Handle comment display
  const [showComments, setShowComments] = useState(false);

  //Handle add comment
  const [isAddingComment, setIsAddingComment] = useState(false);

  //Handle comment
  const [comments, setComments] = useState([]);
  const monthsString = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const createNewComment = () => {
    let ID;
    if (comments.length > 0) {
      ID = comments[comments.length - 1].id + 1;
    } else {
      ID = 0;
    }
    setComments((prevComments) => {
      return [
        ...prevComments,
        {
          id: ID,
          date: { day: new Date().getDate(), month: new Date().getMonth() },
          comment: commentTypingVal,
        },
      ];
    });
    setCommentTypingVal("");
    console.log(comments);
  };
  //handle comment typing
  const [commentTypingVal, setCommentTypingVal] = useState("");

  const handleTyping = (event) => {
    setCommentTypingVal(event.target.value);
  };

  return (
    <div className="MovieDetailPage">
      <Navbar />
      <div className="image-container">
        <a href={movieDetail.homepageURL}>
          <img
            src={`https://image.tmdb.org/t/p/original${movieDetail.imgURL}`}
            alt=""
            className="movie-poster"
          />
        </a>
      </div>

      <div className="movie-detail-container">
        <h1 className="movie-name">{movieDetail.name}</h1>
        <h5 className="movie-overview">{movieDetail.overview}</h5>
        <div className="little-detail-container">
          <div>
            <h6 style={{ display: "inline-block" }} className="imdb-score">
              IMDB score: {movieDetail.imdbScore}
            </h6>
          </div>
          <div>
            <h6 style={{ display: "inline-block" }} className="released-date">
              Realesed date: {movieDetail.realesdDate}
            </h6>
          </div>
          <div>
            <h6
              style={{ display: "inline-block" }}
              className="spoken-languages"
            >
              Spoken Languages:{" "}
            </h6>
            {movieDetail.spokenLang.map((lang, index) => {
              return (
                <h6 style={{ display: "inline" }}>
                  {lang.name}
                  {index === movieDetail.spokenLang.length - 1 ? null : " /"}
                </h6>
              );
            })}
          </div>
          <h6 style={{ display: "inline-block" }} className="genres">
            Genre{movieDetail.genres.length > 1 ? "s: " : ": "}
          </h6>
          {movieDetail.genres.map((genre, index) => {
            return (
              <h6 style={{ display: "inline" }}>
                {genre.name}
                {index === movieDetail.genres.length - 1 ? null : " /"}
              </h6>
            );
          })}
          <div>
            <h6 style={{ display: "inline-block" }} className="run-time">
              Run time: {movieDetail.runtime}
            </h6>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {movieDetail.production.map((productionInfo) => {
            return (
              <CirledPic
                key={productionInfo.id}
                imgURL={productionInfo.logo_path}
                company={productionInfo.name}
              />
            );
          })}
        </div>
      </div>

      <div className="comment-wrapper">
        <div className="comment-container">
          <h1
            style={{ display: "inline" }}
            onClick={() => {
              setShowComments(!showComments);
            }}
          >
            {showComments ? "Hide Comments" : "Show Comments"}
          </h1>
          {isAddingComment ? null : (
            <Button
              variant="outline-success"
              style={{
                display: "inline",
                marginLeft: "10%",
                marginBottom: "10px",
              }}
              onClick={() => {
                setIsAddingComment(true);
                setShowComments(false);
              }}
            >
              Add Comment
            </Button>
          )}
          {isAddingComment ? (
            <div className="add-comment-container">
              <div className="text-entry-box">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={commentTypingVal}
                    onChange={handleTyping}
                    placeholder="Type your comment"
                  />
                </Form.Group>
              </div>
              <div className="add-comment-buttons">
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    setCommentTypingVal("");
                    setIsAddingComment(false);
                    setShowComments(true);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline-success"
                  onClick={() => {
                    createNewComment();
                    setIsAddingComment(false);
                    setShowComments(true);
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          ) : null}
          {showComments
            ? comments.map((comment) => {
                return (
                  <div className="comments-box">
                    <div
                      style={{
                        borderStyle: "solid",
                        borderWidth: "1px",
                        borderRadius: "30px",
                        margin: "5px",
                        padding: "10px",
                        width: "fit-content",
                      }}
                    >
                      <h5 className="userName">userName</h5>
                      <h6 className="added-date">{`${
                        monthsString[comment.date.month]
                      } ${comment.date.day}`}</h6>
                    </div>

                    <h4 className="comment">{comment.comment}</h4>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
