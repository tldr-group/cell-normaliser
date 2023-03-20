import React from "react";
import { Electrode } from "./features/stack/Electrode";
import { Stack } from "./features/stack/Stack";
import { Cell } from "./features/cell/Cell";
import { Toolbar } from "./features/toolbar/Toolbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="box-row">
            <div className="box-4-offset-4">
              <div className="title">🔋 Cell Normaliser🔋</div>
              <div className="subtitle">
                <i>v0.0.1 - alpha</i>
              </div>
              <div className="subtitle">
                This is a work in progress - email{" "}
                <a href="mailto:i.squires20@imperial.ac.uk">
                  i.squires20@imperial.ac.uk
                </a>{" "}
                for more info
              </div>
            </div>
            <div className="box-4">
              <Toolbar />
            </div>
          </div>
          <div className="box-row">
            <div className="box-12">
              <div className="box-row">
                <div id="electrode-container" className="box-6">
                  <Electrode />
                  {/* <SubElectrode /> */}
                </div>
                <div id="stack-container" className="box-3">
                  <Stack />
                </div>
                <div id="cell-container" className="box-3">
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
