import React, { useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCCCThickness,
  selectCCCMass,
  selectACCMass,
  selectSMass,
  selectSThickness,
  selectStack,
  selectACCThickness,
  selectShowSubElectrode,
  setShowSubelectrode
} from './stackSlice';

import styles from './Stack.module.css';
import './../../App.css'

export function SubElectrode() {
const subElectrodeSection = useRef(null);
  const CCCThickness = useSelector(selectCCCThickness);
  const CCCMass = useSelector(selectCCCMass);
  const ACCMass = useSelector(selectACCMass);
  const ACCThickness = useSelector(selectACCThickness);
  const SMass = useSelector(selectSMass)
  const SThickness = useSelector(selectSThickness)
  const Stack = useSelector(selectStack)
  const ShowSubElectrode = useSelector(selectShowSubElectrode)
  const dispatch = useDispatch()

  const precision = 4

  function toggleSubElectrode (ref){
    console.log(ref.current)
    ref.current.classList.toggle('show')
    dispatch(setShowSubelectrode(!ShowSubElectrode))
  }

  function showDetails(){
    console.log(ShowSubElectrode)
    if(ShowSubElectrode){
        return('Less')
    }
    else{
        return('More')
    }
    
}

  function subElectrodeRender (ref) {
    
        return(
            <div>
                <div className="box-row">
                        <div className='box-4-offset-4'>
                        <div className={styles.moreBtn} onClick={() => toggleSubElectrode(ref)}>
                <div className={styles.title}>
                    {showDetails()}
                </div>
                </div>
                </div>
                </div>

            <div className={styles.subElectrodeSection} ref={ref}>
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
                                    Mass: {Stack.cathode.activeMaterial.mass.toPrecision(precision)} g
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Mass fraction dry slurry: {Stack.cathode.activeMaterial.massPercentDrySlurry}
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Thickness: {Stack.cathode.activeMaterial.thickness.toPrecision(precision)} µm
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
                                    Mass: {Stack.cathode.binder.mass.toPrecision(precision)} g
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Mass fraction dry slurry: {Stack.cathode.binder.massPercentDrySlurry}
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Thickness: {Stack.cathode.binder.thickness.toPrecision(precision)} µm
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
                                    Mass: {Stack.cathode.conductiveAdditive.mass.toPrecision(precision)} g
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Mass fraction dry slurry: {Stack.cathode.conductiveAdditive.massPercentDrySlurry}
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Thickness: {Stack.cathode.conductiveAdditive.thickness.toPrecision(precision)} µm
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
                                    Mass: {Stack.cathode.electrolyte.mass.toPrecision(precision)} g
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Thickness: {Stack.cathode.electrolyte.thickness.toPrecision(precision)} µm
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
                                    Mass: {Stack.anode.activeMaterial.mass.toPrecision(precision)} g
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Mass fraction dry slurry: {Stack.anode.activeMaterial.massPercentDrySlurry}
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Thickness: {Stack.anode.activeMaterial.thickness.toPrecision(precision)} µm
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
                                    Mass: {Stack.anode.binder.mass.toPrecision(precision)} g
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Mass fraction dry slurry: {Stack.anode.binder.massPercentDrySlurry}
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Thickness: {Stack.anode.binder.thickness.toPrecision(precision)} µm
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
                                    Mass: {Stack.anode.conductiveAdditive.mass.toPrecision(precision)} g
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Mass fraction dry slurry: {Stack.anode.conductiveAdditive.massPercentDrySlurry}
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Thickness: {Stack.anode.conductiveAdditive.thickness.toPrecision(precision)} µm
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
                                    Mass: {Stack.anode.electrolyte.mass.toPrecision(precision)} g
                                    </div>
                                    <div className={styles.subElectrodeData}>
                                    Thickness: {Stack.anode.electrolyte.thickness.toPrecision(precision)} µm
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
                            Mass: {CCCMass.toPrecision(precision)} g
                            </div>
                            <div className={styles.subElectrodeData}>
                            Thickness: {CCCThickness.toPrecision(precision)} µm
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
                            Mass: {ACCMass.toPrecision(precision)} g
                            </div>
                            <div className={styles.subElectrodeData}>
                            Thickness: {ACCThickness.toPrecision(precision)} µm
                            </div>
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
            {subElectrodeRender(subElectrodeSection)}
        </div>
        </div>
  );
}
