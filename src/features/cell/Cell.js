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
  const CWetMass = useSelector(selectCWetMass);
  const CThickness = useSelector(selectCThickness);
  const AWetMass = useSelector(selectAWetMass);
  const AThickness = useSelector(selectAThickness);
  const CDiameter = useSelector(selectCDiameter);
  const ADiameter = useSelector(selectADiameter);
  const ACCMassLoading = useSelector(selectACCMassLoading);
  const ACCThickness = useSelector(selectACCThickness);
  const CCCMassLoading = useSelector(selectCCCMassLoading);
  const CCCThickness = useSelector(selectCCCThickness);
  const SMassLoading = useSelector(selectSMassLoading);
  const SThickness = useSelector(selectSThickness);
  const CaseInternalVolume = useSelector(selectCaseInternalVolume);
  const CaseMass = useSelector(selectCaseMass);
  const ArealEnergyDensity = useSelector(selectArealEnergyDensity);
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
