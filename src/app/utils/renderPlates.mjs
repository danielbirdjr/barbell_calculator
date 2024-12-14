export default function renderPlates(result, weightUnit) {
    if (!result) return null;

    return Object.entries(result) // Convert result object to array of [plate, count]
        .filter(([_, count]) => count > 0) // only show plates that have count > 0
        .sort(([plate1], [plate2]) => parseFloat(plate2) - parseFloat(plate1))
        .flatMap(([plate, count]) => (Array(count).fill(null).map((_, index) => (
        <div key={`${plate}-${index}`} className={`plate ${weightUnit.toLowerCase()}${plate.replace('.', '-')}`}>
            {plate}
        </div>
        ))
    ));
}