import React from 'react';
import { Electrode } from './features/stack/Electrode';
import { SubElectrode } from './features/stack/SubElectrode';
import { Stack } from './features/stack/Stack';
import { Cell } from './features/cell/Cell';
// import { Visual } from './features/visual/Visual';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='container'>
        <div className='box-row'>
        <div className='box-12'>
          <div className='title'>
          🔋 Cell Normaliser 🔋
          </div>
          <div className='subtitle'>
          WIP - email <a href='mailto:i.squires20@imperial.ac.uk'>i.squires20@imperial.ac.uk</a> for more info
          </div>
          </div>
        </div>
        <div className='box-row'>
        <div className='box-12'>
          <div className='box-row'>
          <div className='box-6'>
            <Electrode />
            {/* <SubElectrode /> */}
        </div>
        <div className='box-3'>
          <Stack />
        </div>
        <div className='box-3'>
          <Cell />
          </div>
        </div>
        </div>
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;
