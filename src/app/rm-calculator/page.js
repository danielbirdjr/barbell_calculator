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

    const handleCheckboxChange = (checked) => {
        setIsWeightedBodyweight(checked);
        if (!checked) {
            setIsAdvVisible(false); // Reset advanced visibility
            setPercentageOfBodyweight(100); // Reset percentage to default
        }
    };

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
                        <select>
                            <option>One Rep Max Calculator</option>
                            <option>Calculate # of Reps by RM</option>
                        </select>
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
                    <div className="weighted-pull-up-container">
                        <div className="weighted-pull-up-header-container">
                            <div className="weighted-pull-up-checkbox-container">
                                <input
                                    type="checkbox"
                                    checked={isWeightedBodyweight}
                                    onChange={(e) => handleCheckboxChange(e.target.checked)}
                                />
                                <label>Weighted pull up/dip?</label>
                            </div>
                            {isWeightedBodyweight && (
                                <span
                                    className="adv-settings-toggle"
                                    onClick={() => setIsAdvVisible(!isAdvVisible)}
                                >
                                    Adv <FiSettings />
                                </span>
                            )}
                        </div>

                        {isWeightedBodyweight && (
                            <div className="bodyweight-and-percentage-container">
                                <div className="bodyweight-container">
                                    <input
                                        type="number"
                                        value={bodyweight}
                                        onChange={(e) => setBodyweight(e.target.value)}
                                        placeholder="Bodyweight"
                                    />
                                </div>
                                {isAdvVisible && (
                                    <div className="percentage-container">
                                        <input
                                            type="number"
                                            value={percentageOfBodyweight}
                                            onChange={(e) => setPercentageOfBodyweight(e.target.value)}
                                        />
                                        <span>%</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {isWeightedBodyweight && isAdvVisible && (
                            <ul className="advanced-settings-list">
                                <li>Adjust % of your BW to include in total weight.</li>
                                <li>Ex: Weighted Push Ups: count 60% of your BW since you aren't lifting weight of your legs.</li>
                            </ul>
                        )}
                    </div>
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
// whenever the user checks the checkbox and then opens the adv, if the user then unchecks the checkbox, the next time they check it again, it should be default have the advanced setting unopened and make sure it resetted the bodyweight percentage to the default