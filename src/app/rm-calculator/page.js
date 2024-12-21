"use client";

import { useState } from "react";
import '../styles/globals.css'
import './rm-calculator.css'; 
import { FiSettings } from "react-icons/fi"; // <FiSettings />


export default function RepMaxCalculator() {
    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");
    const [intensity, setIntensity] = useState("");
    const [weightUnit, setWeightUnit] = useState("LB");
    const [intensityUnit, setIntensityUnit] = useState("RPE");
    const [isWeightedBodyweight, setIsWeightedBodyweight] = useState(false);
    const [bodyweight, setBodyweight] = useState("");
    const [isAdvVisible, setIsAdvVisible] = useState(false);
    const [percentageOfBodyweight, setPercentageOfBodyweight] = useState(100);

    function handleUnitChange(unit) {
        setWeightUnit(unit);
    }
    
    function handleIntensityChange(unit) {
        setIntensityUnit(unit);
    }

    const displayedWeight = weight || 0;
    const displayedReps = reps || 0;
    const displayedIntensity = intensity || (intensityUnit === "RPE" ? 10 : 0);

    return (
        <main>
            <div className="rm-calculation-container">
                <div className="data-container">
                    <div className="header-container">
                        <h2>One Rep Max Calculator</h2>
                    </div>
                    <div className="weight-container">
                        <input className="weight-input" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight"/>
                        <div className="weight-units-container">
                            <div className="weight-unit left-side-weight-unit">
                                <input type="radio" checked={weightUnit === "LB"} onChange={() => {handleUnitChange("LB")}}></input>
                                <label>LB</label>
                            </div>
                            <div className="weight-unit right-side-weight-unit">
                                <input type="radio" checked={weightUnit === "KG"}  onChange={() => {handleUnitChange("KG")}}></input>
                                <label>KG</label>
                            </div>
                        </div>
                    </div>
                    <div className="reps-and-intensity-container">
                        <div className="reps-input-container">
                            <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} placeholder="Reps"/>
                        </div>
                        <div className="intensity-container">
                            <select value={intensityUnit} onChange={(e) => handleIntensityChange(e.target.value)}>
                                <option value="RPE">RPE</option>
                                <option value="RIR">RIR</option>
                            </select>
                            <input type="number" value={intensity} onChange={(e) => setIntensity(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <input type="checkbox" checked={isWeightedBodyweight}  onChange={(e) => setIsWeightedBodyweight(e.target.checked)}></input>
                        <label>Weighted pull up/dip?</label>
                    </div>
                    {isWeightedBodyweight && (
                        <div>
                            <div><input type="number" value={bodyweight} onChange={(e) => setBodyweight(e.target.value)} placeholder="Bodyweight" /></div>
                            <div>
                                <span
                                    onClick={() => setIsAdvVisible(!isAdvVisible)} // Toggle visibility on click
                                    style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                                >
                                    Adv <FiSettings style={{ marginLeft: "5px" }} />
                                </span>
                                {isAdvVisible && (
                                    <ul>
                                        <li><input type="number" value={percentageOfBodyweight} onChange={(e) => setPercentageOfBodyweight(e.target.value)} />%</li>
                                        <li>Adjust % of your bodyweight to include in the total weight.</li>
                                        <li>(Ex) Weighted Push Ups: count 60% of your BW since you aren't lifting weight of your legs</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="result-container">
                    <h3>Result</h3>
                    <div>{displayedWeight} {weightUnit.toLowerCase()} x {displayedReps} reps @ {intensityUnit} {displayedIntensity} equals</div>
                    <h1>405 {weightUnit.toLowerCase()}</h1>
                </div>
            </div>
        </main>
    );
}
// weight input box
// reps input box
// RPE input box (defaults to RPE 10)
// toggle for LB vs KG
// toggle for RPE vs RIR
// toggle for weighted pull up/dips
//     if weighted pull ups/dips toggle is true:
//         add bodyweight input box
//         add adv dropdown part that is hidden by default to adjust % of BW