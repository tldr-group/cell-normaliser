import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import stackSlice, {
  selectDiameter,
  selectActiveElectrode,
  selectCCCThickness,
  selectCCCMass,
  selectACCMass,
  selectSMass,
  selectSThickness,
  selectTotalCathodeMass,
  selectTotalCathodeThickness,
  selectTotalAnodeMass,
  selectTotalAnodeThickness,
  selectAvgVoltage,
  selectLowRateCapacity,
  selectMeasuredCapacity,
  selectStack,
  selectACCThickness,
} from './stackSlice';

import styles from './Stack.module.css';
import './../../App.css'

export function SubElectrode() {
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
  const SMass = useSelector(selectSMass)
  const SThickness = useSelector(selectSThickness)
  const TotalCathodeMass = useSelector(selectTotalCathodeMass)
  const TotalCathodeThickness = useSelector(selectTotalCathodeThickness)
  const TotalAnodeMass = useSelector(selectTotalAnodeMass)
  const TotalAnodeThickness = useSelector(selectTotalAnodeThickness)
  const AverageVoltage = useSelector(selectAvgVoltage)
  const LowRateCapacity = useSelector(selectLowRateCapacity)
  const MeasuredCapacity = useSelector(selectMeasuredCapacity)
  const Stack = useSelector(selectStack)
  const dispatch = useDispatch();

  function subElectrodeRender () {
        return(
            <div>
                <div className='box-row'>
                    <div className='box-6'>
                    <div className={styles.subElectrodeBox}>
                    <div className="box-row">
                        <div className='box-12'>
                    <div className={styles.subElectrodeTitle}>
                        Cathode
                        </div>
                        </div>
                        </div>

                        <div className="box-row">
                        <div className='box-12'>
                    <div className={styles.subElectrodeData}>
                        Porosity: {Stack.cathode.porosity}
                        </div>
                        </div>
                        </div>

                        <div className="box-row">
                            <div className="box-12">
                                <div className={styles.subElectrodeBox}>
                                    <div className="box-row">
                                        <div className='box-12'>
                                            <div className={styles.subElectrodeSubTitle}>
                                                Active Material
                                                </div>
                                            </div>
                                        <div className="box-row">
                                    <div className="box-12">

                                    <div className={styles.subElectrodeData}>
                                    Mass: {Stack.cathode.activeMaterial.mass} g
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Mass fraction dry slurry: {Stack.cathode.activeMaterial.massPercentDrySlurry}
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Thickness: {Stack.cathode.activeMaterial.thickness} µm
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Density: {Stack.cathode.activeMaterial.density.toExponential()} g/m3
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Theoretical specific capacity: {Stack.cathode.activeMaterial.theoreticSpecificCapacity} Ah/g
                                    </div>

                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    
                        <div className="box-row">
                            <div className="box-12">
                                <div className={styles.subElectrodeBox}>
                                    <div className="box-row">
                                        <div className='box-12'>
                                            <div className={styles.subElectrodeSubTitle}>
                                                Binder
                                                </div>
                                            </div>
                                        <div className="box-row">
                                    <div className="box-12">

                                    <div className={styles.subElectrodeData}>
                                    Mass: {Stack.cathode.binder.mass} g
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Mass fraction dry slurry: {Stack.cathode.binder.massPercentDrySlurry}
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Thickness: {Stack.cathode.binder.thickness} µm
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Density: {Stack.cathode.binder.density.toExponential()} µm
                                    </div>

                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="box-row">
                            <div className="box-12">
                                <div className={styles.subElectrodeBox}>
                                    <div className="box-row">
                                        <div className='box-12'>
                                            <div className={styles.subElectrodeSubTitle}>
                                                Conductive Additive
                                                </div>
                                            </div>
                                        <div className="box-row">
                                    <div className="box-12">

                                    <div className={styles.subElectrodeData}>
                                    Mass: {Stack.cathode.conductiveAdditive.mass} g
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Mass fraction dry slurry: {Stack.cathode.conductiveAdditive.massPercentDrySlurry}
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Thickness: {Stack.cathode.conductiveAdditive.thickness} µm
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Density: {Stack.cathode.conductiveAdditive.density.toExponential()} µm
                                    </div>

                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="box-row">
                            <div className="box-12">
                                <div className={styles.subElectrodeBox}>
                                    <div className="box-row">
                                        <div className='box-12'>
                                            <div className={styles.subElectrodeSubTitle}>
                                                Electrolyte
                                                </div>
                                            </div>
                                        <div className="box-row">
                                    <div className="box-12">

                                    <div className={styles.subElectrodeData}>
                                    Mass: {Stack.cathode.electrolyte.mass} g
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Thickness: {Stack.cathode.electrolyte.thickness} µm
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Density: {Stack.cathode.electrolyte.density.toExponential()} g/m3
                                    </div>

                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    </div>
                    
                    <div className='box-6'>
                    <div className={styles.subElectrodeBox}>
                    <div className="box-row">
                        <div className='box-12'>
                    <div className={styles.subElectrodeTitle}>
                        Anode
                        </div>
                        </div>
                        </div>
                    
                        <div className="box-row">
                        <div className='box-12'>
                    <div className={styles.subElectrodeData}>
                        Porosity: {Stack.anode.porosity}
                        </div>
                        </div>
                        </div>

                        <div className="box-row">
                            <div className="box-12">
                                <div className={styles.subElectrodeBox}>
                                    <div className="box-row">
                                        <div className='box-12'>
                                            <div className={styles.subElectrodeSubTitle}>
                                                Active Material
                                                </div>
                                            </div>
                                        <div className="box-row">
                                    <div className="box-12">

                                    <div className={styles.subElectrodeData}>
                                    Mass: {Stack.anode.activeMaterial.mass} g
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Mass fraction dry slurry: {Stack.anode.activeMaterial.massPercentDrySlurry}
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Thickness: {Stack.anode.activeMaterial.thickness} µm
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Density: {Stack.anode.activeMaterial.density.toExponential()} g/m3
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Theoretical specific capacity: {Stack.anode.activeMaterial.theoreticSpecificCapacity} Ah/g
                                    </div>

                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    
                        <div className="box-row">
                            <div className="box-12">
                                <div className={styles.subElectrodeBox}>
                                    <div className="box-row">
                                        <div className='box-12'>
                                            <div className={styles.subElectrodeSubTitle}>
                                                Binder
                                                </div>
                                            </div>
                                        <div className="box-row">
                                    <div className="box-12">

                                    <div className={styles.subElectrodeData}>
                                    Mass: {Stack.anode.binder.mass} g
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Mass fraction dry slurry: {Stack.anode.binder.massPercentDrySlurry}
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Thickness: {Stack.anode.binder.thickness} µm
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Density: {Stack.anode.binder.density.toExponential()} µm
                                    </div>

                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="box-row">
                            <div className="box-12">
                                <div className={styles.subElectrodeBox}>
                                    <div className="box-row">
                                        <div className='box-12'>
                                            <div className={styles.subElectrodeSubTitle}>
                                                Conductive Additive
                                                </div>
                                            </div>
                                        <div className="box-row">
                                    <div className="box-12">

                                    <div className={styles.subElectrodeData}>
                                    Mass: {Stack.anode.conductiveAdditive.mass} g
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Mass fraction dry slurry: {Stack.anode.conductiveAdditive.massPercentDrySlurry}
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Thickness: {Stack.anode.conductiveAdditive.thickness} µm
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Density: {Stack.anode.conductiveAdditive.density.toExponential()} µm
                                    </div>

                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="box-row">
                            <div className="box-12">
                                <div className={styles.subElectrodeBox}>
                                    <div className="box-row">
                                        <div className='box-12'>
                                            <div className={styles.subElectrodeSubTitle}>
                                                Electrolyte
                                                </div>
                                            </div>
                                        <div className="box-row">
                                    <div className="box-12">

                                    <div className={styles.subElectrodeData}>
                                    Mass: {Stack.anode.electrolyte.mass} g
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Thickness: {Stack.anode.electrolyte.thickness} µm
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Density: {Stack.anode.electrolyte.density.toExponential()} g/m3
                                    </div>

                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    </div>

                </div>
                <div className='box-row'>
                <div className='box-4'>
                    <div className={styles.subElectrodeBox}>
                    <div className="box-row">
                        <div className='box-12'>
                    <div className={styles.subElectrodeTitle}>
                        Cathode CC
                        </div>
                        </div>
                        </div>
                        <div className="box-row">
                        <div className="box-12">
                            <div className={styles.subElectrodeData}>
                            Mass: {CCCMass} g
                            </div>
                            <div className={styles.subElectrodeData}>
                            Thickness: {CCCThickness} µm
                            </div>
                        </div>

                        </div>
                    </div>
                    </div>

                    <div className='box-4'>
                    <div className={styles.subElectrodeBox}>
                    <div className="box-row">
                        <div className='box-12'>
                    <div className={styles.subElectrodeTitle}>
                        Separator
                        </div>
                        </div>
                        </div>
                        <div className="box-row">
                        <div className="box-12">
                            <div className={styles.subElectrodeData}>
                            Mass: {SMass} g
                            </div>
                            <div className={styles.subElectrodeData}>
                            Thickness: {SThickness} µm
                            </div>
                        </div>
                        </div>

                    </div>
                    </div>

                    <div className='box-4'>
                    <div className={styles.subElectrodeBox}>
                    <div className="box-row">
                        <div className='box-12'>
                    <div className={styles.subElectrodeTitle}>
                        Anode CC
                        </div>
                        </div>
                        </div>
                        <div className="box-row">
                        <div className="box-12">
                            <div className={styles.subElectrodeData}>
                            Mass: {ACCMass} g
                            </div>
                            <div className={styles.subElectrodeData}>
                            Thickness: {ACCThickness} µm
                            </div>
                        </div>
                        </div>

                    </div>
                    </div>

                    </div>
            </div>

        )
    }


  return (
        <div className="box-row">
        <div className='box-12'>
            {subElectrodeRender()}
        </div>
        </div>
  );
}
