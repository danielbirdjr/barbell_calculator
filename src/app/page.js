"use client";

import { useState } from "react";

export default function Home() {
  const barbellOptions = {
    LB: [45, 20, 0], 
    KG: [20, 15, 0],
  };
  const [weightUnit, setWeightUnit] = useState("LB");
  const [barbellWeight, setBarbellWeight] = useState(barbellOptions["LB"][0]);

  function handleUnitChange(unit) {
    setWeightUnit(unit);
    setBarbellWeight(barbellOptions[unit][0]); // Reset to first opt of unit
  }
  return (
    <main>
      <div className="nav-bar">
        <h1>Barbell Calculator</h1>
      </div>
      <div className="barbell-display-container">
        <div className="weight-display"></div>
        <div className="barbell-display"></div>
      </div>
      <div className="calculation-and-options-container">
        <div className="enter-weight-and-input-container">
          <h3>Enter Weight</h3>
          <input></input>
        </div>
        <div className="options-container">
          <div className="units-container">
            <h3>Select Units</h3>
            <div className="units-options-container">
              <div className="weight-unit">
                <input type="radio" checked={weightUnit === "LB"} onChange={() => handleUnitChange("LB")}></input>
                <label>LB</label>
              </div>
              <div className="weight-unit">
                <input type="radio" checked={weightUnit === "KG"} onChange={() => handleUnitChange("KG")}></input>
                <label>KG</label>
              </div>
              
            </div>
          </div>
          <div className="barbell-weight-container">
            <h3>Select Barbell</h3>
            <div className="barbell-weight-options">
            {barbellOptions[weightUnit].map((weight) => (
              <button key={weight} onClick={() => setBarbellWeight(weight)}>{weight}</button>
            ))}
            </div>
          </div>
        </div>
        <div className="calculate-button-container">
          <button>Calculate plates</button>
        </div>
      </div>
      <p>{weightUnit}</p>
      <p>{barbellWeight}</p>
    </main>
  );
}
