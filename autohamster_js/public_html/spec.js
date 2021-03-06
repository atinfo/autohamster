
function convertTestDataToSingleLine(data) {
    
    var line = [data.date, 
                data.title, 
                data.url, 
                data.description, 
                data.category, 
                data.tags_line, 
                data.submitter]
                .join("\t") + "\r\n";
    return line;
}

var usualLine = 
{
    date:        '26.05.2014 14:15:39',
    title:       'Example header', 
    url:         'http://example.com', 
    description: 'Some description',
    category:    'Видео',
    tags_line:   'Автоматизация тестирования, Java, Ruby',
    submitter:   '@dzhariy'
};

var lineWithDoubleQuotesAtTheEndOfTitle = 
{
    date:        '26.05.2014 14:15:39',
    title:       'This line contains "double quotes at the end of title"', 
    url:         'http://example.com', 
    description: 'Some description',
    category:    'Видео',
    tags_line:   'Автоматизация тестирования, Java, Ruby',
    submitter:   '@dzhariy'
};

var lineWithDoubleQuotesAtTheBegginingOfTitle = 
{
    date:        '26.05.2014 14:15:39',
    title:       '" - is a double quotes character which starts this line', 
    url:         'http://example.com', 
    description: 'Some description',
    category:    'Видео',
    tags_line:   'Автоматизация тестирования, Java, Ruby',
    submitter:   '@dzhariy'
};

var lineStartsFromQuotedString = 
{
    date:        '26.05.2014 14:15:39',
    title:       '"double quotes" are placed at the first position of this line title', 
    url:         'http://example.com', 
    description: 'Some description',
    category:    'Видео',
    tags_line:   'Автоматизация тестирования, Java, Ruby',
    submitter:   '@dzhariy'
};

var lineWithMultilineComments = 
{
    date:        '26.05.2014 14:15:39',
    title:       '"double quotes" are placed at the first position of this line title', 
    url:         'http://example.com', 
    description: "\"When I am writting a text...\n\
- I always put the letters inside\n\
- I may make it multiline\"",
    
    category:    'Видео',
    tags_line:   'Автоматизация тестирования, Java, Ruby',
    submitter:   '@dzhariy'
};

var lineWithMultilineCommentsAndDoubleQuoteInsideAndApostrophes = 
{
    date:        '26.05.2014 14:15:39',
    title:       '"double quotes" are placed at the first position of this line title', 
    url:         'http://example.com', 
    description: '"When I\'d write a text...\n\
- I\'d always put the letters inside\n\
- I\'d may make it multiline\n\
- When I want to quote someone, ""I just do it"""',
    
    category:    'Видео',
    tags_line:   'Автоматизация тестирования, Java, Ruby',
    submitter:   '@dzhariy'
};


var lineWithOneDoubleQuoteInTitleAndDescription = 
{
    date:        '26.05.2014 14:15:39',
    title:       'This line contains double quotes', 
    url:         'http://example.com', 
    description: 'This is a line with double quotes. < " >',
    category:    'Видео',
    tags_line:   'Автоматизация тестирования, Java, Ruby',
    submitter:   '@dzhariy'
};

var lineWithDoubleQuotesAtStartAndTheEndOfTitle = 
{
    date:        '26.05.2014 14:15:39',
    title:       '\"This line contains double quotes\"', 
    url:         'http://example.com', 
    description: 'This is a line with double quotes. < " >',
    category:    'Видео',
    tags_line:   'Автоматизация тестирования, Java, Ruby',
    submitter:   '@dzhariy'
};


function verifyData(actualData, expectedData) {
    expect(actualData.title).      toBe(expectedData.title);       
    expect(actualData.url).        toBe(expectedData.url);         
    expect(actualData.description).toBe(expectedData.description);
    expect(actualData.category).   toBe(expectedData.category);    
    expect(actualData.tags_line).  toBe(expectedData.tags_line);   
    expect(actualData.date).       toBe(expectedData.date);        
    expect(actualData.submitter).  toBe(expectedData.submitter);              
}

var DESCRIPTION_FIELD_INDEX = 3;
var TITLE_FIELD_INDEX = 1;
var NUMBER_OF_FIELDS = 7;

