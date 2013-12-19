// USE
// http://mrcoles.com/bookmarklet/

var header_text = document.title;
var header_var  = "?entry.656452092=";
var link_url_text = document.location.href;
var link_url_var  = "&entry.1366844449=";
var formUrl="https://docs.google.com/forms/d/1Ib9KdszfnAK5SuvxdYjGHT7OGrW5FHID7O7j9BJZTAw/viewform";

window.open(
            formUrl + 
            header_var + encodeURIComponent(header_text) + 
            link_url_var + encodeURIComponent(link_url_text)
           );


/*
FORM:

entry.656452092	!!HEADER!!
entry.1366844449	!!URL!!
entry.1639983212	!!DESC!!
entry.1504751130	Тема форума Automated-testing.info
entry.1504751130.other_option_response	
entry.835891800	Автоматизация тестирования
entry.835891800	Код
entry.835891800	Java
entry.835891800	C#
entry.835891800	Python
entry.835891800.other_option_response	
entry.1350939396	@dzhariy

*/
