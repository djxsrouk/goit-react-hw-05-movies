import React from 'react';
import styles from './Spinner.module.css';
import BounceLoader from 'react-spinners/BounceLoader';

const Spinner = () => {
  return;
  <>
    <div className={styles.spinnerSection}>
      <BounceLoader color="#36d7b7" />
    </div>
  </>;
};

export default Spinner;
