import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';
import { IoSearchCircle } from 'react-icons/io5';

const Searchbar = props => {
  const handleSubmit = event => {
    event.preventDefault();
    const query = event.target.query.value;
    props.onSubmit(query);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.wrap}>
        <form className={styles.search} onSubmit={handleSubmit}>
          <input
            onSubmit={handleSubmit}
            type="text"
            className={styles.searchTerm}
            placeholder="Search movie..."
            name="query"
          ></input>
          <button type="submit" className={styles.searchButton}>
            <IoSearchCircle className={styles.iconSearch} />
          </button>
        </form>
      </div>
    </div>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
