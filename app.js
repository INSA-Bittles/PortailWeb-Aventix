// /*// Load the http module to create an http server.
// var express = require('express');
// var fs = require('fs');
// var path = require('path');
// var bodyParser = require('body-parser')
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');

// var https = require('https');
// var app = require('express')();
// var options = {
//    key  : fs.readFileSync('certificat/server.key'),
//    cert : fs.readFileSync('certificat/server.crt')
// };

// //configure app 
// app.use(bodyParser());
// app.use(express.static(__dirname + '/views'));

// app.get('/', function (req, res) {
//    res.render('index');
// });

// // use middleware
// app.use(express.static(path.join(__dirname,'components')));



// https.createServer(options, app).listen(3000, function () {
//    console.log('Started!');
// });

// // Put a friendly message on the terminal
// console.log("Server running at https://127.0.0.1:3000/");

// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : '127.0.0.1',
//   user     : 'Aventix',
//   password : 'MSIF20152016',
//   port : 3306
// });
 
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
 
//   console.log('connected as id ' + connection.threadId);
// }); */

// // server.js

// // set up ======================================================================
// // get all the tools we need
// //var express  = require('express');
// //var app      = express();
// var express = require('express'),
//     http = require('http'),
//     https = require('https');
// var app_http = express(); // this one to handle http request
// var app = express();
// var app_https = express(); // this to handle httpS requests.
// var port     = process.env.PORT || 3000;
// var path = require('path');
// var mongoose = require('mongoose');
// var passport = require('passport');
// var flash    = require('connect-flash');
// var morgan      = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser   = require('body-parser');
// var session      = require('express-session');

// var configDB = require('./config/database.js');

// //var https = require('https');
// var fs = require('fs');
// var options = {
//    key  : fs.readFileSync('certificat/server.key'),
//    cert : fs.readFileSync('certificat/server.crt')
// };
// https.createServer(options, app_https).listen(8080, function () {
//    console.log('Started!');
// });

// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : '127.0.0.1',
//   user     : 'Aventix',
//   password : 'MSIF20152016',
//   port : 3306
// });

// // configuration ===============================================================
// mongoose.connect(configDB.url); // connect to our database

// require('./config/passport')(passport); // pass passport for configuration

// // set up our express application
// app.use(morgan('dev')); // log every request to the console
// app.use(cookieParser()); // read cookies (needed for auth)
// app.use(bodyParser.json()); // get information from html forms
// app.use(bodyParser.urlencoded({ extended: true }));

// app.set('view engine', 'ejs'); // set up ejs for templating
// // use middleware
// app.use(express.static(path.join(__dirname,'components')));



// // required for passport
// app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

// // routes ======================================================================
// require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// // launch ======================================================================
// app.listen(port);
// console.log('The magic happens on port ' + port);




var express = require('express')
    http = require('http'),
    https = require('https');
var io = require('socket.io')
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var morgan      = require('morgan');
var flash    = require('connect-flash');
// var app_https = express();
// var express = require('express');
require('./config/passport')(passport) // pass passport for configuration
var fs = require('fs');
var net = require('net');
var tls = require('tls');
var options = {
   key  : fs.readFileSync('certificat/server.key'),
   cert : fs.readFileSync('certificat/server.crt'),
   RequestCert: true
};

var app_https = express();



tls.createServer(options, app_https, function (cleartextStream) {
    var cleartextRequest = net.connect({
        port: 80,
        host: '127.0.0.1'
    }, function () {
        cleartextStream.pipe(cleartextRequest);
        cleartextRequest.pipe(cleartextStream);
    });
}).listen(443);

// http.createServer(app_https).listen(3000, function (res,req) {
//    console.log('Started on port 3000!');

https.createServer(options, app_https).listen(3000, function (res,req) {
   console.log('Started on port 3000!'); 
});

app_https.use(morgan('dev')); // log every request to the console
app_https.use(bodyParser.json());
app_https.use(bodyParser.urlencoded({ extended: true }));
app_https.use(cookieParser());
app_https.use(session({secret: 'secret strategic xxzzz code'}));
app_https.use(passport.initialize());
app_https.use(passport.session());



app_https.set('view engine', 'ejs'); // set up ejs for templating
app_https.use(express.static(__dirname + '/views'));
app_https.use(express.static(path.join(__dirname,'components')));

// required for passport
app_https.use(session({
  secret: 'Bittlesarethebest',
  resave: true,
  saveUninitialized: true
 } )); // session secret
app_https.use(passport.initialize());
app_https.use(passport.session()); // persistent login sessions
app_https.use(flash()); // use connect-flash for flash messages stored in session
app_https.use(express.static(path.join(__dirname,'config/passport.js'))); // pass passport for configuration

// app_https.get('/', function (req, res) {
//   res.render('index', {pageTitle: 'Bienvenue sur Aventix'});
// });
 require('./routes.js')(app_https, passport); 

var mysql      = require('mysql');
var mysqldb = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1107',
  database : 'aventix',
  port : 3306
});


var db = require('./db.js');

