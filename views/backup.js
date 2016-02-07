

var geocoder;
var map;

var router = express.Router();

function AffichageAdresseRestaurant(){
  // appel serveur pour récuperer toutes les adresses dans data (route dans app.js)
$.getJSON( '/getadresse', function( data ) {
  
      var tailleTable;
        // appel serveur pour récuperer la taille de la table dans data2 (route dans app.js)
      $.getJSON( '/getnombreligne', function( data2 ){
      tailleTable=parseInt(JSON.stringify(data2.count[0]["COUNT(*)"]));
              //Ici on va commencer une boucle pour pouvoir afficher toutes les adresses de la base
              var pas=0;
              while ( pas < 15) {
                  // on récupere une adresse définie par le pas
                  var text =JSON.stringify(data.Utilisateurs[pas].AdresseResponsable);

                  $('#AffichageAdresse').html(data.Utilisateurs[pas].AdresseResponsable);
                  
                  var delay = 100;
                  var adresse=text;

                    geocoder.geocode( { 'address': adresse}, function(results, status) {
                      // si pas de statut d'erreur on pose un marqueur sur l'adresse
                    if (status == google.maps.GeocoderStatus.OK) {
                          map.setCenter(results[0].geometry.location);
                          // Récupération des coordonnées GPS du lieu 
                          var strposition = results[0].geometry.location+"";
                          strposition=strposition.replace('(', '');
                          strposition=strposition.replace(')', '');
                          document.getElementById('text_latlng').innerHTML='Coordonnées : '+strposition;
                          // Création du marqueur du lieu (épingle)
                          var marker = new google.maps.Marker({
                              map: map,
                              position: results[0].geometry.location
                          });
                    } else {
                          // si les requetes sont trop rapides google maps va bugger et renvoyer le code d'ereur ci dessous
                         // il faut alors faire "attendre" la fonction avec un delay (en ms) puis revenir sur l'adresse precedente
                        if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                          pas--;
                           delay++;
                        } else {
                          //affiche les potentielles autres erreurs
                          var reason="Code "+status;
                          var msg = 'address="' + search + '" error=' +reason+ '(delay='+delay+'ms)<br>';
                          document.getElementById("messages").innerHTML += msg;
                        }   
                      }
                    });
                //on passe à l'adresse suivante
                pas++; 
                }

          });
    });    
}




// initialisation de la carte Google Map de départ, se fait au chargement de la page voir la
// balise body benefGeolocalisation
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


  // var adresse = document.getElementById('adresse').value;
  var adresse="paris";

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

function geolocalisation(){
  if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude; 
        map.setCenter(new google.maps.LatLng(latitude, longitude));
        Marker = new google.maps.Marker({
              map: map,
              position:  new google.maps.LatLng(latitude,longitude)
        });
           
      }); 
  }
  else
  {
    alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
  }

}

function TrouverAdresseAvecArgument(text) {
  // Récupération de l'adresse tapée dans le formulaire
  var adresse = document.getElementById('adresse').value;
   var adresse=text;
  geocoder.geocode( { 'address': adresse}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {x
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
      // alert('Adresse introuvable: ' + status);

          if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            nextAddress--;
            delay++;
          } else {
            var reason="Code "+status;
            var msg = 'address="' + search + '" error=' +reason+ '(delay='+delay+'ms)<br>';
            document.getElementById("messages").innerHTML += msg;
          }   




    }
  });
}

