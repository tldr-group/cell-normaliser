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
  selectArealEnergyDensity,
  selectActiveElectrode,
  setActiveElectrode,
  setCCCThickness,
  selectCCCThickness,
  selectCCCMass,
  setCCCMass,
  setTotalCathodeMass,
  selectTotalCathodeMass,
  setTotalCathodeThickness,
  selectTotalCathodeThickness,
  selectAvgVoltage,
  setAvgVoltage,
  selectLowRateCapacity,
  setLowRateCapacity,
  selectMeasuredCapacity,
  setMeasuredCapacity
} from './stackSlice';

import styles from './Stack.module.css';
import './../../App.css'

export function Electrode() {
  const CWetMass = useSelector(selectCWetMass);
  const CThickness = useSelector(selectCThickness);
  const AWetMass = useSelector(selectAWetMass);
  const AThickness = useSelector(selectAThickness);
  const CDiameter = useSelector(selectCDiameter);
  const ADiameter = useSelector(selectADiameter);
  const ArealEnergyDensity = useSelector(selectArealEnergyDensity);
  const ActiveElectrode = useSelector(selectActiveElectrode);
  const CCCThickness = useSelector(selectCCCThickness);
  const CCCMass = useSelector(selectCCCMass);
  const TotalCathodeMass = useSelector(selectTotalCathodeMass)
  const TotalCathodeThickness = useSelector(selectTotalCathodeThickness)
  const AverageVoltage = useSelector(selectAvgVoltage)
  const LowRateCapacity = useSelector(selectLowRateCapacity)
  const MeasuredCapacity = useSelector(selectMeasuredCapacity)
  const dispatch = useDispatch();

  function valueReturn (value) {
    if(Number(value) >=0){
      return value
    }
    else{
      return ''
    }
  }

  function validate(e){
    // Total thickness > ccc thickness
    console.log(e.target)
    e.target.classList.toggle("invalid");
    if( TotalCathodeThickness-CCCThickness<0){
        e.target.classList.add("invalid");
    }
    else if( TotalCathodeMass-CCCMass<0){
        e.target.classList.add("invalid");
    }
    else{
        e.target.classList.remove("invalid");
    }
  }

  function electrodeRender () {
    if (ActiveElectrode === 'cathode'){
        return(
            <div>
            <div className={styles.cathode}>

            <div className="box-12">
            <p className={styles.title}>
                <button className={styles.button} onClick={() => dispatch(setActiveElectrode('anode'))}>
                    Cathode
                </button>
            </p>
                </div>
                
                <div className="box-12-row-4">
                <p className={styles.title}>
                Current collector mass / g
                </p>
                <input
                className={styles.button}
                type='text'
                aria-label="Set cathode current collector mass"
                value={String(valueReturn(CCCMass))}
                onChange={(e) => dispatch(setCCCMass(e.target.value))}
                onBlur={(e) => validate(e)}
                >
                </input>
                </div>

                <div className="box-12-row-4">
                <p className={styles.title}>
                Wet cathode + current collector mass / g
                </p>
                <input
                className={styles.button}
                type='text'
                aria-label="Set cathode wet mass"
                value={String(valueReturn(TotalCathodeMass))}
                onChange={(e) => dispatch(setTotalCathodeMass(e.target.value))}
                onBlur={(e) => validate(e)}
                >
                </input>
                </div>

                

            <div className="box-12-row-4">
            <p className={styles.title}>
                Current collector thickness / µm
                </p>
                <input
                className={styles.button}
                aria-label="Set cathode current collector thickness"
                onChange={(e) => dispatch(setCCCThickness((e.target.value)))}
                value={String(valueReturn(CCCThickness))}
                onBlur={(e) => validate(e)}
                >
                </input>
            </div>

            <div className="box-12-row-4">
            <p className={styles.title}>
                Cathode + current collector thickness / µm
                </p>
                <input
                className={styles.button}
                aria-label="Set cathode thickness"
                onChange={(e) => dispatch(setTotalCathodeThickness(e.target.value))}
                value={(valueReturn(TotalCathodeThickness))}
                onBlur={(e) => validate(e)}
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
                onChange={(e) => dispatch(setCDiameter(e.target.value))}
                value={String(valueReturn(CDiameter))}
                >
                </input>
            </div>
        </div>

        <div className="box-6-offset-3">
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
        
            <div className="box-6-offset-3">
        <p className={styles.title}>
            Low Rate Capacity / C
            </p>
            <input
            className={styles.button}
            aria-label="Set low rate capacity"
            onChange={(e) => dispatch(setLowRateCapacity(e.target.value))}
            value={String(valueReturn(LowRateCapacity))}
            >
            </input>
            </div>

            <div className="box-6-offset-3">
        <p className={styles.title}>
            Measured Capacity / C
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

        )

    }
    else if(ActiveElectrode === 'anode'){
        return(
            <div>
            <div className={styles.anode}>

            
            <div className="box-12">
            <p className={styles.title}>
                <button className={styles.button} onClick={() => dispatch(setActiveElectrode('cathode'))}>
                    Anode
                </button>
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
            onChange={(e) => dispatch(setADiameter(e.target.value))}
            value={valueReturn(ADiameter)}
            >
            </input>
        </div>
        </div>

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

        )
    }
    else{
        return(
            <div>
                <p className={styles.title}>
                    Select your electrode
            </p>
            <div className='box-row'>
            <div className='box-6'>
            <button className={styles.button} onClick={() => dispatch(setActiveElectrode('cathode'))}>
                Cathode
            </button>
            </div>
            <div className='box-6'>
            <button className={styles.button} onClick={() => dispatch(setActiveElectrode('anode'))}>
                Anode
            </button>
            </div>
            </div>
        </div>
        )
    }
  }


  return (
        <div className="box-row">
        <div className='box-8-offset-2'>
            {electrodeRender()}
      </div>
      </div>
  );
}
