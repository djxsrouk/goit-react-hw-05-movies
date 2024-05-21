import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../Data/API';
import styles from './Cast.module.css';

const Cast = () => {
  const [cast, setCast] = useState();
  const fetchThisMovieCast = async id => {
    const fetchedData = await fetchMovieCast(id);
    setCast(fetchedData);
  };

  const { movieId } = useParams();

  useEffect(() => {
    fetchThisMovieCast(movieId);
  }, [movieId]);

  if (cast) {
    return (
      <div className={styles.wrapper}>
        <ul>
          {cast.map(event => {
            return (
              <li key={event.id} className={styles.item}>
                <img
                  src={
                    event.profile_path
                      ? `https://www.themoviedb.org/t/p/w138_and_h175_face/${event.profile_path}`
                      : `https://via.placeholder.com/138x175?text=Theres+no+photo`
                  }
                  alt={event.name}
                />
                <div className={styles.actorDetails}>
                  <p>{event.name}</p>
                  <p>Character: {event.character}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default Cast;
