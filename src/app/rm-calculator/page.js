"use client";

import { useState } from "react";
import '../styles/globals.css'
import './rm-calculator.css'; 

export default function RepMaxCalculator() {
    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");
    const [intensity, setIntensity] = useState("");
    const [weightUnit, setWeightUnit] = useState("LB");
    const [intensityUnit, setIntensityUnit] = useState("RPE");
    const [isWeightedBodyweight, setIsWeightedBodyweight] = useState(false);
    const [bodyweight, setBodyweight] = useState("");

    function handleUnitChange(unit) {
        setWeightUnit(unit);
    }
    
    function handleIntensityChange(unit) {
        setIntensityUnit(unit);
    }

    return (
        <main>
            <div>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight"/>
                <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} placeholder="Reps"/>
                <input type="number" value={intensity} onChange={(e) => setIntensity(e.target.value)} placeholder="RPE"/>
                <div>
                    <input type="radio" checked={weightUnit === "LB"} onChange={() => {handleUnitChange("LB")}}></input>
                    <label>LB</label>
                </div>
                <div>
                    <input type="radio" checked={weightUnit === "KG"}  onChange={() => {handleUnitChange("KG")}}></input>
                    <label>KG</label>
                </div>
                <div>
                    <input type="radio" checked={intensityUnit === "RPE"} onChange={() => {handleIntensityChange("RPE")}}></input>
                    <label>RPE</label>
                </div>
                <div>
                    <input type="radio" checked={intensityUnit === "RIR"}  onChange={() => {handleIntensityChange("RIR")}}></input>
                    <label>RIR</label>
                </div>
                <div>
                    <input type="checkbox" checked={isWeightedBodyweight}  onChange={(e) => setIsWeightedBodyweight(e.target.checked)}></input>
                    <label>Weighted pull up/dip?</label>
                </div>
                <div>
                    <input type="number" value={bodyweight} onChange={(e) => setBodyweight(e.target.value)} placeholder="Bodyweight" />
                </div>
                {weight} {weightUnit.toLowerCase()} x {reps} @ {intensityUnit} {intensity}
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