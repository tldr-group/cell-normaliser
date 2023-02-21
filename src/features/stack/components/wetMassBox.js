import { React} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './../Stack.module.css';
import {valueReturn, validate} from './../stackFunctions'
import {
    selectTotalCathodeMass,
    selectTotalAnodeMass,
    selectWetMassMode,
    selectDryCathodeMass,
    selectDryAnodeMass,
    selectCPorosity,
    selectAPorosity,
    setAPorosity,
    setTotalAnodeMass,
    setTotalCathodeMass,
    setWetMassMode,
    setDryAnodeMass,
    setDryCathodeMass,
    setCPorosity,

} from './../stackSlice'


  export function WetMassBox (electrode){
    electrode = electrode.electrode
    const TotalCathodeMass = useSelector(selectTotalCathodeMass)
    const TotalAnodeMass = useSelector(selectTotalAnodeMass)
    const WetMassMode = useSelector(selectWetMassMode)
    const DryCathodeMass = useSelector(selectDryCathodeMass)
    const DryAnodeMass = useSelector(selectDryAnodeMass)
    const CPorosity = useSelector(selectCPorosity)
    const APorosity = useSelector(selectAPorosity)
    const dispatch = useDispatch();

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

    if (electrode==='cathode'){
        return (
            <div className="box-row">
            <div className="box-12">
            {wetMassDropdown(electrode)}
            </div>
            <div className="box-12">
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
            <div className="box-12">
            <p className={styles.title} hidden={WetMassMode==='Wet' ? true : ''}>
            Porosity
            </p>
            <input 
            className={styles.button}
            value={String(valueReturn(CPorosity))}
            onChange={(e) => dispatch(setCPorosity(e.target.value))}
            hidden={WetMassMode==='Wet' ? true : ''}>
            </input>
            </div>
            </div>
        )
    }
    else if (electrode==='anode'){
        return (
            <div className="box-row">
            <div className="box-12">
            
            {wetMassDropdown(electrode)}
            </div>
            <div className="box-12">
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
            <div className="box-12">
            <p className={styles.title} hidden={WetMassMode==='Wet' ? true : ''}>
            Porosity
            </p>
            <input 
            className={styles.button}
            value={String(valueReturn(APorosity))}
            onChange={(e) => dispatch(setAPorosity(e.target.value))}
            hidden={WetMassMode==='Wet' ? true : ''}>
            </input>
            </div>
            </div>
        )
    }
    }