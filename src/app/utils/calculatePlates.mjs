export default function calculatePlates(totalWeight, barbellWeight, weightUnit, weightPlates, isMicroPlates, isDipBeltLayout, isWeightedCollars) {
    const collarWeightOptions = { LB: 10, KG: 5 };
    const microPlatesOptions = { LB: [1, 0.5, 0.25], KG: [0.5, 0.25, 0.125]};

    let collarWeight = isWeightedCollars ? collarWeightOptions[weightUnit] : 0;
    let smallestIncrement = weightPlates[weightUnit][weightPlates[weightUnit].length - 1];

    // Add micro plates if enabled
    if (isMicroPlates) {
        weightPlates[weightUnit] = weightPlates[weightUnit].concat(microPlatesOptions[weightUnit]).sort((a, b) => b - a);
        smallestIncrement = microPlatesOptions[weightUnit][microPlatesOptions[weightUnit].length - 1];
    }

    if (!totalWeight || totalWeight < barbellWeight + collarWeight) {
        return { error: "Weight must be at least the weight of the barbell plus collars." }
    }

    let weightRemaining = totalWeight - barbellWeight - collarWeight;

    let weightPerSide = weightRemaining / 2;
    if (weightPerSide % smallestIncrement !== 0) {
        return { error: "Exact weight cannot be matched. Do you have microplates?" };
    }

    const platesLoaded = {};
        for (let plate of weightPlates[weightUnit]) {
            platesLoaded[plate] = Math.floor(weightPerSide / plate); // Multiply by 2 for both sides
            weightPerSide %= plate;
        }

        if (weightPerSide > 0) {
            return { error: "Cannot exactly match weight with available plates." };
        }

        return platesLoaded;
    }


    // if (totalWeight && totalWeight >= barbellWeight) {
    //     let smallestIncrement = weightPlates[weightUnit][weightPlates[weightUnit].length - 1];
    //     let weightPerSide = (totalWeight - barbellWeight - collarWeight) / 2;
    //     if (weightPerSide % smallestIncrement !== 0) {
    //         return "Do you have microplates?";
    //     } 
    //     const platesLoaded = {}

    //     for (let plate of weightPlates[weightUnit]) {
    //         if (weightPerSide > 0) {
    //             platesLoaded[plate] = Math.floor(weightPerSide / plate);
    //             weightPerSide %= plate;
    //         }
    //     }
    //     return platesLoaded;

    // } else {
    //     return "Weight must be at least the weight of the barbell."
    // }

