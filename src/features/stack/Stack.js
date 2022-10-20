import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCWetMass,
  selectCWetMass,
  setAWetMass,
  selectAWetMass,
  setCThickness,
  selectCThickness,
  setAThickness,
  selectAThickness,
  setCDiameter,
  selectCDiameter,
  setADiameter,
  selectADiameter,
  setArealEnergyDensity,
  selectArealEnergyDensity
} from './stackSlice';
import styles from './Stack.module.css';
import './../../App.css'

export function Stack() {
  const CWetMass = useSelector(selectCWetMass);
  const CThickness = useSelector(selectCThickness);
  const AWetMass = useSelector(selectAWetMass);
  const AThickness = useSelector(selectAThickness);
  const CDiameter = useSelector(selectCDiameter);
  const ADiameter = useSelector(selectADiameter);
  const ArealEnergyDensity = useSelector(selectArealEnergyDensity);
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
          Electrode measurements
        </p>
        </div>
        </div>
        
        <div className="box-row">
        <div className='box-6'>
        <div className={styles.cathode}>

      <div className="box-12">
        <p className={styles.title}>
          Cathode
        </p>
        </div>
        
        <div className="box-12-row-4">
        <p className={styles.title}>
          Wet mass / g
        </p>
        <input
          className={styles.button}
          type='text'
          aria-label="Set cathode wet mass"
          value={String(valueReturn(CWetMass))}
          onChange={(e) => dispatch(setCWetMass(e.target.value))}
        >
        </input>
        </div>

        

      <div className="box-12-row-4">
      <p className={styles.title}>
          Thickness / µm
        </p>
        <input
          className={styles.button}
          aria-label="Set cathode thickness"
          onChange={(e) => dispatch(setCThickness(e.target.value/1e6))}
          value={valueReturn(CThickness)*1e6}
        >
        </input>
      </div>

      <div className="box-12-row-4">
      <p className={styles.title}>
          Diameter / mm
        </p>
        <input
          className={styles.button}
          aria-label="Set cathode diameter"
          onChange={(e) => dispatch(setCDiameter(e.target.value/1e3))}
          value={valueReturn(CDiameter)*1e3}
        >
        </input>
      </div>

      </div>
      </div>

      

      <div className='box-6'>
        <div className={styles.anode}>

        
        <div className="box-12">
        <p className={styles.title}>
          Anode
        </p>
        </div>

        <div className="box-12-row-4">
      <p className={styles.title}>
          Wet mass / g
        </p>
        <input
          className={styles.button}
          aria-label="Set anode wet mass"
          onChange={(e) => dispatch(setAWetMass(e.target.value))}
          value={valueReturn(AWetMass)}
        >
        </input>
      </div>

        <div className="box-12-row-4">
      <p className={styles.title}>
          Thickness / µm
        </p>
        <input
          className={styles.button}
          aria-label="Set anode thickness"
          onChange={(e) => dispatch(setAThickness(e.target.value/1e6))}
          value={valueReturn(AThickness)*1e6}
        >
        </input>
      </div>

      <div className="box-12-row-4">
      <p className={styles.title}>
          Diameter / mm
        </p>
        <input
          className={styles.button}
          aria-label="Set anode diameter"
          onChange={(e) => dispatch(setADiameter(e.target.value / 1e3))}
          value={valueReturn(ADiameter)*1e3}
        >
        </input>
      </div>
      </div>
      </div>
      </div>

      <div className="box-row">
      <div className="box-6-offset-3">
      <p className={styles.title}>
          Areal energy density / Wh m-2
        </p>
        <input
          className={styles.button}
          aria-label="Set areal energy density"
          onChange={(e) => dispatch(setArealEnergyDensity(e.target.value))}
          value={valueReturn(ArealEnergyDensity)}
        >
        </input>
        </div>

        </div>

      </div>
      
    </div>
    </div>
  );
}
