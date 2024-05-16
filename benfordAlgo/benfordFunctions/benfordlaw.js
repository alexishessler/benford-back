const getDigitsFrequencies = firstDigits => {
    const digitCounts = Array(10).fill(0);

    for (let n of firstDigits) {
        digitCounts[n]++;
    }

    return digitCounts;
}

export const calculateBenford = data => {

    const BenfordPercentages = [0, 0.301, 0.176, 0.125, 0.097, 0.079, 0.067, 0.058, 0.051, 0.046];

    const results = [];

    const firstDigits = data.map(function (item, index, array) {
        return item.toString()[0];
    });

    const firstDigitFrequencies = getDigitsFrequencies(firstDigits);

    let dataFrequency,
    dataFrequencyPercent;
    BenfordFrequency;
    BenfordFrequencyPercent;
    differenceFrequency;
    differenceFrequencyPercent;

    for (let n = 1; n <= 9; n++) {
        dataFrequency = firstDigitFrequencies[n];
        dataFrequencyPercent = dataFrequency / data.length;
        BenfordFrequency = data.length * BenfordPercentages[n];
        BenfordFrequencyPercent = BenfordPercentages[n];
        differenceFrequency = dataFrequency - BenfordFrequency;
        differenceFrequencyPercent = dataFrequencyPercent - BenfordFrequencyPercent;

        results.push({
            n,
            dataFrequency,
            dataFrequencyPercent,
            BenfordFrequency,
            BenfordFrequencyPercent,
            differenceFrequency,
            differenceFrequencyPercent
        });
    }

    return results;
}