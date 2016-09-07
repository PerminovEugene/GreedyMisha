var fs = require('fs');
var greedyMishaAlgorithm = require('./greedyMishaAlgorithm');


var NUMBER_OF_TESTS_STRING_INDEX = 0;
var STARTED_OF_TESTS_STRING_INDEX = 1;
var LINES_FOR_ONE_TEST_CASE = 2;
var RESULT_BASIC_STRING = "Case #";
var ENCODING = "utf8";
var DEFAULT_FILE_IN_PATH = "./in.txt";
var DEFAULT_FILE_OUT_PATH = "./out.txt";
var MAX_ITEMS_IN_INPUT_SET = 100;


function readFromFile(filePath, encoding) {
    return fs.readFileSync(filePath, encoding);
}
function writeToFile(string, filePath) {
    fs.writeFileSync(filePath, string);
}

function preparationOfInputData(array) {
    var preparedArray = [];
    for (var i=0; i< array.length; i++) {
        preparedArray.push(array[i].replace("\r", ""))
    }
    return preparedArray;
}

function prepareInputArrayForAlgorithm(length, array) {
    try {
        if (length > MAX_ITEMS_IN_INPUT_SET) {
            throw "Maximum elements in input set must be less or equal then " + MAX_ITEMS_IN_INPUT_SET;
        }
        var preparedArray;
        if (!array || !length) {
            throw("Exception for input data: length: " + length + " , array: " + array + ". length and elements must be integer numbers!");
        } else if (array.length < length) {
            throw("Exception for input data: length: " + length + " , array: " + array + ". Array must contain minimum " + length + " numbers.");
        } else {
            preparedArray = array.split(" ");
            preparedArray = preparedArray.slice(0, length)
            return preparedArray;
        }
    } catch (ex) {
        console.error("Exception in prepareInputArrayForAlgorithm function.");
        throw ex;
    }
}

function getResultStringPartForIteration(iteration, result) {
    var resultString = RESULT_BASIC_STRING;
    var resultedString = result;
    if (result === false) {
        resultedString = "NO";
    }
    resultString = resultString + iteration + ": " + resultedString + "\n";
    return resultString;
}

var myArgs = process.argv.slice(2);
// Add here functional for check arg, if 2 then it's 2 files. If more it's a new set for algorithm.
var inputFile;
var outputFile;
if (myArgs.length == 0) {
    inputFile = DEFAULT_FILE_IN_PATH;
    outputFile = DEFAULT_FILE_OUT_PATH;
} else {
    inputFile = myArgs[0];
    outputFile = myArgs[1];
}

var sourceFileString = readFromFile(DEFAULT_FILE_IN_PATH, ENCODING);
var inputStrings = sourceFileString.split("\n");
inputStrings = preparationOfInputData(inputStrings);
var algorithmIterationCount = parseInt(inputStrings[NUMBER_OF_TESTS_STRING_INDEX], 10);
if (isNaN(algorithmIterationCount)) {
    throw("First string in input file must be number!")
}
var linesWithTests = algorithmIterationCount * LINES_FOR_ONE_TEST_CASE;
var resultString = "";

/*
    Processing each set of data and write them into the output string
 */
var algorithm = new greedyMishaAlgorithm.GreedyMishaAlgorithm();
for (var j = STARTED_OF_TESTS_STRING_INDEX; j < linesWithTests; j++) {
    var getIterationNumber = function (number) {
        return (number + 1) / 2;
    };
    try {
        // console.log("предобработка массива номер " + ((j + 1) / 2) + ". А именно: " + inputStrings[j + 1]);
        if (j+1 > linesWithTests) {
            throw("After all strings with elements count, must follow string with elements.")
        } else {
            var algorithmInputArray = prepareInputArrayForAlgorithm(inputStrings[j], inputStrings[j + 1]);
            resultString += getResultStringPartForIteration(getIterationNumber(j), algorithm.start(algorithmInputArray));
        }
    } catch (ex) {
        // Можно заменить на throw, если будет встраиваться в другую систему.
        console.error("Error in test case with number: " + ((j + 1) / 2) + ". Exception: " + ex)
    }
    j++
}

writeToFile(resultString, DEFAULT_FILE_OUT_PATH);



