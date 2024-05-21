import React, { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import styles from './SharedLayout.module.css';
import Spinner from '../Spinner/Spinner';
import { ImVideoCamera } from 'react-icons/im';

const SharedLayout = () => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.containerLogo}>
          <div>
            <ImVideoCamera className={styles.iconLogo} />
          </div>
          <span className={styles.titleLogo}>
            The Movies <span className={styles.titleLogoDB}>Database</span>
          </span>
        </div>
        <nav className={styles.navigation}>
          <NavLink className={styles.menu} to="/">
            Home
          </NavLink>
          <NavLink className={styles.menu} to="/movies">
            Movies
          </NavLink>
        </nav>
      </header>
      <Suspense fallback={<Spinner />}>
        <Outlet></Outlet>
      </Suspense>
    </div>
  );
};

export default SharedLayout;
