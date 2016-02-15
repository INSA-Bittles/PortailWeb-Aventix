module.exports = function(app_https, passport) {

    var https = require('https');
    var models = require("./modeles");
    var Beneficiaire = models.Beneficiaire;
    var User = models.User;
    var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app_https.get('/', function (req, res) {
    res.render('index', {pageTitle: 'Bienvenue sur Aventix'});
    });


    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app_https.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app_https.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true, // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app_https.get('/signup', function(req, res) 
    {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs',{pageTitle: 'Aventix - Signup', message: req.flash('signupMessage')});
    });

    
     // process the signup form
    app_https.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app_https.get('/profile', isLoggedIn, function(req, res) {
        
        switch( req.user.type ) {
            case 'Affilie':
            {
                //console.log( 'here', req);
                res.render('affilie.ejs', {
                    user : req.user, // get the user out of session and pass to template
                });
                break;
            }
            case 'Decideur':
            {
                res.render('decideur.ejs', {
                    user : req.user, // get the user out of session and pass to template
                });
                break;
            }
            case 'Beneficiaire':
            {
                res.render('beneficiaire.ejs', {
                    user : req.user // get the user out of session and pass to template
                });
                break;
            }
            case 'admin':
            {
                res.render('profile.ejs', {
                    user : req.user // get the user out of session and pass to template
                });
                break;
            }
            default:
            {
                res.render('profile.ejs', {
                    user : req.user // get the user out of session and pass to template
                });
                break;
            }

        }
        // res.render('profile.ejs', {
        //     user : req.user // get the user out of session and pass to template
        // });
    });


    app_https.get('/contact', function(req, res) {
        res.render('contact.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app_https.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

