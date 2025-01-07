export default function calculate1RM(weight, weightUnit, reps, intensityUnit, intensity, isWeightedBodyweight, bodyweight, percentageOfBodyweight) {
    weight = parseFloat(weight);
    reps = parseFloat(reps);
    intensity = parseFloat(intensity);
    bodyweight = parseFloat(bodyweight);
    percentageOfBodyweight = parseFloat(percentageOfBodyweight);
    
    // convert RIR to RPE value
    if (intensityUnit === "RIR") {
        intensity = 10 - intensity;
    } 
    
    const percentagesChart = {
         1: { 10 : 1.00, 9.5 : .978, 9 : .955, 8.5 : .939, 8 : .922, 7.5 : .907, 7 : .892, 6.5 : .878, 6 : .863, 5.5 : .850, 5 : .837, 4.5 : .824, 4 : .811 }, 
         2: { 10 : .955, 9.5 : .939, 9 : .922, 8.5 : .907, 8 : .892, 7.5 : .878, 7 : .863, 6.5 : .850, 6 : .837, 5.5 : .824, 5 : .811, 4.5 : .799, 4 : .786 }, 
         3: { 10 : .922, 9.5 : .907, 9 : .892, 8.5 : .878, 8 : .863, 7.5 : .850, 7 : .837, 6.5 : .824, 6 : .811, 5.5 : .799, 5 : .786, 4.5 : .774, 4 : .762 }, 
         4: { 10 : .892, 9.5 : .878, 9 : .863, 8.5 : .850, 8 : .837, 7.5 : .824, 7 : .811, 6.5 : .799, 6 : .786, 5.5 : .774, 5 : .762, 4.5 : .751, 4 : .739 }, 
         5: { 10 : .863, 9.5 : .850, 9 : .837, 8.5 : .824, 8 : .811, 7.5 : .799, 7 : .786, 6.5 : .774, 6 : .762, 5.5 : .751, 5 : .739, 4.5 : .723, 4 : .707 }, 
         6: { 10 : .837, 9.5 : .824, 9 : .811, 8.5 : .799, 8 : .786, 7.5 : .774, 7 : .762, 6.5 : .751, 6 : .739, 5.5 : .723, 5 : .707, 4.5 : .694, 4 : .680 }, 
         7: { 10 : .811, 9.5 : .799, 9 : .786, 8.5 : .774, 8 : .762, 7.5 : .751, 7 : .739, 6.5 : .723, 6 : .707, 5.5 : .694, 5 : .680, 4.5 : .667, 4 : .653 }, 
         8: { 10 : .786, 9.5 : .774, 9 : .762, 8.5 : .751, 8 : .739, 7.5 : .723, 7 : .707, 6.5 : .694, 6 : .680, 5.5 : .667, 5 : .653, 4.5 : .640, 4 : .626 }, 
         9: { 10 : .762, 9.5 : .751, 9 : .739, 8.5 : .723, 8 : .707, 7.5 : .694, 7 : .680, 6.5 : .667, 6 : .653, 5.5 : .640, 5 : .626, 4.5 : .613, 4 : .599 }, 
        10: { 10 : .739, 9.5 : .723, 9 : .707, 8.5 : .694, 8 : .680, 7.5 : .667, 7 : .653, 6.5 : .640, 6 : .626, 5.5 : .613, 5 : .599, 4.5 : .586, 4 : .572 }, 
        11: { 10 : .707, 9.5 : .694, 9 : .680, 8.5 : .667, 8 : .653, 7.5 : .640, 7 : .626, 6.5 : .613, 6 : .599, 5.5 : .586, 5 : .572, 4.5 : .558, 4 : .544 }, 
        12: { 10 : .680, 9.5 : .667, 9 : .653, 8.5 : .640, 8 : .626, 7.5 : .613, 7 : .599, 6.5 : .586, 6 : .572, 5.5 : .558, 5 : .544, 4.5 : .530, 4 : .516 }
    };

    // Define oneRepMax outside of block scope
    let oneRepMax;

    // get percentage from mappings
    const percentage = percentagesChart[reps][intensity];

    // calculate 1RM 
    if (isWeightedBodyweight === false) {
        // calculate 1RM for non-BW exercises
        oneRepMax = weight / percentage;
    } else {
        // calculate 1RM for weighted pull up/dip
        const calculatedBodyweight = bodyweight * (percentageOfBodyweight / 100);
        oneRepMax = ((calculatedBodyweight + weight) / percentage) - calculatedBodyweight;
    }

    // return rounded oneRepMax based on LB or KG and isWeightedBodyweight
    if (isWeightedBodyweight && weightUnit === "LB") {
        return 2.5 * Math.round(oneRepMax / 2.5);
    } else if (isWeightedBodyweight && weightUnit === "KG") {
        return 1.25 * Math.round(oneRepMax / 1.25);
    } else if (!isWeightedBodyweight && weightUnit === "LB") {
        return 5 * Math.round(oneRepMax / 5);
    } else if (!isWeightedBodyweight && weightUnit === "KG") {
        return 2.5 * Math.round(oneRepMax / 2.5);
    } 
}
