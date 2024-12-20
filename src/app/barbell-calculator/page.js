"use client";

import { useState } from "react";
import '../styles/globals.css'
import './barbell-calculator.css'; 
import { FiRotateCcw } from "react-icons/fi";
import calculatePlates from "../utils/calculatePlates.mjs"; 
import renderPlates from "../utils/renderPlates.mjs";

export default function BarbellCalculator() {
  const barbellOptions = {
    LB: [45, 35, 20], 
    KG: [20, 15, 10],
  };
  const weightPlates = {
    LB: [45, 25, 10, 5, 2.5], 
    KG: [25, 20, 15, 10, 5, 2.5, 1.25], 
  };

  const [weightUnit, setWeightUnit] = useState("LB");
  const [barbellWeight, setBarbellWeight] = useState(barbellOptions["LB"][0]);
  const [totalWeight, setTotalWeight] = useState("");
  const [result, setResult] = useState(null);

  function handleUnitChange(unit) {
    setWeightUnit(unit);
    setBarbellWeight(barbellOptions[unit][0]);  // Reset/default to first opt of unit
  }

  function resetPlatesDisplay() {
    setResult(null);
  }

  function resetWeightInput() {
    setTotalWeight("");
  }

  return (
    <main>
      <div className="nav-bar">
        <h1>Barbell Calculator</h1>
        <button onClick={() => {resetPlatesDisplay(); resetWeightInput(); }}><FiRotateCcw /></button>
      </div>
      <div className="barbell-display-container">
        <div className="weight-display">
          {weightUnit === "LB" && <p>{totalWeight} {weightUnit} ({Math.round((totalWeight / 2.20462) * 10) / 10} KG)</p>}
          {weightUnit === "KG" && <p>{totalWeight} {weightUnit} ({Math.round((totalWeight * 2.20462) * 10) / 10} LB)</p>}
        </div>
        <div className="barbell-display">
          <div className="bar-sleeve left-side">
            <div className="plates-container left-side">
              {renderPlates(result, weightUnit)}
            </div>
          </div>
          <div className="collar left-side"></div>
          <div className="bar">{barbellWeight}{weightUnit}</div>
          <div className="collar right-side"></div>
          <div className="bar-sleeve right-side">
            <div className="plates-container right-side">
              {renderPlates(result, weightUnit)}
            </div>
          </div>
        </div>
        <div className="plate-results-container">
          {/* convert the result object into renderable JSX, an array */}
          {result && typeof result === "object" && (
            <div className="plate-results">
              {Object.entries(result)
                .filter(([_, count]) => count > 0)
                .sort(([plate1], [plate2]) => parseFloat(plate2) - parseFloat(plate1))
                .map(([plate, count]) => (
                  <div key={plate} className="plate-object">{count}x{plate}</div>
                ))}
            </div>
            )}
        </div>
      </div>
      <div className="calculation-and-options-container">
        <div className="enter-weight-and-input-container">
          <h3>Enter Weight</h3>
          <input type="number" value={totalWeight} onChange={(e) => setTotalWeight(e.target.value)}></input>
        </div>
        <div className="options-container">
          <div className="units-container">
            <h3>Select Units</h3>
            <div className="units-options-container">
              <div className="weight-unit">
                <input type="radio" checked={weightUnit === "LB"} onChange={() => {handleUnitChange("LB"); resetPlatesDisplay(); }}></input>
                <label>LB</label>
              </div>
              <div className="weight-unit">
                <input type="radio" checked={weightUnit === "KG"} onChange={() => {handleUnitChange("KG"); resetPlatesDisplay(); }}></input>
                <label>KG</label>
              </div>
              
            </div>
          </div>
          <div className="barbell-weight-container">
            <h3>Select Barbell</h3>
            <div className="barbell-weight-options">
            {barbellOptions[weightUnit].map((weight) => (
              <button key={weight} onClick={() => {setBarbellWeight(weight); resetPlatesDisplay(); }}  className={barbellWeight === weight ? "selected" : ""}>{weight} {weightUnit}</button>
            ))}
            </div>
          </div>
        </div>
        <div className="calculate-button-container">
          <button onClick={() => setResult(calculatePlates(totalWeight, barbellWeight, weightUnit, weightPlates))}>Calculate Plates</button>
        </div>
      </div>
    </main>
  );
}
