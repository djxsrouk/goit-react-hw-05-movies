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
      <ul className={styles.moviesList}>
        {trending.map(movie => {
          return (
            <li key={movie.id}>
              <Link
                to={`movies/${movie.id}`}
                state={{ from: '/' }}
                className={styles.link}
              >
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