app_https.post('/post_donnees_excel', function(req, res) {

  // voir DragAndDrop.js l 133 pour l'appel ajax
  var test = {"beneficiaire":""};
 test["beneficiaire"] = req.body;
      JsonDecideur=test;
      console.log(req.body);
      
      console.log(JsonDecideur.beneficiaire.PrenomBeneficiaire);

      // console.log(JsonDecideur.beneficiaire.NomBeneficiaire);
      
db.getConnection(function(err, mysqlconnected){

      // insertion dans la table carteAPuce avant d'entrer dans la table beneficiaire car clé étrangere 

        if(!err){
        
         
              mysqlconnected.query('SELECT MAX(NumeroCarte) from CarteAPuce ' , function(err, results) {
                      if (!err)
                      {


                              var data = {"count":""};
                              data["count"] = results;
                              var MaxNumCarte=parseInt(JSON.stringify(data.count[0]["MAX(NumeroCarte)"]));
                              MaxNumCarte=MaxNumCarte+1;
                              console.log(MaxNumCarte);

                    // ne semble pas reexecuter la requete SQL si on ne lui dit pas que le req.body a subit des modifs
                     var test = {"beneficiaire":""};
                     test["beneficiaire"] = req.body;
                      JsonDecideur=test;
                         

              mysqlconnected.query('INSERT INTO CarteAPuce (NumeroCarte, Solde, EtatCarte,CodeCarte) VALUES  ('+MaxNumCarte+','+0+',\'Valide\','+Math.round(Math.random()*10000)+')' , function(err, results) {
                      if (!err)
                              console.log('no error while performing query insert into carte a puce');
                      else
                        console.log('Error while performing Query insert into carte a puce.');
                      });
            


                    }
                      else
                      {
                        console.log('Error while performing Query max cartea puce.');

                      }
              
               
                                    // insertion dans la table beneficiaire 
                                    
                                        mysqlconnected.query('SELECT MAX(IdAvtxBeneficiaire) from beneficiaire' , function(err, results) {
                                              if (!err)
                                              {
                                                      var data2 = {"count2":""};
                                                      data2["count2"] = results;
                                                      var MaxId=parseInt(JSON.stringify(data2.count2[0]["MAX(IdAvtxBeneficiaire)"]));
                                                      MaxId=MaxId+1;
                                                      console.log('no error while performing query max id benef');

                                              }
                                              else
                                              {
                                                console.log('Error while performing Query max Id Benef.');
                                              }

                                              // Garde les infos de l'itération precedente si on ne redeclare pas les req.body?
                                              // pas trouvé d'explication
                                              var test = {"beneficiaire":""};
                                              test["beneficiaire"] = req.body;
                                              JsonDecideur=test;
                                              console.log(MaxId+','+'\''+JsonDecideur.beneficiaire.NomBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.PrenomBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.AdresseBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.CodePostalBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.VilleBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.AdresseMailBeneficiaire+'\''+','+parseInt(JsonDecideur.beneficiaire.IdAvtxDecideur)+','+MaxNumCarte+','+'\''+JsonDecideur.beneficiaire.StatutBeneficiaire+'\'');
                                                mysqlconnected.query('INSERT INTO Beneficiaire (IdAvtxBeneficiaire, NomBeneficiaire, PrenomBeneficiaire, AdresseBeneficiaire, CodePostalBeneficiaire, VilleBeneficiaire, AdresseMailBeneficiaire, IdAvtxDecideur, NumeroCarte, StatutBeneficiaire )VALUES  ('+MaxId+','+'\''+JsonDecideur.beneficiaire.NomBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.PrenomBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.AdresseBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.CodePostalBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.VilleBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.AdresseMailBeneficiaire+'\''+','+parseInt(JsonDecideur.beneficiaire.IdAvtxDecideur)+','+MaxNumCarte+','+'\''+JsonDecideur.beneficiaire.StatutBeneficiaire+'\''+')' , function(err, results) {
                                                  if (!err)
                                                          console.log('no error while performing query insert into benef');
                                                  else
                                                    console.log('Error while performing Query insert into benef .');
                                                  });
 
                                        });
                                              
                });
              
           }

        


        else{

          console.log("erreur");
        }



      });

});

app_https.get('/getadresse', function(req, res) {
  var data = {"Utilisateurs":""};
 
  db.getConnection(function(err, mysqlconnected){


        if(!err){
          mysqlconnected.query('SELECT NomResponsable, AdresseResponsable from Affilie' , function(err, results) {
                    if(results.length != 0){
                      data["Utilisateurs"] = results;
                     res.json(data);
                     console.log((data.Utilisateurs[0].AdresseResponsable));

                      
                    }else{
                      data["Utilisateurs"] = 'No data Found..';
                      res.json(data);
                      
                        
          }})}



 })});


app_https.get('/getnombreligne', function(req, res) {
  var data = {"count":""};
  
  db.getConnection(function(err, mysqlconnected){


        if(!err){
          mysqlconnected.query('SELECT COUNT(*) FROM Affilie' , function(err, results) {
                    if(results.length != 0){
                      data["count"] = results;
                     res.json(data);
                     console.log(parseInt(JSON.stringify(data.count[0]["COUNT(*)"])));

                      
                    }else{
                      data["Utilisateurs"] = 'No data Found..';
                      res.json(data);
                      
                         }

                       })}

  
        })});


