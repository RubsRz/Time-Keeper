import React from 'react';
import styles from './loader.module.css';

const Loader = () => {
  return (
    <>
      <div className={styles.cssloadSquare}>
        <div><div><div><div><div></div></div></div></div></div>
        <div><div><div><div><div></div></div></div></div></div>
      </div>
      <div className={`${styles.cssloadSquare} ${styles.cssloadTwo}`}>
        <div><div><div><div><div></div></div></div></div></div>
        <div><div><div><div><div></div></div></div></div></div>
      </div>
    </>
  );
};

export default Loader;
