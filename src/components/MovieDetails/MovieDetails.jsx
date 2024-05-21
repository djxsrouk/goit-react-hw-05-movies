import React, { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { Outlet, Link, useParams, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../Data/API';
import styles from './MovieDetails.module.css';
import { BiArrowBack } from 'react-icons/bi';

const MovieDetails = () => {
  const [movie, setMovie] = useState();
  let location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  const showMovieDetail = async id => {
    try {
      const fetchedData = await fetchMovieDetails(id);
      setMovie(fetchedData);
    } catch (error) {
      console.log(error);
    }
  };

  const { movieId } = useParams();

  useEffect(() => {
    showMovieDetail(movieId);
  }, [movieId]);

  if (movie) {
    return (
      <div className={styles.moviesDetailsContainer}>
        <div className={styles.wrapper}>
          <div>
            <Link to={backLinkHref} className={styles.link}>
              <button type="button" className={styles.returnButton}>
                <BiArrowBack />
                Return
              </button>
            </Link>
            <img
              className={styles.moviesPoster}
              src={
                movie.poster_path
                  ? `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`
                  : `https://via.placeholder.com/220x330?text=Theres+no+photo`
              }
              alt={`${movie.title}`}
            />
          </div>
          <div className={styles.details}>
            <h2>{movie.title}</h2>
            <span>User score: {Math.round(movie.vote_average * 10)}%</span>
            <h2>Overview</h2>
            <p>{movie.overview ? movie.overview : "There's no overview"}</p>
            <h3>Genres</h3>
            <p>
              {movie.genres &&
                movie.genres.map(e => {
                  return `${e.name} `;
                })}
            </p>
          </div>
        </div>
        <div className={styles.additional}>
          <h4>Additional information:</h4>
          <ul>
            <li>
              <Link
                to="cast"
                state={{ from: `${backLinkHref}` }}
                className={styles.link}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                to="reviews"
                state={{ from: `${backLinkHref}` }}
                className={styles.link}
              >
                Reviews
              </Link>
            </li>
          </ul>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet></Outlet>
        </Suspense>
      </div>
    );
  }
};
export default MovieDetails;
