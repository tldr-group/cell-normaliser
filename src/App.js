import React from 'react';
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
          <p className='title'>
            Cell Normaliser
          </p>
        </div>
        </div>
          <div className='box-row'>
          <div className='box-8'>
            <Stack />
        </div>
        <div className='box-4'>
        <div className='box-row'>
        <div className='box-12'>
          <Cell />
        </div>
        {/* <div className='box-12'>
          <Visual />
        </div> */}
        </div>
        </div>
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;