mysqldb.end();

// TestConversion();

//console.log(JSON.stringify(rows));
                    // toto = JSON.stringify(rows);
                    //console.log(toto);
                    //var toto = res.json({utilisateurs : rows});
                    //res.status(200).send('/users', {toto})
                    //res.render('/users', {utilisateurs : rows})  

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

// var xlsx = require('excel');

// xls('currencies.xlsx', function(err, data) {
//   if(err) throw err;
//     // data is an array of arrays
// });

// xlsx('currencies.xlsx', function(err,data) {
//     if(err) throw err;
//     //console.log(jsonDataArray(data));
//     console.log(JSON.stringify(convertToJSON(data)));
//     //console.log(data);
// });
// var converter = require("xls-to-json");  
// var res = {};  
// converter({  
//   input: "currencies.xls", 
//   output: null
// }, function(err, result) {
//   if(err) {
//     console.error(err);
//   } else {
//     for (var key = 1; key >= result.length; key++) {
// res[result[key]["Symbol"]] = result[key]["Currency"];  
//     };

//     for(var i in res) {
//       if(res.hasOwnProperty(i)) {
//         console.log("<option value=\"" + i + "\">" + res[i] + "</option>");
//       }
//     }
//   }
// });


// app_https.get('/users', function (req, res) {
//   res.render('users');
// });



//   async.parallel([
//   function(callback) { mysqlconnected.query('SELECT nom FROM users', callback) },
//   function(callback) { mysqlconnected.query('SELECT prenom FROM users', callback) }
// ], function(err, results) {
//   res.render('/users', { rows : results[0], rows2 : results[1] });
// })}})});
// db.getConnection(function(err, mysqlconnected){
//         if(!err){
//         console.log ('La base de données est connectée')
//         var query2 = mysqlconnected.query('SELECT NomResponsable FROM affilie');


// // mysqlconnected.query('INSERT INTO users (nom, prenom, solde) VALUES (?,?,?)', ['Dumaine','Rémy','150'], function(err, result) {
// //      if (err) throw err
// //        console.log('Rémy est inséré dans la Table users');
// //  });
//       }});





        // connection.query('SELECT 5 % 2 AS solution', function(err, rows, fields) {
        //   if (err) throw err;
        //   console.log('The solution is: ', rows[0].solution);
        // });

// mysqlconnected.query('INSERT INTO users (nom, prenom, solde) VALUES (?,?,?)', ['Landelle','Aurélien','200'], function(err, result) {
//       if (err) throw err
//        console.log('Aurélien est inséré dans la Table users');
// });



// mysqlconnected.query('SELECT * FROM users', function(err, results) {
//         if (err) throw err
//         console.log(results[65].id);
//         console.log(results[65].nom);
//         console.log(results[65].prenom);
//         console.log(results[65].solde);
//         console.log( JSON.stringify(results ) );
        
//     });}}); 

// var users = [];
//  mysqldb.query('SELECT * FROM users')
//             io.on('result', function(data){
//                 // Push results onto the notes array
//                 users.push(data)
//             })
//             io.on('end', function(){
//                 // Only emit notes after query has been completed
//                 io.emit('initial users', users)
//             })
// // app_https.get('/users', function(req, res){


// mysqlconnected.query('SELECT * FROM users', function(err, result){
//  var data =JSON.stringify(result);
//  console.log(data);});
// // res.render('users.ejs');
// // })});
// app_https.get('/users', function(req, res){


//  mysqldb.query('SELECT * FROM users', function(err, rows, fields){
//     // if (err) throw err;  
// //   res.json(rows);
//     console.log(JSON.stringify(rows));
//     // var toto = JSON.stringify(results);

//  res.render('users.ejs', {drinks : JSON.stringify(rows)});})});
//     res.render('users.ejs', {users : result});
//  app_https.get('/users', function(req, res) {
//     var drinks = [
//         { name: 'Bloody Mary', drunkness: 3 },
//         { name: 'Martini', drunkness: 5 },
//         { name: 'Scotch', drunkness: 10 }
//     ];
//     var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";
//     console.log(drinks);
//     res.render('users.ejs', {
//         drinks: drinks,
//         tagline: tagline
    // });
// });   



// app_https.post('/users', function(req, res){
// mysqldb.query('SELECT * FROM users', function(err, rows){
// res.render('users.ejs', {results : rows});})});





 // connection.query('CREATE TABLE people(id int primary key, name varchar(255), age int, address text)', function(err, result) {
 //    if (err) throw err
 //    connection.query('INSERT INTO people (name, age, address) VALUES (?, ?, ?)', ['Larry', '41', 'California, USA'], function(err, result) {
 //      if (err) throw err
 //      connection.query('SELECT * FROM people', function(err, results) {
 //        if (err) throw err
 //        console.log(results[0].id)
 //        console.log(results[0].name)
 //        console.log(results[0].age)
 //        console.log(results[0].address)
 //      })
 //    })
 //  }) 
