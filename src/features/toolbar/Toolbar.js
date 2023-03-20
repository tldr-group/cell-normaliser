import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Toolbar.module.css";
import "./../../App.css";

export function Toolbar() {
  return (
    <div>
      <div className="container">
        <div className="box-12 vertical-align-parent">
          <div className={styles.toolbar}>
            <div className="box-row">
              <div className="box-4">
                <div tabIndex={0} className={styles.toolbarDropdown}>
                  <div className={styles.toolbarButton}>Save</div>
                  <div className={styles.toolbarItems}>
                    <div
                      className={styles.toolbarItem}
                      key="zenode"
                      onClick={() => console.log("zenodo")}
                    >
                      Save to Zenodo
                    </div>
                  </div>
                  <div className={styles.toolbarItems}>
                    <div
                      className={styles.toolbarItem}
                      key="local"
                      onClick={() => console.log("zenodo")}
                    >
                      Save to file
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-4">
                <div tabIndex={0} className={styles.toolbarDropdown}>
                  <div className={styles.toolbarButton}>Load</div>
                  <div className={styles.toolbarItems}>
                    <div
                      className={styles.toolbarItem}
                      key="zenode"
                      onClick={() => console.log("zenodo")}
                    >
                      Load from file
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-4">
                <div tabIndex={0} className={styles.toolbarDropdown}>
                  <div className={styles.toolbarButton}>Plot</div>
                  <div className={styles.toolbarItems}>
                    <div
                      className={styles.toolbarItem}
                      key="zenode"
                      onClick={() => console.log("zenodo")}
                    >
                      Export ragone
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
