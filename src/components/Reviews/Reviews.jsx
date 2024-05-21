import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../Data/API';
import styles from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState();

  const fetchThisMovieReviews = async id => {
    const fetchedData = await fetchMovieReviews(id);
    setReviews(fetchedData);
  };

  const { movieId } = useParams();

  useEffect(() => {
    fetchThisMovieReviews(movieId);
  }, [movieId]);

  if (reviews) {
    return (
      <ul>
        {!reviews[0] ? 'We dont have any reviews for this movie.' : ''}
        {reviews.map(e => {
          return (
            <li className={styles.item} key={e.id}>
              <p className={styles.author}>Author: {e.author}</p>
              <p>{e.content}</p>
            </li>
          );
        })}
      </ul>
    );
  }
};

export default Reviews;
