module.exports = function(app_https, passport) {

    var https = require('https');
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app_https.get('/', function (req, res) {
    res.render('index.ejs', {pageTitle: 'Bienvenue sur Aventix'});
    });


   // =====================================
    // liens vers differentes pages (with login links) ========
    // =====================================


app_https.get('/benefGeolocalisation', function (req, res) {
  res.render('benefGeolocalisation', {pageTitle: 'Bienvenue sur le compte beneficiaire'});
});

app_https.get('/DecideurSouscrireBenef', function (req, res) {
  res.render('DecideurSouscrireBeneficiaire', {pageTitle: 'Bienvenue sur le compte Decideur'});
});


app_https.get('/DragAndDropTry', function (req, res) {
     res.render('DragAndDropTryTest.ejs', {pageTitle: 'Bienvenue sur le compte beneficiaire'});
    var greetings = require("./components/js/ImportMasseUtilisateurs.js");
greetings.sayHelloInSpanish('beneficiaire.xlsx');
  
});



app_https.get('/Decideur', function (req, res) {
  res.render('Decideur.ejs', {pageTitle: 'Bienvenue sur le compte Decideur'});
});

app_https.get('/Beneficiaire', function (req, res) {
  res.render('Beneficiaire.ejs', {pageTitle: 'Bienvenue sur le compte Beneficiaire'});
});

app_https.get('/Affilie', function (req, res) {
  res.render('Affilie.ejs', {pageTitle: 'Bienvenue sur le compte Decideur'});
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
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app_https.get('/signup', function(req, res) 
    {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs',{pageTitle: 'Aventix - Signup'});
    });

    
     // process the signup form
    app_https.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app_https.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app_https.get('/contact', function(req, res) {
        res.render('contact.ejs',{pageTitle: 'contact'}); // load the index.ejs file
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

