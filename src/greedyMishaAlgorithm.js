var GreedyMishaAlgorithm = function () {
    };
GreedyMishaAlgorithm.prototype.start = function(inputArray) {
    console.log(inputArray)
    var arrayWithSortedElements = createArrayWithSortedElements(inputArray);
    var arrayWithCountElementsOrders = createArrayWithElementsOrdersCount(arrayWithSortedElements);
    if (!allOrdersEven(arrayWithCountElementsOrders)) {
        return false;
    }
};

var createArrayWithSortedElements = function (array) {
    var sortedArray = [];
    //TODO optimize here
    function compareNumbers(s1, s2)
    {
        var n1 = parseInt(s1, 10);
        var n2 = parseInt(s2, 10);
        if (n1==n2) return 0;
        if (n1>n2)
            return 1;
        else
            return -1;
    }
    sortedArray = array.sort(compareNumbers);
    for (var i=0; i<sortedArray.length; i++) {
        var decimal = parseInt(sortedArray[i], 10);
        sortedArray[i] = {
            "decimal": decimal,
            "binary": decimal.toString(2),
            "sortedInfo": null // TODO use or remove it.
        }
    }
    return sortedArray
};

// here fix
var createArrayWithElementsOrdersCount = function  (array) {
    var ordersObj = {};
    for (var i=0; i<array.length; i++) {
        var order = array[i]["binary"].length;
        if (!ordersObj[order]) {
            ordersObj[order] = 0;
        }
        ordersObj[order] += 1;
    }
    return ordersObj
};



module.exports.GreedyMishaAlgorithm = GreedyMishaAlgorithm;