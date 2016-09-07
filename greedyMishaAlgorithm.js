var GreedyMishaAlgorithm = function () {};
GreedyMishaAlgorithm.prototype.start = function(inputArray) {
    try {
        var minimalNumber = stringToDecimal(inputArray[0]);
        var binarySum = decimalToBinary(minimalNumber);
        var summWithoutMinimal = 0;
        var item = 0;
        for (var i = 1; i < inputArray.length; i++) {
            item = stringToDecimal(inputArray[i]);
            binarySum = binarySum ^ decimalToBinary(item);
            minimalNumber = getMinimalNumber(minimalNumber, inputArray[i]);
            if (minimalNumber > item) {
                summWithoutMinimal += minimalNumber;
                minimalNumber = item;
            } else {
                summWithoutMinimal += item
            }
        }
        if (binarySum === 0) {
            return summWithoutMinimal;
        } else {
            return false;
        }
    } catch (ex) {
        throw ex;
    }
};
var stringToDecimal = function(string) {
    try {
        var number = parseInt(string, 10)
        if (isNaN(number)) {
            throw "All elements must be numbers!"
        }
        return number;
    } catch (ex) {
        throw ex;
    }
};
var decimalToBinary = function (number) {
    return number.toString(2)
};
var getMinimalNumber = function(a, b) {
    try {
        var newA = parseInt(a, 10);
        var newB = parseInt(b, 10);
        if (isNaN(newA) || isNaN(newB)) {
            throw "All elements must be numbers!"
        }
        return newA < newB ? newA : newB;;
    } catch (ex) {
        throw ex;
    }
};

module.exports.GreedyMishaAlgorithm = GreedyMishaAlgorithm;