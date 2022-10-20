import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCWetMass,
  selectAWetMass,
  selectCThickness,
  selectAThickness,
  selectCDiameter,
  selectADiameter,
  selectACCMassLoading,
  selectACCThickness,
  selectCCCMassLoading,
  selectCCCThickness,
  selectSMassLoading,
  selectSThickness,
  selectArealEnergyDensity
} from '../stack/stackSlice';
import {
    setEDensity,
    selectCaseInternalVolume,
    selectCaseMass
} from './cellSlice'
import styles from './Cell.module.css';
import './../../App.css'

export function Cell() {
  const CWetMass = Number(useSelector(selectCWetMass));
  const CThickness = Number(useSelector(selectCThickness));
  const AWetMass = Number(useSelector(selectAWetMass));
  const AThickness = Number(useSelector(selectAThickness));
  const CDiameter = Number(useSelector(selectCDiameter));
  const ADiameter = Number(useSelector(selectADiameter));
  const ACCMassLoading = Number(useSelector(selectACCMassLoading));
  const ACCThickness = Number(useSelector(selectACCThickness));
  const CCCMassLoading = Number(useSelector(selectCCCMassLoading));
  const CCCThickness = Number(useSelector(selectCCCThickness));
  const SMassLoading = Number(useSelector(selectSMassLoading));
  const SThickness = Number(useSelector(selectSThickness));
  const CaseInternalVolume = Number(useSelector(selectCaseInternalVolume));
  const CaseMass = Number(useSelector(selectCaseMass));
  const ArealEnergyDensity = Number(useSelector(selectArealEnergyDensity));
  const dispatch = useDispatch();


  function massToMassLoading(mass, diameter){
    return mass / ( 0.25 * Math.PI * diameter**2)
  }

  function stackThickness(anodeThickness, cathodeThickness, separatorThickness, ACCThickness, CCCThickness){
    return 2 * ( anodeThickness + cathodeThickness + separatorThickness ) - ( ACCThickness + CCCThickness )
  }

  function massLoading(anodeMassLoading, cathodeMassLoading, separatorMassLoading, ACCMassLoading, CCCMassLoading){
    return 2 * ( anodeMassLoading + cathodeMassLoading + separatorMassLoading ) - ( ACCMassLoading + CCCMassLoading )
  }

  function stackArea(caseInternalVolume, stackThickness){
    return caseInternalVolume / stackThickness
  }

  function energyDensity(){
    // 2 * stackArea * arealEnergyDensity
    var AnodeMassLoading = massToMassLoading(AWetMass, ADiameter)
    var CathodeMassLoading = massToMassLoading(CWetMass, CDiameter)
    var StackThickness = stackThickness(AThickness, CThickness, SThickness, ACCThickness, CCCThickness)
    var StackMassLoading = massLoading(AnodeMassLoading, CathodeMassLoading, SMassLoading, ACCMassLoading, CCCMassLoading)
    var StackArea = stackArea(CaseInternalVolume, StackThickness)

    var energyD = 2 * StackArea * ArealEnergyDensity * 1000 / ( CaseMass + StackArea * StackMassLoading )
    dispatch(setEDensity(energyD))
    
    return energyD
  }


  return (
    <div>
      <div className="container">
        <div className='box-row-4'>
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
                            Energy density: 
                            </div>
                            <div className={styles.result}>
                            {parseFloat(energyDensity()).toFixed(2)} Wh kg-1
                        </div>
                    </div>
                </div>
                {/* <div className='box-row'>
                    <div className='box-12'>
                        <div className={styles.result}>
                            Mass: {2} kg
                        </div>
                    </div>
                </div> */}
            </div>
            </div>
      
    </div>
    </div>
    </div>
  );
}
