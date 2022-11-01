import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
//   setCWetMass,
//   selectCWetMass,
  setAWetMass,
//   selectAWetMass,
//   setCThickness,
//   selectCThickness,
  setAThickness,
//   selectAThickness,
  setDiameter,
  selectDiameter,
//   setArealEnergyDensity,
//   selectArealEnergyDensity,
  selectActiveElectrode,
  setActiveElectrode,
  setCCCThickness,
  selectCCCThickness,
  selectCCCMass,
  setCCCMass,
  selectACCMass,
  setACCMass,
  setTotalCathodeMass,
  selectTotalCathodeMass,
  setTotalCathodeThickness,
  selectTotalCathodeThickness,
  setTotalAnodeMass,
  selectTotalAnodeMass,
  setTotalAnodeThickness,
  selectTotalAnodeThickness,
  selectAvgVoltage,
  setAvgVoltage,
  selectLowRateCapacity,
  setLowRateCapacity,
  selectMeasuredCapacity,
  setMeasuredCapacity,
  selectStack,
//   setAnodeAMTheoreticSpecificCapacity,
  selectACCThickness,
  setACCThickness
} from './stackSlice';

import styles from './Stack.module.css';
import './../../App.css'

export function Electrode() {
//   const CWetMass = useSelector(selectCWetMass);
//   const CThickness = useSelector(selectCThickness);
//   const AWetMass = useSelector(selectAWetMass);
//   const AThickness = useSelector(selectAThickness);
  const Diameter = useSelector(selectDiameter);
//   const ArealEnergyDensity = useSelector(selectArealEnergyDensity);
  const ActiveElectrode = useSelector(selectActiveElectrode);
  const CCCThickness = useSelector(selectCCCThickness);
  const CCCMass = useSelector(selectCCCMass);
  const ACCMass = useSelector(selectACCMass);
  const ACCThickness = useSelector(selectACCThickness);
  const TotalCathodeMass = useSelector(selectTotalCathodeMass)
  const TotalCathodeThickness = useSelector(selectTotalCathodeThickness)
  const TotalAnodeMass = useSelector(selectTotalAnodeMass)
  const TotalAnodeThickness = useSelector(selectTotalAnodeThickness)
  const AverageVoltage = useSelector(selectAvgVoltage)
  const LowRateCapacity = useSelector(selectLowRateCapacity)
  const MeasuredCapacity = useSelector(selectMeasuredCapacity)
  const Stack = useSelector(selectStack)
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

  function syncElectrode(){
    var LRCap = Stack.npRatio * LowRateCapacity
    if (ActiveElectrode === 'cathode'){
        var anodeAMMass = LRCap / (Stack.anode.activeMaterial.theoreticSpecificCapacity*1e3)
        var anodeBMass = Stack.anode.binder.massPercentDrySlurry * anodeAMMass / (1 - Stack.anode.binder.massPercentDrySlurry - Stack.anode.conductiveAdditive.massPercentDrySlurry)
        var anodeCAMass = Stack.anode.conductiveAdditive.massPercentDrySlurry * anodeAMMass / (1 - Stack.anode.binder.massPercentDrySlurry - Stack.anode.conductiveAdditive.massPercentDrySlurry)

        var anodeAMThickness = anodeAMMass *1e6 / (Stack.anode.activeMaterial.density * 0.25 * Math.PI * (Diameter * 1e-3)**2)
        var anodeBThickness = anodeBMass*1e6 / (Stack.anode.binder.density * 0.25 * Math.PI * (Diameter * 1e-3)**2)
        var anodeCAThickness = anodeCAMass*1e6 / (Stack.anode.conductiveAdditive.density * 0.25 * Math.PI * (Diameter * 1e-3)**2)

        var anodeThickness = (anodeAMThickness + anodeBThickness + anodeCAThickness) / (1 - Stack.anode.porosity)
        var anodeEThickness = Stack.anode.porosity * anodeThickness
        var anodeEMass = anodeEThickness*1e-6 * Stack.anode.electrolyte.density * (0.25 * Math.PI * (Diameter *1e-3)**2)
        var anodeMass = Number(anodeAMMass+anodeBMass+anodeCAMass+anodeEMass)
        dispatch(setAThickness(anodeThickness))
        dispatch(setAWetMass(anodeMass))
        dispatch(setTotalAnodeMass(anodeMass+ACCMass))
        dispatch(setTotalAnodeThickness(anodeThickness+ACCThickness))
    }
    else if(ActiveElectrode === 'anode'){
        var cathodeAMMass = LRCap / (Stack.cathode.activeMaterial.theoreticSpecificCapacity*1e3)
        var cathodeBMass = Stack.cathode.binder.massPercentDrySlurry * cathodeAMMass / (1 - Stack.cathode.binder.massPercentDrySlurry - Stack.cathode.conductiveAdditive.massPercentDrySlurry)
        var cathodeCAMass = Stack.cathode.conductiveAdditive.massPercentDrySlurry * cathodeAMMass / (1 - Stack.cathode.binder.massPercentDrySlurry - Stack.cathode.conductiveAdditive.massPercentDrySlurry)

        var cathodeAMThickness = cathodeAMMass *1e6 / (Stack.cathode.activeMaterial.density * 0.25 * Math.PI * (Diameter * 1e-3)**2)
        var cathodeBThickness = cathodeBMass*1e6 / (Stack.cathode.binder.density * 0.25 * Math.PI * (Diameter * 1e-3)**2)
        var cathodeCAThickness = cathodeCAMass*1e6 / (Stack.cathode.conductiveAdditive.density * 0.25 * Math.PI * (Diameter * 1e-3)**2)

        var cathodeThickness = (cathodeAMThickness + cathodeBThickness + cathodeCAThickness) / (1 - Stack.cathode.porosity)
        var cathodeEThickness = Stack.cathode.porosity * cathodeThickness
        var cathodeEMass = cathodeEThickness*1e-6 * Stack.cathode.electrolyte.density * (0.25 * Math.PI * (Diameter *1e-3)**2)
        var cathodeMass = Number(cathodeAMMass+cathodeBMass+cathodeCAMass+cathodeEMass)
        dispatch(setAThickness(cathodeThickness))
        dispatch(setAWetMass(cathodeMass))
        dispatch(setTotalCathodeMass(cathodeMass+ACCMass))
        dispatch(setTotalCathodeThickness(cathodeThickness+ACCThickness))
    }
  }

  function electrodeRender () {
    if (ActiveElectrode === 'cathode'){
        return(
            <div>
            <div className={styles.cathode}>

            <div className="box-6-offset-3">
            <p className={styles.title}>
                <button className={styles.button} onClick={() => dispatch(setActiveElectrode('anode'))}>
                    Cathode
                </button>
            </p>
                </div>
                <div className='box-3'>
                <p className={styles.title}>
                <button className={styles.syncButton} onClick={() => (syncElectrode())}>
                    Sync anode
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
                onChange={(e) => dispatch(setDiameter(e.target.value))}
                value={String(valueReturn(Diameter))}
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

            <div className="box-6-offset-3">
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

        )

    }
    // ANODE
    else if(ActiveElectrode === 'anode'){
        return(
            <div>
            <div className={styles.anode}>

            <div className="box-6-offset-3">
            <p className={styles.title}>
                <button className={styles.button} onClick={() => dispatch(setActiveElectrode('cathode'))}>
                    Anode
                </button>
            </p>
                </div>
                <div className='box-3'>
                <p className={styles.title}>
                <button className={styles.syncButton} onClick={() => (syncElectrode())}>
                    Sync cathode
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
                aria-label="Set anode current collector mass"
                value={String(valueReturn(ACCMass))}
                onChange={(e) => dispatch(setACCMass(e.target.value))}
                onBlur={(e) => validate(e)}
                >
                </input>
                </div>

                <div className="box-12-row-4">
                <p className={styles.title}>
                Wet anode + current collector mass / g
                </p>
                <input
                className={styles.button}
                type='text'
                aria-label="Set anode wet mass"
                value={String(valueReturn(TotalAnodeMass))}
                onChange={(e) => dispatch(setTotalAnodeMass(e.target.value))}
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
                aria-label="Set anode current collector thickness"
                onChange={(e) => dispatch(setACCThickness((e.target.value)))}
                value={String(valueReturn(ACCThickness))}
                onBlur={(e) => validate(e)}
                >
                </input>
            </div>

            <div className="box-12-row-4">
            <p className={styles.title}>
                Anode + current collector thickness / µm
                </p>
                <input
                className={styles.button}
                aria-label="Set anode thickness"
                onChange={(e) => dispatch(setTotalAnodeThickness(e.target.value))}
                value={(valueReturn(TotalAnodeThickness))}
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
                aria-label="Set anode diameter"
                onChange={(e) => dispatch(setDiameter(e.target.value))}
                value={String(valueReturn(Diameter))}
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

            <div className="box-6-offset-3">
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
