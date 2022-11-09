import React, { useEffect} from 'react';
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
  selectAvgVoltage,
  selectMeasuredCapacity,
  selectActiveElectrode,
} from '../stack/stackSlice';
import {
    setEDensity,
    selectEDensity,
    selectEnergy,
    setEnergy,
    selectSpecificEnergy,
    setSpecificEnergy,
    selectCaseInternalVolume,
    selectCaseMass,
    setMass,
    selectMass,
    setEnergyEfficiency,
    selectActiveCellType,
    selectCell,
    setCase,
    setActiveCellType
} from './cellSlice'
import styles from './Cell.module.css';
import './../../App.css'
import { selectLowRateCapacity } from '../stack/stackSlice';

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
  const LowRateCapacity = Number(useSelector(selectLowRateCapacity))
  const ActiveElectrode = useSelector(selectActiveElectrode)
  const EnergyDensity = Number(useSelector(selectEDensity));
  const Energy = Number(useSelector(selectEnergy));
  const SpecificEnergy = Number(useSelector(selectSpecificEnergy))
  const Mass = Number(useSelector(selectMass))
  const ActiveCellType = Number(useSelector(selectActiveCellType))
  const Cell = useSelector(selectCell)
  const dispatch = useDispatch();


  function massToMassLoading(mass, diameter){
    return mass / ( 0.25 * Math.PI * (diameter*1e-3)**2) // g m-2
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

  function setCellType(cellType, caseObj){
    dispatch(setCase(caseObj.case))
    dispatch(setActiveCellType(cellType))
  }

  function calcEnergy(){
    // 2 * stackArea * arealEnergyDensity
    var AnodeMassLoading = massToMassLoading(AWetMass, Diameter) // g m-2
    var CathodeMassLoading = massToMassLoading(CWetMass, Diameter)
    var ACCMassLoading = massToMassLoading(ACCMass, Diameter)
    var CCCMassLoading = massToMassLoading(CCCMass, Diameter)
    var StackThickness = stackThickness(AThickness, CThickness, SThickness, ACCThickness, CCCThickness) // m
    var StackMassLoading = massLoading(AnodeMassLoading, CathodeMassLoading, SMassLoading, ACCMassLoading, CCCMassLoading)
    var StackArea = stackArea(CaseInternalVolume, StackThickness) // m2
    var energyDensity = arealEnergyDensity(AvgVoltage, MeasuredCapacity, Diameter)  // Wh m-2
    var energy = StackArea * energyDensity  // Wh
    var theoreticEnergy = StackArea * arealEnergyDensity(AvgVoltage, LowRateCapacity, Diameter)
    var mass = CaseMass + StackArea * StackMassLoading // g
    var specificEnergy = 2 * StackArea * energyDensity * 1000 / ( CaseMass + StackArea * StackMassLoading ) // Wh kg-1
    dispatch(setEDensity(energyDensity))
    dispatch(setEnergy(energy))
    dispatch(setMass(mass))
    dispatch(setSpecificEnergy(specificEnergy))
    dispatch(setEnergyEfficiency(energy/theoreticEnergy))
  }

  useEffect(() => {
    calcEnergy()
  })

  useEffect(() => {
    setCellType('18650', Cell.cells['18650'])
  }, [])

  if (ActiveElectrode !== 'none'){
  return (
    <div>
      <div className="container">
            <div className='box-12'>
            <div className={styles.resultsSection}>
                <div className='box-row'>
                    <div className='box-12'>
                    <p className={styles.title}>
                        Cell
                    </p>
                    <div tabindex={0} className={styles.dropdown}>
                        <div className={styles.dropdownBtn}>{ActiveCellType}</div>
                        <div className={styles.dropdownItems}>
                          {Object.keys(Cell.cells).map(l => {
                              return(
                                <div className={styles.dropdownItem} onClick={() => setCellType(l, Cell.cells[l])}>
                                  {l}
                                </div>
                              )
                            })
                          }
                        
                          </div>
                    </div>
                    </div>
                </div>
                <div className='box-row'>
                    <div className='box-12'>
                        <div className={styles.resultTitle}>
                            Energy / Wh
                            </div>
                            <div className={styles.result}>
                            {parseFloat(Energy).toFixed(2)}
                        </div>
                    </div>
                </div>
                <div className='box-row'>
                    <div className='box-12'>
                        <div className={styles.resultTitle}>
                            Energy density / Wh m-2
                            </div>
                            <div className={styles.result}>
                            {parseFloat(EnergyDensity).toFixed(2)}
                        </div>
                    </div>
                </div>
                <div className='box-row'>
                    <div className='box-12'>
                        <div className={styles.resultTitle}>
                            Specific energy / Wh kg-1
                            </div>
                            <div className={styles.result}>
                            {parseFloat(SpecificEnergy).toFixed(2)}
                        </div>
                    </div>
                </div>
                <div className='box-row'>
                    <div className='box-12'>
                        <div className={styles.resultTitle}>
                            Mass / g
                            </div>
                            <div className={styles.result}>
                            {parseFloat(Mass).toFixed(2)}
                        </div>
                    </div>
                </div>
                {/* <div className='box-row'>
                    <div className='box-12'>
                        <div className={styles.resultTitle}>
                            Energy efficiency
                            </div>
                            <div className={styles.result}>
                            {parseFloat(EnergyEfficiency).toFixed(2)}
                        </div>
                    </div>
                </div> */}
            </div>
            </div>
      
    </div>
    </div>
  );
  }
  else{

    return (
      <div>
        <div className="container">
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
                              Energy / Wh
                              </div>
                              <div className={styles.result}>
                              ?
                          </div>
                      </div>
                  </div>
                  <div className='box-row'>
                      <div className='box-12'>
                          <div className={styles.resultTitle}>
                              Energy density / Wh m-2
                              </div>
                              <div className={styles.result}>
                              ?
                          </div>
                      </div>
                  </div>
                  <div className='box-row'>
                      <div className='box-12'>
                          <div className={styles.resultTitle}>
                              Specific energy / Wh kg-1
                              </div>
                              <div className={styles.result}>
                              ?
                          </div>
                      </div>
                  </div>
                  <div className='box-row'>
                      <div className='box-12'>
                          <div className={styles.resultTitle}>
                              Mass / Wh kg-1
                              </div>
                              <div className={styles.result}>
                              ?
                          </div>
                      </div>
                  </div>
              </div>
              </div>
        
      </div>
      </div>
    );

  }
}
