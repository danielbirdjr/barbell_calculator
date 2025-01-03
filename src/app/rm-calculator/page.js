"use client";

import { useState } from "react";
import '../styles/globals.css'
import './rm-calculator.css'; 
import { FiSettings } from "react-icons/fi"; 
import { FiMenu } from "react-icons/fi";
import calculate1RM from "../utils/calculate1RM.mjs";
import { useEffect } from "react";


export default function RepMaxCalculator() {
    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");
    const [weightUnit, setWeightUnit] = useState("LB");
    const [intensityUnit, setIntensityUnit] = useState("RPE");
    const [intensity, setIntensity] = useState(intensityUnit === "RPE" ? 10 : 0);
    const [isWeightedBodyweight, setIsWeightedBodyweight] = useState(false);
    const [bodyweight, setBodyweight] = useState("");
    const [isAdvVisible, setIsAdvVisible] = useState(false);
    const [percentageOfBodyweight, setPercentageOfBodyweight] = useState(100);

    useEffect(() => {
        setIntensity(intensityUnit === "RPE" ? 10 : 0);
    }, [intensityUnit]);

    const handleCheckboxChange = (checked) => {
        setIsWeightedBodyweight(checked);
        if (!checked) {
            setIsAdvVisible(false); // Reset advanced visibility
            setPercentageOfBodyweight(100); // Reset percentage to default
        }
    };

    const handleRepChange = (value) => {
        // Allow only whole numbers between 1 and 12
        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 12) {
            setReps(numericValue);
        } else if (value === "") {
            // Allow clearing the input
            setReps("");
        }
    };

    const handleIntensityValueChange = (value) => {
        if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
            setIntensity(value); // Allow temporary invalid input
        }
    };
    
    const handleIntensityBlur = () => {
        const numericValue = parseFloat(intensity);
    
        if (intensityUnit === "RPE") {
            if (!isNaN(numericValue) && numericValue >= 4 && numericValue <= 10 && (numericValue * 10) % 5 === 0) {
                setIntensity(numericValue % 1 === 0 ? numericValue.toString() : numericValue.toFixed(1));
            } else {
                // Round to the nearest valid value within range
                const clampedValue = Math.min(10, Math.max(4, Math.round(numericValue * 2) / 2));
                setIntensity(clampedValue % 1 === 0 ? clampedValue.toString() : clampedValue.toFixed(1));
            }
        } else if (intensityUnit === "RIR") {
            if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 6 && (numericValue * 10) % 5 === 0) {
                setIntensity(numericValue % 1 === 0 ? numericValue.toString() : numericValue.toFixed(1));
            } else {
                // Round to the nearest valid value within range
                const clampedValue = Math.min(6, Math.max(0, Math.round(numericValue * 2) / 2));
                setIntensity(clampedValue % 1 === 0 ? clampedValue.toString() : clampedValue.toFixed(1));
            }
        }
    };

    const handlePercentageOfBodyweightChange = (value) => {
        // Allow only numbers between 0 and 100
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
            setPercentageOfBodyweight(numericValue);
        } else if (value === "") {
            // Allow clearing the input
            setPercentageOfBodyweight("");
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
    // const displayedIntensity = intensity || (intensityUnit === "RPE" ? 10 : 0);

    // Calculate 1RM (fallback to 0 if inputs are invalid)
    const oneRepMax = weight && reps ? calculate1RM(weight, weightUnit, reps, intensityUnit, intensity, isWeightedBodyweight, bodyweight, percentageOfBodyweight) : 0;

    return (
        <main>
            <div className="rm-calculation-container">
                <div className="header-container">
                        <select>
                            <option>1 Rep Max Calculator</option>
                            <option>Reps by RM Calculator</option>
                        </select>
                    </div>
                <div className="result-container">
                    {/* <h2>Result</h2> */}
                    <div>{displayedWeight} {weightUnit.toLowerCase()} x {displayedReps} reps @ {intensityUnit} {intensity} equals</div>
                    <h1>{oneRepMax} {weightUnit.toLowerCase()}</h1>
                </div>
                <div className="data-container">
                    <div className="weight-container">
                        <input className="weight-input" type="text" inputMode="decimal" pattern="[0-9]*\.?[0-9]*" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight"/>
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
                            <input type="text" inputMode="decimal" pattern="[0-9]*\.?[0-9]*" value={reps} onChange={(e) => handleRepChange(e.target.value)} placeholder="Reps" />
                        </div>
                        <div className="intensity-container">
                            <select value={intensityUnit} onChange={(e) => handleIntensityChange(e.target.value)}>
                                <option value="RPE">RPE</option>
                                <option value="RIR">RIR</option>
                            </select>
                            <input type="text" inputMode="decimal" pattern="[0-9]*\.?[0-9]*" value={intensity} onChange={(e) => handleIntensityValueChange(e.target.value)} onBlur={handleIntensityBlur} />
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
                                        <input type="number" value={percentageOfBodyweight} onChange={(e) => handlePercentageOfBodyweightChange(e.target.value)} />
                                        <span>%</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {isWeightedBodyweight && isAdvVisible && (
                            <ul className="advanced-settings-list">
                                <li>Adjust % of your BW to include in total weight.</li>
                                <li>Ex: Weighted Push Ups: count 60% of your BW since you aren&apos;t lifting weight of your legs.</li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

//conditional statements to add
// user must enter reps between 1-12
// user must enter RPE between 4-10
// user can enter RIR between 0-6
// intensity can be 0.5 increments


// on mobile:
// i want the number keypad (like phone number) to come up

// add in when user clicks enter, it takes them to next input

