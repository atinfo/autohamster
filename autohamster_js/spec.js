var FoodEater = require("./FoodEater.js");
var DataLine = require("./DataLine.js");


var testData = 
{
    date:        '26.05.2014 14:15:39',
    title:       'Example header', 
    url:         'http://example.com', 
    description: 'Some description',
    category:    'Видео',
    tags_line:   'Автоматизация тестирования, Java, Ruby',
    submitter:   '@dzhariy',
};

var line = [testData.date, 
            testData.title, 
            testData.url, 
            testData.description, 
            testData.category, 
            testData.tags_line, 
            testData.submitter]
            .join("\t") 
            + "\r\n";

describe('FoodEater', function(){

   it("FoodEater.eatData should correctly parse and fill the DataLine from raw string", function() {
              
       var foodEater = new FoodEater();

       var data = [line];
       
       var result = foodEater.eatData(data);

       expect(result).not.toBe([]);

       var actual = result[0];

       expect(actual.date).       toBe(testData.date);        
       expect(actual.title).      toBe(testData.title);       
       expect(actual.url).        toBe(testData.url);         
       expect(actual.description).toBe(testData.description);
       expect(actual.category).   toBe(testData.category);    
       expect(actual.tags_line).  toBe(testData.tags_line);   
       expect(actual.submitter).  toBe(testData.submitter);          


   });
});



