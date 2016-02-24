// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
//var User            = require('../models/user');
var models = require("../modeles");
var User = models.User;

// User.findOne({where: {'identifiant': 'toto'}}).then( function(data) {
//     console.log(data);
//     if (!data) {
//         console.log("not found");
//     }
//     else 
//     {
//         console.log(data.generateHash("test"));
//     }

// }).catch( function(err) {
//     console.log(err);
// });


// -----------------------------------------------------------------------------

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        //done(null, user.id);
        done(null, user.username);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        
        //User.findById( id ).then( function(user) {
        User.findById(id, { include: [{all: true}] } ).then( function(user) {
            // console.log("here1",user);
            done(null, user);

        }).catch( function(err) { done(err, null)});

    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        //usernameField : 'identifiant',
        passwordField : 'password',
        //passwordField : 'mdpHache',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        //User.findOne({ 'local.email' :  email }, function(err, user) {
        User.findOne({where: { 'username' :  username }}).then( function(user) {
            // if there are any errors, return the error before anything else
            // if (err)
            //     console.log('here1');
            //     return done(err);

            // if no user is found, return the message
            if (!user) {

                return done(null, false, req.flash('loginMessage', 'Aucun utilisateur trouvé')); // req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            if (!user.validPassword(password)) {
                
                return done(null, false, req.flash('loginMessage', 'Mauvais mot de passe')); // create the loginMessage and save it to session as flashdata
            }

            // all is well, return successful user
            // console.log(user.dataValues);
            return done(null, user.dataValues);

        }).catch( function(err) {
            console.log(err);
            return done(err);
        });


    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        // usernameField : 'identifiant',
        // passwordField : 'mdpHache',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        //User.findOne({ 'local.email' :  email }, function(err, user) {
        User.findOne({where: { 'username' :  username }}).then( function(user) {
            // console.log(user);
            
            // check to see if theres already a user with that email
            if (user) 
            {
                return done(null, false, req.flash('signupMessage', "Ce nom d'utilisateur est déjà utilisé"));
            } 
            else 
            {

                // if there is no user with that email
                // create the user
                //var newUser            = new User();
                var newUser = User.build( 
                    {
                        'username': username, 
                        'password': this.generateHash(password),
                        'idBeneficiaire' : req.body.idBeneficiaire
                    });

                // set the user's local credentials
                // newUser.local.email    = email;
                // newUser.local.password = newUser.generateHash(password);
                //newUser.identifiant    = email;
                //newUser.mdpHache       = newUser.generateHash(password);


                // save the user
                newUser.save()
                .then( function() 
                    {
                        return done(null, newUser);
                    })
                .catch( function(err) 
                    {
                        throw err;
                    });
            }

        }).catch( function(err) {
            // if there are any errors, return the error
            return done(err);
        });    

        });

    }));

};
