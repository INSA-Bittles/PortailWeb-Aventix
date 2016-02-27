// AVENTIX //

//Variables nécessaires faisant appel au modules installé via le NPM :
var express = require('express')
    http = require('http'),
    https = require('https');
var io = require('socket.io')
var path = require('path');
var debug = require('debug')('projectNode:server');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var morgan      = require('morgan');
var flash    = require('connect-flash');
var sync = require('synchronize');

require('./config/passport')(passport) // pass passport for configuration
var fs = require('fs');

// Site en SSL : Permet de gérer le HTTPS
var net = require('net');
var tls = require('tls');
var options = {
   key  : fs.readFileSync('certificat/server.key'),
   cert : fs.readFileSync('certificat/server.crt'),
   RequestCert: true
};

//Persistence de la séssion via la base de données MongoDB
var MongoStore = require('connect-mongo')(session);
var app_https = express();



// Sequelize : ORM pour MySQL : Permet de mieux gérer les requêtes et simplifie le code. utilsiations de modéles.
var models = require("./modeles");
var Sequelize = require('sequelize');
var Email = models.Email;

var port = normalizePort(process.env.PORT || '3000');
app_https.set('port', port);
// http.createServer(app_https).listen(3000, function (res,req) {
//    console.log('Started on port 3000!');


// Création du server HTTPS avec les options certificat et clé cryptée. 
var server = https.createServer(options, app_https);



// Affiche les requêtes sur la console
app_https.use(morgan('dev')); // log every request to the console

// Permet de transformer en JSON et ensuite d'obtenir(PARSE)
// les éléments obtenues  dans le body via le DOM (Request) :
app_https.use(bodyParser.json());
app_https.use(bodyParser.urlencoded({ extended: true }));
app_https.use(cookieParser());



// Configure les chemins d'accès aux pages (Front end),
 // ainsi qu'aux différents composants(CSS, JS, IMG, FILES..) :
app_https.set('view engine', 'ejs'); // set up ejs for templating
app_https.use(express.static(__dirname + '/views'));
app_https.use(express.static(path.join(__dirname,'components')));


// Persistance de la session / Session cachée
app_https.use(session({
  secret: 'Bittlesarethebest',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( {url: 'mongodb://localhost/session'})
  
 } )); // required for passport
app_https.use(passport.initialize());
app_https.use(passport.session()); // persistent login sessions
app_https.use(flash()); // use connect-flash for flash messages stored in session
app_https.use(express.static(path.join(__dirname,'config/passport.js'))); // pass passport for configuration

require('./routes.js')(app_https, passport); 

var db = require('./db');

models.sequelize.authenticate().then(function () {


    /**
    * Listen on provided port, on all network interfaces.
    */
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

});

db.getConnection(function(err, mysqlconnected){
        if(!err){
        console.log ('La base de données est connectée')
        var query2 = mysqlconnected.query('SELECT username FROM users');
      }});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
