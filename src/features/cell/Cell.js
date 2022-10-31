import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCWetMass,
  selectAWetMass,
  selectCThickness,
  selectAThickness,
  selectDiameter,
  selectACCMass,
  selectACCThickness,
  selectCCCMass,
  selectCCCThickness,
  selectSMassLoading,
  selectSThickness,
  selectArealEnergyDensity,
  selectAvgVoltage,
  selectMeasuredCapacity
} from '../stack/stackSlice';
import {
    setEDensity,
    selectCaseInternalVolume,
    selectCaseMass,
} from './cellSlice'
import styles from './Cell.module.css';
import './../../App.css'
import { Stack } from '../stack/Stack';

export function Cell() {
  const CWetMass = Number(useSelector(selectCWetMass));
  const CThickness = Number(useSelector(selectCThickness));
  const AWetMass = Number(useSelector(selectAWetMass));
  const AThickness = Number(useSelector(selectAThickness));
  const Diameter = Number(useSelector(selectDiameter));
  const ACCMass = Number(useSelector(selectACCMass));
  const ACCThickness = Number(useSelector(selectACCThickness));
  const CCCMass = Number(useSelector(selectCCCMass));
  const CCCThickness = Number(useSelector(selectCCCThickness));
  const SMassLoading = Number(useSelector(selectSMassLoading));
  const SThickness = Number(useSelector(selectSThickness));
  const CaseInternalVolume = Number(useSelector(selectCaseInternalVolume));
  const CaseMass = Number(useSelector(selectCaseMass));
  const AvgVoltage = Number(useSelector(selectAvgVoltage));
  const MeasuredCapacity = Number(useSelector(selectMeasuredCapacity));
  // const ArealEnergyDensity = Number(useSelector(selectArealEnergyDensity));
  const dispatch = useDispatch();


  function massToMassLoading(mass, diameter){
    return mass / ( 0.25 * Math.PI * (diameter*1e-3)**2)
  }

  function stackThickness(anodeThickness, cathodeThickness, separatorThickness, ACCThickness, CCCThickness){
    return 2e-6 * ( anodeThickness + cathodeThickness + separatorThickness ) - 1e-6 * ( ACCThickness + CCCThickness )
  }

  function massLoading(anodeMassLoading, cathodeMassLoading, separatorMassLoading, ACCMassLoading, CCCMassLoading){
    return 2 * ( anodeMassLoading + cathodeMassLoading + separatorMassLoading ) - ( ACCMassLoading + CCCMassLoading )
  }

  function stackArea(caseInternalVolume, stackThickness){
    return caseInternalVolume / stackThickness
  }

  function arealEnergyDensity(avgVoltage, measuredCapacity, diameter){
    return avgVoltage * measuredCapacity * 1e-3 / (0.25 * Math.PI * (diameter * 1e-3) **2) // Wh
  }

  function energyDensity(){
    // 2 * stackArea * arealEnergyDensity
    var AnodeMassLoading = massToMassLoading(AWetMass, Diameter)
    var CathodeMassLoading = massToMassLoading(CWetMass, Diameter)
    var ACCMassLoading = massToMassLoading(ACCMass, Diameter)
    var CCCMassLoading = massToMassLoading(CCCMass, Diameter)
    var StackThickness = stackThickness(AThickness, CThickness, SThickness, ACCThickness, CCCThickness)
    var StackMassLoading = massLoading(AnodeMassLoading, CathodeMassLoading, SMassLoading, ACCMassLoading, CCCMassLoading)
    var StackArea = stackArea(CaseInternalVolume, StackThickness) // m2
    var ArealEnergyDensity = arealEnergyDensity(AvgVoltage, MeasuredCapacity, Diameter)
    var energy = StackArea * ArealEnergyDensity
    var mass = CaseMass + StackArea * StackMassLoading
    var energyD = 2 * StackArea * ArealEnergyDensity * 1000 / ( CaseMass + StackArea * StackMassLoading )
    dispatch(setEDensity(energyD))
    
    return energyD
  }


  return (
    <div>
      <div className="container sticky">
            <div className='box-12'>
            <div className={styles.resultsSection}>
                <div className='box-row'>
                    <div className='box-12'>
                    <p className={styles.title}>
                        Cell
                    </p>
                    <p className={styles.subtitle}>
                        (21700 format)
                    </p>
                    </div>
                </div>
                <div className='box-row'>
                    <div className='box-12'>
                        <div className={styles.resultTitle}>
                            Specific energy / Wh kg-1
                            </div>
                            <div className={styles.result}>
                            {parseFloat(energyDensity()).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
            </div>
      
    </div>
    </div>
  );
}
