import React from 'react';

import styles from './index.module.scss';

export default function loading() {
  return (
    <div className={styles['overlay-loader']}>
      <div className={styles['loader']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
