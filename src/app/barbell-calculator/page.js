"use client";

import { useState, useEffect } from "react";
import "../styles/globals.css";
import "./barbell-calculator.css";
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
    const [isMicroPlates, setIsMicroPlates] = useState(false);
    const [isWeightedCollars, setIsWeightedCollars] = useState(false);
    const [isDipBeltLayout, setIsDipBeltLayout] = useState(false);
    const [result, setResult] = useState(null);
    const [customBarbellWeight, setCustomBarbellWeight] = useState("");
    const [isCustomBarbellWeightSelected, setIsCustomBarbellWeightSelected] =
        useState(false);

    // Automatically calculate plates when inputs change
    useEffect(() => {
        if (totalWeight !== "" && barbellWeight !== null && weightUnit) {
            const calculatedPlates = calculatePlates(
                totalWeight,
                barbellWeight,
                weightUnit,
                weightPlates,
                isMicroPlates,
                isDipBeltLayout,
                isWeightedCollars
            );
            setResult(calculatedPlates);
        } else {
            setResult(null); // Clear results when inputs are invalid or empty
        }
    }, [
        totalWeight,
        barbellWeight,
        weightUnit,
        isMicroPlates,
        isDipBeltLayout,
        isWeightedCollars,
    ]);

    function handleUnitChange(unit) {
        setWeightUnit(unit);
        if (isCustomBarbellWeightSelected) {
            setBarbellWeight(customBarbellWeight);
        } else {
            const currentIndex = barbellOptions[weightUnit].indexOf(barbellWeight);
            const newBarbellWeight = barbellOptions[unit][currentIndex] || barbellOptions[weightUnit][0];
            setBarbellWeight(newBarbellWeight);
        }
    }

    function resetPlatesDisplay() {
        setResult(null);
    }

    function resetWeightInput() {
        setTotalWeight("");
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

    const handleCustomBarbellWeightInput = (value) => {
        if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
            setCustomBarbellWeight(value);

            const numericValue = parseFloat(value);
            if (!isNaN(numericValue)) {
                setBarbellWeight(numericValue); // Update the plates in real-time
            }
        }
    };

    const handleCustomBarbellWeightBlur = () => {
        const numericValue = parseFloat(customBarbellWeight);

        if (!isNaN(numericValue)) {
            let roundedValue;

            // Round the value based on the unit
            if (weightUnit === "LB") {
                roundedValue = Math.round(numericValue / 0.5) * 0.5;
            } else if (weightUnit === "KG") {
                roundedValue = Math.round(numericValue / 0.25) * 0.25;
            }

            // Update custom barbell weight and set as the selected barbell weight
            setCustomBarbellWeight(roundedValue.toString());
            if (isCustomBarbellWeightSelected) {
                setBarbellWeight(roundedValue); // Update the barbell weight if this input is selected
            }
        } else {
            // Reset to an empty state if the input is invalid
            setCustomBarbellWeight("");
            if (isCustomBarbellWeightSelected) {
                setBarbellWeight(null);
            }
        }
    };

    const handleCustomBarbellWeightFocus = () => {
        setIsCustomBarbellWeightSelected(true);
        setBarbellWeight(null);
    };

    // Clear barbell weights when Dip Belt Layout is active & set custom barbell weight to 0
    useEffect(() => {
        if (isDipBeltLayout) {
            setBarbellWeight(0);
            setIsCustomBarbellWeightSelected(true);
            setCustomBarbellWeight(0);
        }
    }, [isDipBeltLayout]);

    return (
        <main>
            <div className="title-container">
                <h1>Barbell Calculator</h1>
                <button
                    onClick={() => {
                        resetPlatesDisplay();
                        resetWeightInput();
                    }}
                >
                    <FiRotateCcw />
                </button>
            </div>
            <div className="barbell-display-container">
                <div className="weight-display">
                    {weightUnit === "LB" && (
                        <p>
                            {totalWeight} {weightUnit} (
                            {Math.round((totalWeight / 2.20462) * 10) / 10} KG)
                        </p>
                    )}
                    {weightUnit === "KG" && (
                        <p>
                            {totalWeight} {weightUnit} (
                            {Math.round(totalWeight * 2.20462 * 10) / 10} LB)
                        </p>
                    )}
                </div>
                {!isDipBeltLayout && (
                    <div className="barbell-display">
                        <div className="bar-sleeve left-side">
                            <div className="plates-container left-side">
                                {renderPlates(
                                    result,
                                    weightUnit,
                                    isWeightedCollars
                                )}
                            </div>
                        </div>
                        <div className="collar left-side"></div>
                        <div className="bar">
                            {barbellWeight}
                            {weightUnit}
                        </div>
                        <div className="collar right-side"></div>
                        <div className="bar-sleeve right-side">
                            <div className="plates-container right-side">
                                {renderPlates(
                                    result,
                                    weightUnit,
                                    isWeightedCollars
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {isDipBeltLayout && (
                    <div className="weighted-dip-barbell-display">
                        <div className="plates-container">
                            {renderPlates(
                                result,
                                weightUnit,
                                isWeightedCollars
                            )}
                        </div>
                    </div>
                )}
                <div className="plate-results-container">
                    {/* convert the result object into renderable JSX, an array */}
                    {result && typeof result === "object" && (
                        <div className="plate-results">
                            {Object.entries(result)
                                .filter(([_, count]) => count > 0)
                                .sort(
                                    ([plate1], [plate2]) =>
                                        parseFloat(plate2) - parseFloat(plate1)
                                )
                                .map(([plate, count]) => (
                                    <div key={plate} className="plate-object">
                                        {count}x{plate}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="calculation-and-options-container">
                <div className="enter-weight-and-input-container">
                    <h3>Enter Weight</h3>
                    <input
                        className="inputValueClear"
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*\.?[0-9]*"
                        value={totalWeight}
                        onChange={(e) => setTotalWeight(e.target.value)}
                    ></input>
                </div>
                <div className="options-container">
                    <div className="units-container">
                        <h3>Select Units</h3>
                        <div className="units-options-container">
                            <div className="weight-unit">
                                <input
                                    type="radio"
                                    checked={weightUnit === "LB"}
                                    onChange={() => {
                                        handleUnitChange("LB");
                                        resetPlatesDisplay();
                                    }}
                                ></input>
                                <label>LB</label>
                            </div>
                            <div className="weight-unit">
                                <input
                                    type="radio"
                                    checked={weightUnit === "KG"}
                                    onChange={() => {
                                        handleUnitChange("KG");
                                        resetPlatesDisplay();
                                    }}
                                ></input>
                                <label>KG</label>
                            </div>
                        </div>
                    </div>
                    <div className="barbell-weight-container">
                        <h3>Select Barbell</h3>
                        <div className="barbell-weight-options">
                            {barbellOptions[weightUnit].map((weight) => (
                                <button
                                    key={weight}
                                    onClick={() => {
                                        setBarbellWeight(weight);
                                        setIsCustomBarbellWeightSelected(false);
                                        resetPlatesDisplay();
                                    }}
                                    className={
                                        barbellWeight === weight
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    {weight} {weightUnit}
                                </button>
                            ))}
                            <input
                                type="text"
                                inputMode="decimal"
                                pattern="[0-9]*\.?[0-9]*"
                                placeholder="Other"
                                value={customBarbellWeight}
                                className={`${
                                    isCustomBarbellWeightSelected
                                        ? "selected"
                                        : ""
                                }`}
                                onFocus={handleCustomBarbellWeightFocus}
                                onChange={(e) =>
                                    handleCustomBarbellWeightInput(
                                        e.target.value
                                    )
                                }
                                onBlur={handleCustomBarbellWeightBlur}
                            ></input>
                        </div>
                    </div>
                    <div className="additional-options-container">
                        <h3>More Options</h3>
                        <div className="option">
                            <input
                                type="checkbox"
                                checked={isMicroPlates}
                                onChange={() =>
                                    setIsMicroPlates(!isMicroPlates)
                                }
                            ></input>
                            <label>Micro plates?</label>
                        </div>
                        <div className="option">
                            <input
                                type="checkbox"
                                checked={isDipBeltLayout}
                                onChange={() => {
                                    setIsDipBeltLayout(!isDipBeltLayout);
                                    setIsWeightedCollars(false);
                                }}
                            ></input>
                            <label>Dip belt layout?</label>
                        </div>
                        <div className="option">
                            <input
                                type="checkbox"
                                checked={isWeightedCollars}
                                onChange={() => {
                                    setIsWeightedCollars(!isWeightedCollars);
                                    setIsDipBeltLayout(false);
                                }}
                            ></input>
                            {weightUnit === "LB" && (
                                <label>5 LB collars?</label>
                            )}
                            {weightUnit === "KG" && (
                                <label>2.5 KG collars?</label>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

// dip belt layout
// put heaviest plates in middle, lightest on outside
// use bumper plates for 10lb and 25lb
// try to evenly divide it
//  ex) totalweight = 132.5 lb: 2.5, 10, 45, 45, 25, 5
// 45's are always in middle, then 25lb and 10 on the outside of the 45's, then the 2.5 and 5's on the very outside

// whats currently wrong with the dip belt layout
// 1. when i am using dip belt layout and switch from lb to kg, it automatically defaults to the default barbell weight instead of using whatever was in the custom barbell weight, which is likely 0

// whats currently wrong with the custom barbell weight
// 1. if i refresh page and then enter total weight and then click on customBarbellWeight and then click off of it without entering unit, it and the rendering plates remain blank. instead it should then default back to the previously selected barbellWeight option
// 2. if i had value in customBarbellWeight input, and then click back in, it unrenders plates. it should hold the previous values rendered plates until the user starts typing
// 3. whenever i have a value in the custom barbell weight but have a different barbell weight selected, and i go to select the custom barbell weight option, whenever i click or tap on it, it first unrenders the plates and it is not until i click out of the input box that it re renders the plates if i didnt want to make changes to the custom barbell weight

// customBarbellWeight input box doesnt act how its supposed to
