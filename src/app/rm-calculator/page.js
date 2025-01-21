"use client";

import React, { useState, useEffect, useRef, Suspense} from "react";
import '../styles/globals.css';
import './rm-calculator.css'; 
import { FiSettings } from "react-icons/fi"; 
import calculate1RM from "../utils/calculate1RM.mjs";
import calculateWeightForReps from "../utils/calculateWeightForReps.mjs";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
    const [intensityChartUnit, setIntensityChartUnit] = useState("RPE");
    const intensityChartData = [
        { value: 10, definition: "Max effort, not another rep"}, 
        { value: 9.5, definition: "Maybe 1 rep left"}, 
        { value: 9, definition: "Definitely 1 rep left"}, 
        { value: 8.5, definition: "Maybe 2 reps left, definitely 1"}, 
        { value: 8, definition: "Definitely 2 reps left"}, 
        { value: 7.5, definition: "Maybe 3 reps left, definitely 2"}, 
        { value: 7, definition: "Definitely 3 reps left"}, 
        { value: 6.5, definition: "Maybe 4 reps left, definitely 3"}, 
        { value: 6, definition: "Definitely 4 reps left"}, 
    ];
    const adjustedIntensityChartValues = intensityChartData.map((row) => ({
        ...row, adjustedIntensityChartValues: intensityChartUnit === "RIR" ? 10 - row.value : row.value, }));

    useEffect(() => {
        setIntensity(intensityUnit === "RPE" ? 10 : 0);
    }, [intensityUnit]);
    
    useEffect(() => {
        setTargetIntensity(intensityUnit === "RPE" ? 10 : 0);
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

    const handleTargetRepChange = (value) => {
        // Allow only whole numbers between 1 and 12
        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 12) {
            setTargetReps(numericValue);
        } else if (value === "") {
            // Allow clearing the input
            setTargetReps("");
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

    const handleTargetIntensityBlur = () => {
        const numericValue = parseFloat(targetIntensity);
    
        if (intensityUnit === "RPE") {
            if (!isNaN(numericValue) && numericValue >= 4 && numericValue <= 10 && (numericValue * 10) % 5 === 0) {
                setTargetIntensity(numericValue % 1 === 0 ? numericValue.toString() : numericValue.toFixed(1));
            } else {
                // Round to the nearest valid value within range
                const clampedValue = Math.min(10, Math.max(4, Math.round(numericValue * 2) / 2));
                setTargetIntensity(clampedValue % 1 === 0 ? clampedValue.toString() : clampedValue.toFixed(1));
            }
        } else if (intensityUnit === "RIR") {
            if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 6 && (numericValue * 10) % 5 === 0) {
                setTargetIntensity(numericValue % 1 === 0 ? numericValue.toString() : numericValue.toFixed(1));
            } else {
                // Round to the nearest valid value within range
                const clampedValue = Math.min(6, Math.max(0, Math.round(numericValue * 2) / 2));
                setTargetIntensity(clampedValue % 1 === 0 ? clampedValue.toString() : clampedValue.toFixed(1));
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

    const [targetReps, setTargetReps] = useState("");
    const [targetIntensity, setTargetIntensity] = useState(intensityUnit === "RPE" ? 10 : 0);
    const displayedTargetReps = targetReps || 0;

    const handleTargetIntensityValueChange = (value) => {
        if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
            setTargetIntensity(value); // Allow temporary invalid input
        }
    };

    // Enter key for next input box
    const weightInputRef = useRef(null);
    const repsInputRef = useRef(null);
    const intensityInputRef = useRef(null);
    const targetRepsInputRef = useRef(null);
    const targetIntensityInputRef = useRef(null);

    // Focus handler
    const handleEnterKey = (event, nextInputRef) => {
        if (event.key === "Enter" && nextInputRef.current) {
            nextInputRef.current.focus();
        }
    }

    // clear input code
    useEffect(() => {
        const inputElements = document.querySelectorAll(".inputValueClear");

        inputElements.forEach((inputElement) => {
            if (inputElement) {
                // store original value
                let originalValue = inputElement.value;
        
                inputElement.addEventListener("focus", () => {
                    // If the input field still has the original value, lighten it
                    if (inputElement.value === originalValue) {
                        inputElement.classList.add("input-placeholder");
                        inputElement.value = ""; // Clear the input but keep it visually
                        inputElement.placeholder = originalValue; // Show placeholder
                    }
                });
        
                inputElement.addEventListener("input", () => {
                    // Remove placeholder styling as user types
                    inputElement.classList.remove("input-placeholder");
                    inputElement.placeholder = ""; // Clear placeholder
                });
        
                inputElement.addEventListener("blur", () => {
                    // Restore the original value if no new input is entered
                    if (!inputElement.value.trim()) {
                        inputElement.value = originalValue; // Restore previous value
                        inputElement.classList.remove("input-placeholder");
                        inputElement.placeholder = ""; // Clear placeholder
                    } else {
                        // Update the original value to the new input
                        originalValue = inputElement.value;
                    }
                });
            }
        });
    }, []); // Empty dependency array ensures this runs only on mount
    

    // Calculate 1RM (fallback to 0 if inputs are invalid)
    const oneRepMax = weight && reps ? calculate1RM(weight, weightUnit, reps, intensityUnit, intensity, isWeightedBodyweight, bodyweight, percentageOfBodyweight) : 0;
    const weightForReps = weight && reps && targetReps ? calculateWeightForReps(weight, weightUnit, reps, intensityUnit, intensity, isWeightedBodyweight, bodyweight, percentageOfBodyweight, targetReps, targetIntensity) : 0;
    
    
    // which calc
    const searchParams = useSearchParams();
    const calculatorParam = searchParams.get('calculator');
    const [calculatorType, setCalculatorType] = useState(calculatorParam === 'Weight-for-Reps' ? 'Weight for Reps Calculator' : '1 RM Calculator');

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keep calculatorType in sync with URL
    useEffect(() => {
        if (calculatorParam) {
            setCalculatorType(
                calculatorParam === 'Weight-for-Reps' ? 'Weight for Reps Calculator' : '1 RM Calculator'
            );
        }
    }, [calculatorParam]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main>
                <div className="rm-calculation-container">
                    <div className="header-container">
                        <div ref={dropdownRef} className={`custom-select ${isOpen ? 'active' : ''}`} >
                            <div className="custom-select-header" onClick={() => setIsOpen(!isOpen)} > {calculatorType} </div>
                            <div className="custom-select-options">
                                <Link href="/rm-calculator?calculator=1RM" onClick={() => setIsOpen(false)} className={calculatorType === "1 RM Calculator" ? "selected" : ""} >1 RM Calculator</Link>
                                <Link href="/rm-calculator?calculator=Weight-for-Reps" onClick={() => setIsOpen(false)} className={calculatorType === "Weight for Reps Calculator" ? "selected" : ""} >Weight for Reps Calculator</Link>
                            </div>
                        </div>
                    </div>
                    <div className="result-container">
                        {calculatorType === "1 RM Calculator" && (
                            <div className="result-container-calculator">
                                <div>{displayedWeight} {weightUnit.toLowerCase()} x {displayedReps} reps @ {intensityUnit} {intensity} equals</div>
                                <h1>{oneRepMax} {weightUnit.toLowerCase()}</h1>
                            </div>
                        )}

                        {calculatorType === "Weight for Reps Calculator" && (
                            <div className="result-container-calculator">
                                <div>{displayedWeight} {weightUnit.toLowerCase()} x {displayedReps} reps @ {intensityUnit} {intensity} equals</div>
                                <h1>{weightForReps} {weightUnit.toLowerCase()}</h1>
                                <div>for {displayedTargetReps} reps @ {intensityUnit} {targetIntensity}</div>
                            </div>
                        )}
                    </div>
                    <div className="data-container">
                        <div className="weight-container">
                            {calculatorType === "Weight for Reps Calculator" && (
                                <div id="weight-for-reps-calculator" className="reps-and-intensity-container">
                                    <label>Targets</label>
                                    <div className="reps-input-container">
                                        <input className="inputValueClear" type="text" inputMode="decimal" pattern="[0-9]*\.?[0-9]*" value={targetReps} onChange={(e) => handleTargetRepChange(e.target.value)} placeholder="Reps" ref={targetRepsInputRef} onKeyDown={(e) => handleEnterKey(e, targetIntensityInputRef)} />
                                    </div>
                                    <div className="intensity-container">
                                        <select value={intensityUnit} onChange={(e) => handleIntensityChange(e.target.value)}>
                                            <option value="RPE">RPE</option>
                                            <option value="RIR">RIR</option>
                                        </select>
                                        <input className="inputValueClear" type="text" inputMode="decimal" pattern="[0-9]*\.?[0-9]*" value={targetIntensity} onChange={(e) => handleTargetIntensityValueChange(e.target.value)} onBlur={handleTargetIntensityBlur} ref={targetIntensityInputRef} onKeyDown={(e) => handleEnterKey(e, weightInputRef)} />
                                    </div>
                                    <span></span>
                                    <label className="known-rm-label">Known RM</label>
                                </div>
                            )}
                            <input className="weight-input inputValueClear" type="text" inputMode="decimal" pattern="[0-9]*\.?[0-9]*" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight" ref={weightInputRef} onKeyDown={(e) => handleEnterKey(e, repsInputRef)} />
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
                                <input className="inputValueClear" type="text" inputMode="decimal" pattern="[0-9]*\.?[0-9]*" value={reps} onChange={(e) => handleRepChange(e.target.value)} placeholder="Reps" ref={repsInputRef} onKeyDown={(e) => handleEnterKey(e, intensityInputRef)} />
                            </div>
                            <div className="intensity-container">
                                <select value={intensityUnit} onChange={(e) => handleIntensityChange(e.target.value)}>
                                    <option value="RPE">RPE</option>
                                    <option value="RIR">RIR</option>
                                </select>
                                <input className="inputValueClear" type="text" inputMode="decimal" pattern="[0-9]*\.?[0-9]*" value={intensity} onChange={(e) => handleIntensityValueChange(e.target.value)} onBlur={handleIntensityBlur} ref={intensityInputRef} />
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
                                            className="inputValueClear"
                                            type="number"
                                            value={bodyweight}
                                            onChange={(e) => setBodyweight(e.target.value)}
                                            placeholder="Bodyweight"
                                        />
                                    </div>
                                    {isAdvVisible && (
                                        <div className="percentage-container">
                                            <input className="inputValueClear" type="number" value={percentageOfBodyweight} onChange={(e) => handlePercentageOfBodyweightChange(e.target.value)} />
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
                <div className="intensity-chart">
                    <table>
                        <thead>
                            <tr>
                                <th><select value={intensityChartUnit} onChange={(e) => setIntensityChartUnit(e.target.value)}>
                                    <option value="RPE">RPE</option>
                                    <option value="RIR">RIR</option>
                                </select></th>
                                <th>Definition</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adjustedIntensityChartValues.map((row, index) => ( <tr key={index}>
                                <td className="intensity-chart-intensity-column">{row.adjustedIntensityChartValues}</td>
                                <td>{row.definition}</td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
                <div className="info-bottom-section">
                    {calculatorType === "1 RM Calculator" && (
                        <div className="calculator-info-bottom-section">
                            <h2>The 1 RM Calculator</h2>
                            <p>Estimate your 1 rep max with ease.</p>
                            <p>For best accuracy, use set with lower reps done close to failure.</p>
                            <h3>How to Use</h3>
                            <ul>
                                <li>Enter the weight used.</li>
                                <li>Enter the number of reps (between 1-12).</li>
                                <li>Enter the RPE (4-10) or RIR (0-6) in 0.5 increments.</li>
                            </ul>
                        </div>
                    )}
                    {calculatorType === "Weight for Reps Calculator" && (
                        <div className="calculator-info-bottom-section">
                            <h2>The Weight for Reps Calculator</h2>
                            <p>Find the weight you can lift for a given number of reps.</p>
                            <p><strong>Ex:</strong> Find 5 rep max @ RPE 9 using any known rep max.</p>
                            <h3>How to Use</h3>
                            <h4>Targets</h4>
                            <ul>
                                <li>Enter your target number of reps.</li>
                                <li>Enter your target RPE (4-10) or RIR (0-6).</li>
                            </ul>
                            <h4 className="known-rep-max">Known Rep Max</h4>
                            <ul>
                                <li>Enter the weight used.</li>
                                <li>Enter the number of reps (between 1-12).</li>
                                <li>Enter the RPE (4-10) or RIR (0-6) in 0.5 increments.</li>
                            </ul>
                        </div>
                    )}
                </div>
            </main>
        </Suspense>
    );
}
