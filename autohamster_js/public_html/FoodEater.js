DataLine = require("./DataLine.js");

module.exports = FoodEater;

function FoodEater() 
{

}

FoodEater.prototype.NormalizeDataLines = function(rawData, numberOfFields)
{
    var result = [];
    
    var SEPARATOR = "\t";
    
    var allFields = rawData.split(SEPARATOR);
    
    var lines = [];
    
    for (var i = 0; i < allFields.length; i++)
    {
        var field = allFields[i];
        
        var shouldRemoveFirstAndLastQuote = field.indexOf("\n") > -1;
        if (shouldRemoveFirstAndLastQuote) {
            field = field.replace(/^\s*"|"\s*$/g,'');  
        }
        
        
        lines.push(field);
        
        var isTheLastColumnInTheList = (lines.length % numberOfFields) == 0;
        
        if (isTheLastColumnInTheList) {
            var normalizedLine = lines.join(SEPARATOR);
            lines = [];
            result.push(normalizedLine)
        }
    }
    
    return result;
}


FoodEater.prototype.eatData = function (rawDataLines) {
    
    if (typeof rawDataLines === "undefined" || rawDataLines === null) {
        throw "Argument dataLines is null or undefined: dataLines == " + rawDataLines.toString();         
    }
    if (rawDataLines.length == 0) {
        return [];
    }

    var result = [];

    for (var i = 0; i < rawDataLines.length; i++) {
        var line = rawDataLines[i];

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