var fs = require('fs');
var greedyMishaAlgorithm = require('./greedyMishaAlgorithm');

var NUMBER_OF_TESTS_STRING_INDEX = 0;
var STARTED_OF_TESTS_STRING_INDEX = 1;
var LINES_FOR_ONE_TEST_CASE = 2;



var sourceFileString = fs.readFileSync('./in.txt', 'utf8');
var inputStrings = sourceFileString.split("\n");

function preparationOfInputData(array) {
    var preparedArray = [];
    for (var i=0; i< array.length; i++) {
        preparedArray.push(array[i].replace("\r", ""))
    }
    return preparedArray;
}

inputStrings = preparationOfInputData(inputStrings);
// console.log(inputStrings, " input strings.");

var algorithmTestsCount = inputStrings[NUMBER_OF_TESTS_STRING_INDEX];

function prepareInputArrayForAlgorithm(length, array) {
    try {
        var preparedArray = [];
        if (!array || array.length < length) {
            throw("Exception for input data: length: " + length + " , array: " + array + ". Array must contain minimum " + length + " numbers.");
        } else {
            for (var i = 0; i < array.length; i++) {
                preparedArray.push(array[i])
            }
            return preparedArray;
        }
    } catch (ex) {
        console.error("Exception in prepareInputArrayForAlgorithm function");
        throw ex;
    }
};

var linesWithTests = algorithmTestsCount * LINES_FOR_ONE_TEST_CASE;
for (var j = STARTED_OF_TESTS_STRING_INDEX; j < linesWithTests; j++) {
    try {
        // console.log("предобработка массива номер " + ((j + 1) / 2) + ". А именно: " + inputStrings[j + 1]);
        if (j+1 > linesWithTests) {
            throw("Для каждой строки с длинной массива входных данных должна быть строка с овходными данными.")
        } else {
            var algorithmInputArray = prepareInputArrayForAlgorithm(inputStrings[j], inputStrings[j + 1]);
            var algorithm = new greedyMishaAlgorithm.GreedyMishaAlgorithm();
            console.log(algorithm.start(algorithmInputArray));
        }
    } catch (ex) {
        console.log("Error in test case with number: " + ((j + 1) / 2) + ". Exception: " + ex)
    }
    j++
}