describe('FoodEater', function() {

    it("NormalizeDataLines should remove first and last quote when the column is has multiline", function() {
        
        var sourceLine = convertTestDataToSingleLine(lineWithMultilineComments);
        var foodEater = new FoodEater();
        
        var actualLines = foodEater.NormalizeDataLines(sourceLine, NUMBER_OF_FIELDS);
        
        expect(actualLines.length).toBe(1);
        
               var expected = 'When I am writting a text...\n\
- I always put the letters inside\n\
- I may make it multiline'; 
        
        var actualData = actualLines[0].split("\t");
        expect(actualData[DESCRIPTION_FIELD_INDEX]).toBe(expected);
    });    
    
    it("NormalizeDataLines should handle the apostrophes in the multiline comments ", function() {
        var sourceLine = convertTestDataToSingleLine(lineWithMultilineCommentsAndDoubleQuoteInsideAndApostrophes);
        var foodEater = new FoodEater();
        
        var actualLines = foodEater.NormalizeDataLines(sourceLine, NUMBER_OF_FIELDS);
        
        expect(actualLines.length).toBe(1);
        
        var expectedTitle = lineWithMultilineCommentsAndDoubleQuoteInsideAndApostrophes.title;
        var expectedDescription = 'When I\'d write a text...\n\
- I\'d always put the letters inside\n\
- I\'d may make it multiline\n\
- When I want to quote someone, ""I just do it""';
                
        var actualData = actualLines[0].split("\t");
        
        expect(actualData[TITLE_FIELD_INDEX]).toBe(expectedTitle);
        expect(actualData[DESCRIPTION_FIELD_INDEX]).toBe(expectedDescription);
    });
    
     it("NormalizeDataLines should multilines and quotes in text which has multiple items", function() {
        var sourceLine1 = convertTestDataToSingleLine(lineWithMultilineCommentsAndDoubleQuoteInsideAndApostrophes);
        var sourceLine2 = convertTestDataToSingleLine(lineWithMultilineComments);
        var foodEater = new FoodEater();

        var sourceLine = [sourceLine1, sourceLine2].join(''); 
        
        var actualLines = foodEater.NormalizeDataLines(sourceLine, NUMBER_OF_FIELDS);
        
        expect(actualLines.length).toBe(2);
                
        var expectedTitle1 = lineWithMultilineCommentsAndDoubleQuoteInsideAndApostrophes.title;
        var expectedDescription1 = 'When I\'d write a text...\n\
- I\'d always put the letters inside\n\
- I\'d may make it multiline\n\
- When I want to quote someone, ""I just do it""';
                         
        var actualData1 = actualLines[0].split("\t");
        
        expect(actualData1[TITLE_FIELD_INDEX]).toBe(expectedTitle1);
        expect(actualData1[DESCRIPTION_FIELD_INDEX]).toBe(expectedDescription1);
    });   
    
    it("NormalizeDataLines should not remove first and last quote from a single line", function() {
        var sourceLine = convertTestDataToSingleLine(lineWithDoubleQuotesAtStartAndTheEndOfTitle);
        var foodEater = new FoodEater();
        
        var actualLines = foodEater.NormalizeDataLines(sourceLine, NUMBER_OF_FIELDS);
        
        expect(actualLines.length).toBe(1);
        
        var expected = lineWithDoubleQuotesAtStartAndTheEndOfTitle.title;
        
        var actualData = actualLines[0].split("\t");
        expect(actualData[TITLE_FIELD_INDEX]).toBe(expected);
        
    });   
    
    it("eatData should correctly parse and fill the DataLine from raw string", function() {
       var line = convertTestDataToSingleLine(usualLine);
       var foodEater = new FoodEater();
       var data = [ line ];
       var result = foodEater.eatData(data);

       expect(result).not.toBe([]);
       var actual = result[0];
       verifyData(actual, usualLine);

   });
   
    it("eatData should set the empty string value when the submitter value is skipped(empty) in the input data", function() {
       var modifiedUsusalLine = JSON.parse(JSON.stringify(usualLine));
       modifiedUsusalLine.submitter = void 0;
        
       var line = convertTestDataToSingleLine(modifiedUsusalLine);
       var foodEater = new FoodEater();
       var data = [ line ];
       var result = foodEater.eatData(data);

       expect(result).not.toBe([]);
       var actual = result[0];
       expect(actual.submitter).toBe("");

   });   
});



