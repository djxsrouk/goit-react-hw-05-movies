import { useEffect, useState } from 'react';
import { fetchMoviesByQuery } from '../../Data/API';
import Searchbar from '../../components/SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import styles from './MoviesPage.module.css';
import defaultImage from '../../images/default-image.jpg';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const actualQuery = searchParams.get('query');

  const showFetchedMovies = async query => {
    setIsLoading(true);
    try {
      const fetchedMovies = await fetchMoviesByQuery(query);
      setMovies([...fetchedMovies]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMovies([]);
    if (actualQuery) {
      showFetchedMovies(actualQuery);
    }
  }, [actualQuery]);

  return (
    <div className={styles.movieSearchContainer}>
      <Searchbar onSubmit={e => setSearchParams({ query: e })}></Searchbar>
      {isLoading && <div>Loading...</div>}
      {movies.length > 0 ? (
        <ul className={styles.moviesGrid}>
          {movies.map(movie => {
            return (
              <li className={styles.movieCard} key={movie.id}>
                <Link
                  to={`/movies/${movie.id}`} // Ensure the path is correct
                  state={{ from: '/movies' }} // Ensure the state is correct
                  className={styles.link}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : defaultImage
                    }
                    alt={movie.title}
                    className={styles.movieImage}
                  />
                  <p className={styles.movieTitle}>{movie.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        actualQuery && !isLoading && <div>Nothing found. Try again.</div>
      )}
    </div>
  );
};

export default Movies;
