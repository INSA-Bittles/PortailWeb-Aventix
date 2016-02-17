// document.querySelector('#file').addEventListener('change', function() {

//     alert(this.files[0].name);



// convertToJson();
 
//      // $('#testXSL').html(JSON.stringify(convertToJSON(this.files[0])));
//      $('#testXSL').html("tesceceqr");

// }, false);

// function testJson(){

// // var greetings = require("./.");
// // greetings.sayHelloInSpanish();
//  $('#testXSL').html("tesceceqr");

// };


module.exports.sayHelloInSpanish =function TestConversion(text){

//   document.querySelector('#file').addEventListener('change', function() {

//     alert(this.files[0].name);

//      // $('#testXSL').html(JSON.stringify(convertToJSON(this.files[0])));
//      $('#testXSL').html("tesceceqr");

// }, false);
// $('#testXSL').html("tesceceqr");


if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile(text);
//'beneficiaire.xlsx'

var sheet_name_list = workbook.SheetNames;
sheet_name_list.forEach(function(y) {
    var worksheet = workbook.Sheets[y];
    var headers = {};
    var data = [];
    for(z in worksheet) {
        if(z[0] === '!') continue;
        //parse out the column, row, and value
        var col = z.substring(0,1);
        var row = parseInt(z.substring(1));
        var value = worksheet[z].v;

        //store header names
        if(row == 1) {
            headers[col] = value;
            continue;
        }

        if(!data[row]) data[row]={};
        data[row][headers[col]] = value;
    }
    //drop those first two rows which are empty
    data.shift();
    data.shift();
    console.log(data);
    console.log(data[0].Currency);

    var data2 = {"beneficiaire":""};
    data2["beneficiaire"]=data;
    console.log(data2);
    console.log(data2.beneficiaire[0].idbenef);
    console.log(data2.beneficiaire[0].idnom);

});

}




// function convertToJson(){

// var greetings = require("../app.js");
// greetings.sayHelloInSpanish();


// }
// function convertToJson(){

//   if(typeof require !== 'undefined') XLSX = require('xlsx');
// var workbook = XLSX.readFile('beneficiaire.xlsx');

// var sheet_name_list = workbook.SheetNames;
// sheet_name_list.forEach(function(y) {
//     var worksheet = workbook.Sheets[y];
//     var headers = {};
//     var data = [];
//     for(z in worksheet) {
//         if(z[0] === '!') continue;
//         //parse out the column, row, and value
//         var col = z.substring(0,1);
//         var row = parseInt(z.substring(1));
//         var value = worksheet[z].v;

//         //store header names
//         if(row == 1) {
//             headers[col] = value;
//             continue;
//         }

//         if(!data[row]) data[row]={};
//         data[row][headers[col]] = value;
//     }
//     //drop those first two rows which are empty
//     data.shift();
//     data.shift();
//     console.log(data);
//     console.log(data[0].Currency);
// $('#testXSL').html(data[0].Currency);
//     var data2 = {"beneficiaire":""};
//     data2["beneficiaire"]=data;
//     console.log(data2);
//     console.log(data2.beneficiaire[0].idbenef);
//     console.log(data2.beneficiaire[0].idnom);

// });
// }


// function convertToJSON(array) {
//   var first = array[0].join()
//   var headers = first.split(',');

//   var jsonData = [];
//   for ( var i = 1, length = array.length; i < length; i++ )
//   {

//     var myRow = array[i].join();
//     var row = myRow.split(',');

//     var data = {};
//     for ( var x = 0; x < row.length; x++ )
//     {
//       data[headers[x]] = row[x];
//     }
//     jsonData.push(data);

//   }
//   return jsonData;
// };
