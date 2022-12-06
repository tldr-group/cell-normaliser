import { React, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAWetMass,
  setCWetMass,
  setAThickness,
  setCThickness,
  setDiameter,
  selectDiameter,
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
  selectLowRateCapacity,
  selectStack,
  selectACCThickness,
  setACCThickness,
  setAAMMass,
  setAAMThickness,
  setCAMMass,
  setCAMThickness,
  setCBMass,
  setCBThickness,
  setABMass,
  setABThickness,
  setCCAMass,
  setCCAThickness,
  setACAMass,
  setACAThickness,
  setCEMass,
  setCEThickness,
  setCPorosity,
  setAEMass,
  setAEThickness,
  setAPorosity,
  selectWetMassMode,
  selectDryCathodeMass,
  setDryCathodeMass,
  setWetMassMode,
  selectDryAnodeMass,
  setDryAnodeMass
} from './stackSlice';

import styles from './Stack.module.css';
import './../../App.css'

export function Electrode() {
  const Diameter = useSelector(selectDiameter);
  const ActiveElectrode = useSelector(selectActiveElectrode);
  const CCCThickness = useSelector(selectCCCThickness);
  const CCCMass = useSelector(selectCCCMass);
  const ACCMass = useSelector(selectACCMass);
  const ACCThickness = useSelector(selectACCThickness);
  const TotalCathodeMass = useSelector(selectTotalCathodeMass)
  const TotalCathodeThickness = useSelector(selectTotalCathodeThickness)
  const TotalAnodeMass = useSelector(selectTotalAnodeMass)
  const TotalAnodeThickness = useSelector(selectTotalAnodeThickness)
  const LowRateCapacity = useSelector(selectLowRateCapacity)
  const Stack = useSelector(selectStack)
  const WetMassMode = useSelector(selectWetMassMode)
  const DryCathodeMass = useSelector(selectDryCathodeMass)
  const DryAnodeMass = useSelector(selectDryAnodeMass)
  const dispatch = useDispatch();

  useEffect(() => {
    syncElectrode()}, [Stack])

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
        dispatch(setAAMMass(anodeAMMass))

        var anodeAMThickness = anodeAMMass *1e6 / (Stack.anode.activeMaterial.density * 0.25 * Math.PI * (Diameter * 1e-3)**2)
        var anodeBThickness = anodeBMass*1e6 / (Stack.anode.binder.density * 0.25 * Math.PI * (Diameter * 1e-3)**2)
        var anodeCAThickness = anodeCAMass*1e6 / (Stack.anode.conductiveAdditive.density * 0.25 * Math.PI * (Diameter * 1e-3)**2)
        dispatch(setAAMThickness(anodeAMThickness))

        var anodeThickness = (anodeAMThickness + anodeBThickness + anodeCAThickness) / (1 - Stack.anode.porosity)
        var anodeEThickness = Stack.anode.porosity * anodeThickness
        var anodeEMass = anodeEThickness*1e-6 * Stack.anode.electrolyte.density * (0.25 * Math.PI * (Diameter *1e-3)**2)
        var anodeMass = Number(anodeAMMass+anodeBMass+anodeCAMass+anodeEMass)

        dispatch(setAThickness(anodeThickness))
        dispatch(setTotalAnodeMass(anodeMass+ACCMass))
        dispatch(setTotalAnodeThickness(anodeThickness+ACCThickness))
    }
    else if(ActiveElectrode === 'anode'){
        var cathodeAMMass = LRCap / (Stack.cathode.activeMaterial.theoreticSpecificCapacity*1e3)
        var cathodeBMass = Stack.cathode.binder.massPercentDrySlurry * cathodeAMMass / (1 - Stack.cathode.binder.massPercentDrySlurry - Stack.cathode.conductiveAdditive.massPercentDrySlurry)
        var cathodeCAMass = Stack.cathode.conductiveAdditive.massPercentDrySlurry * cathodeAMMass / (1 - Stack.cathode.binder.massPercentDrySlurry - Stack.cathode.conductiveAdditive.massPercentDrySlurry)
        dispatch(setCAMMass(cathodeCAMass))

        var cathodeAMThickness = cathodeAMMass *1e6 / (Stack.cathode.activeMaterial.density * 0.25 * Math.PI * (Diameter * 1e-3)**2)
        var cathodeBThickness = cathodeBMass*1e6 / (Stack.cathode.binder.density * 0.25 * Math.PI * (Diameter * 1e-3)**2)
        var cathodeCAThickness = cathodeCAMass*1e6 / (Stack.cathode.conductiveAdditive.density * 0.25 * Math.PI * (Diameter * 1e-3)**2)
        dispatch(setCAMThickness(cathodeAMThickness))

        var cathodeThickness = (cathodeAMThickness + cathodeBThickness + cathodeCAThickness) / (1 - Stack.cathode.porosity)
        var cathodeEThickness = Stack.cathode.porosity * cathodeThickness
        var cathodeEMass = cathodeEThickness*1e-6 * Stack.cathode.electrolyte.density * (0.25 * Math.PI * (Diameter *1e-3)**2)
        var cathodeMass = Number(cathodeAMMass+cathodeBMass+cathodeCAMass+cathodeEMass)

        dispatch(setCThickness(cathodeThickness))
        dispatch(setTotalCathodeMass(cathodeMass+CCCMass))
        dispatch(setTotalCathodeThickness(cathodeThickness+CCCThickness))
    }
  }

  function updateCathode() {
    // Active material
    var massAM = LowRateCapacity * 1e-3 / Stack.cathode.activeMaterial.theoreticSpecificCapacity
    dispatch(setCAMMass(massAM))
    var thicknessAM = massAM*1e6 / (Stack.cathode.activeMaterial.density * 0.25 * Math.PI * (Diameter * 1e-3) **2)
    dispatch(setCAMThickness(thicknessAM))
    // Binder
    var massB = massAM * (Stack.cathode.binder.massPercentDrySlurry) / (Stack.cathode.activeMaterial.massPercentDrySlurry)
    dispatch(setCBMass(massB))
    var thicknessB = massB*1e6 / (Stack.cathode.binder.density * 0.25 * Math.PI * (Diameter * 1e-3) **2)
    dispatch(setCBThickness(thicknessB))
    // Conductive additive
    var massCA = massAM * (Stack.cathode.conductiveAdditive.massPercentDrySlurry) / (Stack.cathode.activeMaterial.massPercentDrySlurry)
    dispatch(setCCAMass(massCA))
    var thicknessCA = massCA*1e6 / (Stack.cathode.conductiveAdditive.density * 0.25 * Math.PI * (Diameter * 1e-3) **2)
    dispatch(setCCAThickness(thicknessCA))
    // Electrolyte
    var thicknessE = TotalCathodeThickness - CCCThickness - thicknessAM - thicknessB - thicknessCA
    var porosity = thicknessE / (TotalCathodeThickness-CCCThickness)
    var massE = thicknessE * 1e-6 * Stack.cathode.electrolyte.density * 0.25 * Math.PI * (Diameter * 1e-3) **2
    dispatch(setCEMass(massE))
    dispatch(setCEThickness(thicknessE))
    dispatch(setCPorosity(porosity))


  }

  function updateAnode() {
    // Active material
    var massAM = LowRateCapacity * 1e-3 / Stack.anode.activeMaterial.theoreticSpecificCapacity
    dispatch(setAAMMass(massAM))
    var thicknessAM = massAM*1e6 / (Stack.anode.activeMaterial.density * 0.25 * Math.PI * (Diameter * 1e-3) **2)
    dispatch(setAAMThickness(thicknessAM))
    // Binder
    var massB = massAM * (Stack.anode.binder.massPercentDrySlurry) / (Stack.anode.activeMaterial.massPercentDrySlurry)
    dispatch(setABMass(massB))
    var thicknessB = massB*1e6 / (Stack.anode.binder.density * 0.25 * Math.PI * (Diameter * 1e-3) **2)
    dispatch(setABThickness(thicknessB))
    // Conductive additive
    var massCA = massAM * (Stack.anode.conductiveAdditive.massPercentDrySlurry) / (Stack.anode.activeMaterial.massPercentDrySlurry)
    dispatch(setACAMass(massCA))
    var thicknessCA = massCA*1e6 / (Stack.anode.conductiveAdditive.density * 0.25 * Math.PI * (Diameter * 1e-3) **2)
    dispatch(setACAThickness(thicknessCA))
    // Electrolyte
    var thicknessE = TotalAnodeThickness - ACCThickness - thicknessAM - thicknessB - thicknessCA
    var porosity = thicknessE / (TotalAnodeThickness - ACCThickness)
    var massE = thicknessE * 1e-6 * Stack.anode.electrolyte.density * 0.25 * Math.PI * (Diameter * 1e-3) **2
    dispatch(setAEMass(massE))
    dispatch(setAEThickness(thicknessE))
    dispatch(setAPorosity(porosity))

  }

  function wetMassDropdown(electrode){
    return(
    <div tabIndex={0} className='dropdown'>
        <div className='dropdownBtn'>{WetMassMode+' '+electrode+' + current collector mass / g'}</div>
        <div className='dropdownItems'>
            {['Wet', 'Dry'].map(l => {
                return(
                <div className='dropdownItem' key={l} onClick={() => dispatch(setWetMassMode(l))}>
                    {l}
                </div>
                )
            })
            }
        
            </div>
    </div>
    )
  }

  function wetMassBox (electrode){

    if (electrode==='cathode'){
        return (
            <div className="box-12-row-4">
            
            {wetMassDropdown(electrode)}

            <input
            className={styles.button}
            type='text'
            aria-label="Set mass"
            value={WetMassMode==='Wet' ? String(valueReturn(TotalCathodeMass)) : String(valueReturn(DryCathodeMass))}
            onChange={(e) => dispatch(WetMassMode==='Wet' ? setTotalCathodeMass(e.target.value) : setDryCathodeMass(e.target.value))}
            onBlur={(e) => validate(e)}
            >
            </input>
            </div>
        )
    }
    else if (electrode==='anode'){
        return (
            <div className="box-12-row-4">
            
            {wetMassDropdown(electrode)}

            <input
            className={styles.button}
            type='text'
            aria-label="Set mass"
            value={WetMassMode==='Wet' ? String(valueReturn(TotalAnodeMass)) : String(valueReturn(DryAnodeMass))}
            onChange={(e) => dispatch(WetMassMode==='Wet' ? setTotalAnodeMass(e.target.value) : setDryAnodeMass(e.target.value))}
            onBlur={(e) => validate(e)}
            >
            </input>
            </div>
        )
    }
    }


  if(ActiveElectrode == 'none'){
    return(
        <div className="box-row">
            <div className="box-12">
            <div className={styles.selector}>
            <div className="box-row">
            <div className="box-12">
            <p className={styles.title}>
                Choose your cell type
                </p>
                </div>
                </div>
            
             
                <div className="box-row">
            <div className="box-4">
            <button className={styles.button} onClick={() => dispatch(setActiveElectrode('cathode'))}>
                    Cathode half cell
                </button>
            </div>
            <div className="box-4">
            <button className={styles.button} onClick={() => dispatch(setActiveElectrode('anode'))}>
                    Anode half cell
                </button>
            </div>
            <div className="box-4">
            <button className={styles.button} onClick={() => dispatch(setActiveElectrode('both'))}>
                    Full cell
                </button>
            </div>  
            </div>
            </div> 
            </div>
            </div>
    )
  }

