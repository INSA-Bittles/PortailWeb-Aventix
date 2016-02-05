

var geocoder;
var map;

var router = express.Router();

function testConnection(){
   // document.getElementById("AffichageAdresse").innerHTML ='czeczec';
  
$.getJSON( '/userslist', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
    //     $.each(data, function(){

 
    //     // Inject the whole content string into our existing HTML table
    //     // $('#userList table tbody').html(tableContent);
    // });

    // var mysql      = require('mysql');
    // var mysqldb = mysql.createConnection({
    //   host     : 'localhost',
    //   user     : 'root',
    //   password : '1107',
    //   database : 'aventix',
    //   port : 3306
    // });

    // mysqldb.connect(function(err) {
    //   if (err) throw err;
    //   console.log('Vous êtes connecté')
    // });

    // mysqldb.query('SELECT 5 % 2 AS solution', function(err, rows, fields) {
    //   if (err) throw err;
    //   console.log('The solution is: ', rows[0].solution);
    // });

var text =JSON.stringify(data);
$('#AffichageAdresse').html(text);
TrouverAdresseAvecArgument(text);

    document.getElementById("AffichageAdresse").innerHTML =data.Utilisateurs[0].NomRestaurant;


});
}


function ExtraireAdresse() 
{


$.ajax({
            type: 'GET',
            url: '/userslist',
        });
  // var db = require('../db.js');


  // db.getConnection(function(err, mysqlconnected){
  //       if(!err){
  //       console.log ('La base de données est connectée');
  //       var query2 = mysqlconnected.query('SELECT NomResponsable FROM affilie');

  //     }});


//   document.getElementById('AffichageAdresse').innerHTML='pasconncte';
//   var mysql      = require('mysql');
// var db = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '1107',
//   database : 'aventix',
//   port : 3306
// });

// db.connect(function(err) {
//   if (err) throw err;
//   console.log('Vous êtes connecté via tamere')
// });
// console.log ('1');

  
  
// var data = {"Utilisateurs":""};
 
//   db.getConnection(function(err, mysqlconnected)
//       {
//         console.log ('2');

//         if(!err)
//         {
//               mysqlconnected.query('SELECT NomResponsable, NomRestaurant from Affilie' , function(err, results) 
//                 {
//                           if(results.length != 0)
//                           {
//                             data["Utilisateurs"] = results;

//                              var text=data;
//                       var obj = JSON.parse(text);
//                       document.getElementById("AffichageAdresse").innerHTML =obj.Utilisateurs[0].NomRestaurant;
//                              // document.getElementById('AffichageAdresse').innerHTML='adresse : '+data.Utilisateurs[0].NomRestaurant;
                            
//                           }else
//                           {
//                             document.getElementById('AffichageAdresse').innerHTML='pasconncte';
//                             data["Utilisateurs"] = 'No data Found..';

//                           }
//                 }
//               );
//         }

//       }


//   );


}

// initialisation de la carte Google Map de départ
function initialiserCarte() {
  geocoder = new google.maps.Geocoder();
  // Ici j'ai mis la latitude et longitude du vieux Port de Marseille pour centrer la carte de départ
  var latlng = new google.maps.LatLng(43.295309,5.374457);
  var mapOptions = {
    zoom      : 14,
    center    : latlng,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  }
  // map-canvas est le conteneur HTML de la carte Google Map
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
 
function TrouverAdresse() {
  // Récupération de l'adresse tapée dans le formulaire
  var adresse = document.getElementById('adresse').value;

  geocoder.geocode( { 'address': adresse}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      // Récupération des coordonnées GPS du lieu tapé dans le formulaire
      var strposition = results[0].geometry.location+"";
      strposition=strposition.replace('(', '');
      strposition=strposition.replace(')', '');
      // Affichage des coordonnées dans le <span>
      console.log ('La base de données est connectée');
      document.getElementById('text_latlng').innerHTML='Coordonnées : '+strposition;
      // Création du marqueur du lieu (épingle)
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Adresse introuvable: ' + status);
    }
  });
}

function TrouverAdresseAvecArgument(text) {
  // Récupération de l'adresse tapée dans le formulaire
  var adresse = document.getElementById('adresse').value;
   var adresse=text;
  geocoder.geocode( { 'address': adresse}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      // Récupération des coordonnées GPS du lieu tapé dans le formulaire
      var strposition = results[0].geometry.location+"";
      strposition=strposition.replace('(', '');
      strposition=strposition.replace(')', '');
      // Affichage des coordonnées dans le <span>
      console.log ('La base de données est connectée');
      document.getElementById('text_latlng').innerHTML='Coordonnées : '+strposition;
      // Création du marqueur du lieu (épingle)
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Adresse introuvable: ' + status);
    }
  });
}
