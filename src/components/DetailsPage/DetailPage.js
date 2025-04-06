import React, { useEffect } from "react";
import FocusableButton from "../FocusableButton/FocusableButton";
import "./DetailPage.css"; // Import CSS for styling
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
// import { useLocation, useNavigate } from "react-router-dom";
import { useLocation, withRouter } from "react-router-dom";

const DetailPage = ({ focusKey, location, history }) => {

  const keyDownHandler  = (e)=>{
          console.log('Detail Page');
          
          if (e.keyCode == 10009 || e.keyCode == 8) {
              if(window.history.length > 1)
              {
                  window.history.back();
              }
              else{
                  console.log('No back allowed');
              }
            return;
          }
  
        }
      
        useEffect(() => {
          
      
          window.addEventListener('keydown', keyDownHandler)
      
          return () => {
            window.removeEventListener("keydown", keyDownHandler);
          };
        }, []);
   
  // fetching data for asset clicked - passed through navigation
  // const location = useLocation();
  // const navigate = useNavigate();
  const movieData = location.state;


  const { ref, focusKey: currentFocusKey, focusSelf } = useFocusable({
    focusable: true,
    trackChildren: true,
    focusKey,
    saveLastFocusedChild: true,
  });

  const onMovieWatchPress = (item) => {
    let data = {
      src: item,
      title: movieData.title
    };
    history.push("/player", data );
  };

  const onTrailerWatchPress = (item) => {
    let data = {
      src: item,
      title: movieData.title
    };
    history.push("/player", data );
  };

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <>
      <div className="movie-detail-page">
        {/* Background Poster */}
        <div
          className="movie-detail-page-poster"
          style={{ backgroundImage: `url(${movieData.fullPageBanner})` }}
        ></div>
        <div className="overlay"></div>

        {/* Content */}
        <div className="content">
          <div className="details">
            <h1 className="title">{movieData.title}</h1>
            <p className="description">{movieData.shortDescription}</p>
            <div className="info">
              <span>{movieData.releasedYear}</span> •{" "}
              <span>{movieData.genre}</span> •{" "}
              <span>⭐ {movieData.rating}</span>
            </div>

            {/* Focusable Buttons */}
            <div className="buttons">
              <FocusContext.Provider value={currentFocusKey}>
                <div ref={ref} className="buttons">
                  <FocusableButton
                    className="detail-play-button"
                    focusClass="detail-play-button-focus"
                    text={"Watch Movie"}
                    onEnterPress={() =>onMovieWatchPress(`${movieData.preview_url}`)}
                  />
                  <FocusableButton
                    className="detail-play-button"
                    focusClass="detail-play-button-focus"
                    text={"Watch Trailer"}
                    onEnterPress={()=>onTrailerWatchPress(`${movieData.preview_url}`)}
                  />
                </div>
              </FocusContext.Provider>
            </div>
          </div>
        </div>

        {/* Start Cast Section */}
        <div className="start-cast-container">
          <h2>Star Cast</h2>
          <div className="cast-list">
            {movieData.cast && movieData.cast.map((actor, index) => (
              <div key={index} className="cast-member">
                <img src={actor.image} alt={actor.name} className="cast-image" />
                <div className="cast-info">
                  <p className="cast-name">{actor.name}</p>
                  <p className="cast-character">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="start-cast-container-2">
          <h2>Star Cast</h2>
          <div className="cast-list">
            {movieData.cast && movieData.cast.map((actor, index) => (
              <div key={index} className="cast-member">
                <img src={actor.image} alt={actor.name} className="cast-image" />
                <div className="cast-info">
                  <p className="cast-name">{actor.name}</p>
                  <p className="cast-character">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(DetailPage);
