export default function calculatePlates(totalWeight, barbellWeight, weightUnit, weightPlates) {
    if (totalWeight && totalWeight >= barbellWeight) {
        let smallestIncrement = weightPlates[weightUnit][weightPlates[weightUnit].length - 1];
        let weightPerSide = (totalWeight - barbellWeight) / 2;
        if (weightPerSide % smallestIncrement !== 0) {
            return "Do you have microplates?";
        } 
        const platesLoaded = {}

        for (let plate of weightPlates[weightUnit]) {
            if (weightPerSide > 0) {
                platesLoaded[plate] = Math.floor(weightPerSide / plate);
                weightPerSide %= plate;
            }
        }
        return platesLoaded;

    } else {
        return "Weight must be at least the weight of the barbell."
    }
}