(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = DataLine;

function DataLine(json) { 
    this.date        = void 0;
    this.title       = void 0;
    this.url         = void 0;
    this.description = void 0;
    this.category    = void 0;
    this.tags_line   = void 0;
    this.submitter   = void 0;

    for(var key in json) {
        if (!this.hasOwnProperty(key)) {
            throw "Property " + key + "is not defined at class DataLine";
        }

        this[key] = json[key];
    }

} 


DataLine.prototype.getDate        = function() { return this.date        }
DataLine.prototype.getTitle       = function() { return this.title       }
DataLine.prototype.getUrl         = function() { return this.url         }
DataLine.prototype.getDescription = function() { return this.description }
DataLine.prototype.getCategory    = function() { return this.category    }
DataLine.prototype.getTagsLine    = function() { return this.tags_line   }
DataLine.prototype.getSubmitter   = function() { return this.submitter   }
},{}],2:[function(require,module,exports){
DataLine = require("./DataLine.js");

module.exports = FoodEater;

function FoodEater() 
{

}

// TODO: REMOVE
function countChars(sourceString, character) {
    var result = 0;
    for(var i = 0; i < sourceString.length; i++)
    {
        if (sourceString.charAt(i) === character)
        {
            result++;
        }
    }
    
    return result;
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
        
        var isTheLastColumnInTheList = (lines.length % numberOfFields) === 0;
        
        
        /*if (isTheLastColumnInTheList)
        {
            twoFieldsRegExp =  /^\w+(\r*\n)\w+/g;
            if (twoFieldsRegExp.test(field))
            {
                var fields = field.split('\n');
                
                var field = fields[0];
                var nextField = fields[1];
                
                console.log(field);
                
                allFields.splice(i + 1, 0, nextField);
            }
        }*/

        lines.push(field);
        
        
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
},{"./DataLine.js":1}]},{},[2,1])