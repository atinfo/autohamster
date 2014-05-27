require("./DataLine.js");

module.exports = FoodEater;

function FoodEater() 
{

}

FoodEater.prototype.eatData = function (dataLines) {
    
    if (typeof dataLines === "undefined" || dataLines === null) {
        throw "Argument dataLines is null or undefined: dataLines == " + dataLines.toString();         
    }
    if (dataLines.length == 0) {
        return [];
    }

    var result = [];

    for (var i = 0; i < dataLines.length; i++) {
        var line = dataLines[i];

        // Trim line
        line = line.replace(/^\s+|\s+$/g,'');  
        
        var columns = line.split('\t');

        var rawDataLine = 
        {
            date:        columns[0],
            title:       columns[1], 
            url:         columns[2], 
            description: columns[3],
            category:    columns[4],
            tags_line:   columns[5],
            submitter:   columns[6],
        }

        var resultItem = new DataLine(rawDataLine);
        result.push(resultItem);

    }

    return result;

}