//   CATHODE HALF CELL

  else if(ActiveElectrode == 'cathode'){
    return(
        <div className="box-row">
        <div className="box-12">
        <div className={styles.cathode}>
        <div className="box-12">
        <p className={styles.title}>
                Cathode
        </p>
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

            {wetMassBox(ActiveElectrode)}

        
        </div>
    </div>
        </div>

    )
}

// ANODE HALF CELL

else if(ActiveElectrode == 'anode'){
    return(
        <div className="box-row">
        <div className="box-12">
        <div className={styles.anode}>
        <div className="box-12">
        <p className={styles.title}>
                Anode
        </p>
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

        {wetMassBox(ActiveElectrode)}

        </div>
    </div>

    
        </div>

    )
}

// FULL CELL

  else if(ActiveElectrode == 'both'){
        return(
            <div className="box-row">
            <div className="box-6">
            <div className={styles.cathode}>
            <div className="box-12">
            <p className={styles.title}>
                    Cathode
            </p>
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

            {wetMassBox('cathode')}

            </div>
        </div>



            <div className="box-6">
            <div className={styles.anode}>
            <div className="box-12">
            <p className={styles.title}>
                    Anode
            </p>
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

            {wetMassBox('anode')}

            </div>
        </div>

        
            </div>

        )
  }
    
}
