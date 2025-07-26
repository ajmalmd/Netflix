import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  // const cardsRef = useRef();
  // const handleWheel = (event) => {
  //   event.preventDefault();
  //   cardsRef.current.scrollLeft += event.deltaY;
  // };

  // useEffect(() => {
  //   cardsRef.current.addEventListener("wheel", handleWheel);
  // }, []);

  const [apiData, setApiData] = useState([]);
  const tmdbImageUrl = "https://image.tmdb.org/t/p/w500";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTZiOTg0MDI2NjJjNGVhMTg1YjBmNjY1MTAyMjBhMSIsIm5iZiI6MTc1MzQ2NjE2My40MDEsInN1YiI6IjY4ODNjNTMzZmU4NWExZDU0NTI0NjBlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.anBhH4rmVHnpsF0ED5MyO-LpXk_8Qv06NJV7nEEPSK0",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setApiData(res.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      className="title-cards"
      // ref={cardsRef}
    >
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list">
        {apiData.map((movie, ind) => {
          return (
            <Link to={`/player/${movie.id}`} className="card" key={ind}>
              <img src={tmdbImageUrl + movie.backdrop_path} alt="" />
              <p>{movie.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
