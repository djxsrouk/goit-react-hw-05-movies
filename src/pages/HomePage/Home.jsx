import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../Data/API';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { LuPopcorn } from 'react-icons/lu';

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
        <LuPopcorn className={styles.iconHome} />
        <h1 className={styles.titleBox}>Top Trending movies today</h1>
        <LuPopcorn className={styles.iconHome} />
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
