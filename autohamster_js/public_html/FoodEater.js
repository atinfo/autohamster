//DataLine = require("./DataLine.js");

//module.exports = FoodEater;

function FoodEater() 
{

}


FoodEater.prototype.NormalizeDataLines = function(strRawData, numberOfFields)
{
    if (typeof numberOfFields === 'undefined' ||  numberOfFields === null)
    {
        throw "FoodEater.prototype.NormalizeDataLines: argument numberOfFields is not defined"
    }
    var result = [];
    
    var SEPARATOR = "\t";
    
    var allFields = strRawData.split(SEPARATOR);
    
    var lines = [];
    
    for (var i = 0; i < allFields.length; i++)
    {
        var field = allFields[i];
        
        var shouldRemoveFirstAndLastQuote = field.indexOf("\n") > -1;
        if (shouldRemoveFirstAndLastQuote) {
            field = field.replace(/^\s*"|"\s*$/g,'');  
        }
        
        var isTheLastColumnInTheList = ((i + 1) % numberOfFields) === 0;
        
        
        if (isTheLastColumnInTheList)
        {
            var twoFieldsRegExp =  /^[^\r\n]*(\r*\n)[^\r\n]+/g;
            if (twoFieldsRegExp.test(field))
            {
                var fields = field.split('\n');
                
                var field = fields[0];
                var nextField = fields[1];
                
                console.log(field);
                
                allFields.splice(i + 1, 0, nextField);
            }
        }

        lines.push(field);
        
        
        if (isTheLastColumnInTheList) {
            var normalizedLine = lines.join(SEPARATOR);
            lines = [];
            result.push(normalizedLine);
        }
    }
    
    return result;
};


FoodEater.prototype.eatData = function (rawDataLines) {
    
    if (typeof rawDataLines === "undefined" || rawDataLines === null) {
        throw "Argument dataLines is null or undefined: dataLines == " + rawDataLines.toString();         
    }
    if (rawDataLines.length === 0) {
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
            date:        columns[0] ? columns[0] : "",
            title:       columns[1] ? columns[1] : "", 
            url:         columns[2] ? columns[2] : "", 
            description: columns[3] ? columns[3] : "",
            category:    columns[4] ? columns[4] : "",
            tags_line:   columns[5] ? columns[5] : "",
            submitter:   columns[6] ? columns[6] : ""
        };

        var resultItem = new DataLine(rawDataLine);
        result.push(resultItem);

    }

    return result;

};