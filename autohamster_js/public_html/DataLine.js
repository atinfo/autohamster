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