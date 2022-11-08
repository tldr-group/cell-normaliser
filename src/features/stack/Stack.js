import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Stack.module.css';
import './../../App.css'
import {
  selectLowRateCapacity,
  selectMeasuredCapacity,
  selectAvgVoltage,
  setAvgVoltage,
  setLowRateCapacity,
  setMeasuredCapacity
} from './stackSlice'
export function Stack() {
  const MeasuredCapacity = useSelector(selectMeasuredCapacity)
  const AverageVoltage = useSelector(selectAvgVoltage)
  const LowRateCapacity = useSelector(selectLowRateCapacity)
  const dispatch = useDispatch();

  function valueReturn (value) {
    if(Number(value) >=0){
      return value
    }
    else{
      return ''
    }
  }

  return (
    <div>
      <div className="container">
        <div className={styles.electrodeSection}>
      <div className='box-row'>
      <div className="box-12">
      <p className={styles.title}>
        Stack measurements
        </p>
        </div>
        </div>
      <div className='box-row'>
      <div className="box-12">
        <div className="box-12">
        <p className={styles.title}>
            Average Voltage / V
            </p>
            <input
            className={styles.button}
            aria-label="Set avg voltage"
            onChange={(e) => dispatch(setAvgVoltage(e.target.value))}
            value={String(valueReturn(AverageVoltage))}
            >
            </input>
            </div>
        
            <div className="box-12">
        <p className={styles.title}>
            Low Rate Capacity / mAh
            </p>
            <input
            className={styles.button}
            aria-label="Set low rate capacity"
            onChange={(e) => dispatch(setLowRateCapacity(e.target.value))}
            value={String(valueReturn(LowRateCapacity))}
            >
            </input>
            </div>

            <div className="box-12">
        <p className={styles.title}>
            Measured Capacity / mAh
            </p>
            <input
            className={styles.button}
            aria-label="Set measured capacity"
            onChange={(e) => dispatch(setMeasuredCapacity(e.target.value))}
            value={String(valueReturn(MeasuredCapacity))}
            >
            </input>

            
            </div>
      
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}
