import React from 'react';
import styles from './Stack.module.css';
import './../../App.css'
import { Electrode } from './Electrode';
export function Stack() {
  return (
    <div>
      <div className="container">
        <div className={styles.electrodeSection}>
      <div className='box-row'>
      <div className="box-12">
        <p className={styles.title}>
          Electrode measurements
        </p>
        </div>
        </div>

        <Electrode />

      </div>
      
    </div>
    </div>
  );
}
