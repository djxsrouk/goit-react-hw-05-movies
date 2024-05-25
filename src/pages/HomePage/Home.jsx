import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../Data/API';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { MdLocalMovies } from 'react-icons/md';
import { MdTrendingUp } from 'react-icons/md';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const showTrending = async () => {
    try {
      const fetchedMovies = await fetchTrendingMovies();
      setTrending(fetchedMovies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showTrending();
  }, []);

  return (
    <div className={styles.containerHome}>
      <div className={styles.containerBox}>
        <MdTrendingUp className={styles.iconHome} />
        <MdLocalMovies className={styles.iconHome} />
        <h1 className={styles.titleBox}>Top trending today</h1>
        <MdLocalMovies className={styles.iconHome} />
        <MdTrendingUp className={styles.iconHomeRev} />
      </div>
      <div className={styles.moviesGrid}>
        {trending.map(movie => (
          <div key={movie.id} className={styles.movieCard}>
            <Link
              to={`movies/${movie.id}`}
              state={{ from: '/' }}
              className={styles.link}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.movieImage}
              />
              <p className={styles.movieTitle}>{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
