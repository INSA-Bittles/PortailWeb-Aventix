module.exports = function(app_https, passport) {

    var https = require('https');
    var Sequelize = require('sequelize');
    var models = require("./modeles");
    var Beneficiaire = models.Beneficiaire;
    var Decideur = models.Decideur;
    var carteAPuce = models.carteAPuce;
    var GestiondeTransaction = models.GestiondeTransaction;
    var Affilie = models.Affilie;
    var User = models.User;

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app_https.get('/', function (req, res) {
    res.render('index', {pageTitle: 'Bienvenue sur Aventix'});
    });

    // app_https.get('/test', function(req,res){
    //     Beneficiaire.find(req.user, function(err, beneficiaires) {
    //         if (err)
    //             res.send(err);
    //          res.json(beneficiaires);
    // })});
    
    app_https.get('/geolocalisation', function (req, res) {
    res.render('geolocalisation', {pageTitle: 'Géolocalisation des restaurants'});
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


    var data = {"Beneficiaires":""};
    app_https.get('/listBeneficiaire', function(req,res){
    Beneficiaire.findAll({ 
        include: [{  
            model: 
            Decideur, 
            where : { idDecideur : req.user.dataValues.idDecideur} 
        }]
    })
    .then(function(Beneficiaire) {
        data["Beneficiaires"] = Beneficiaire;
        res.json(data),
    console.log(JSON.stringify(Beneficiaire))}).catch( function(err) {
            console.log(err);
            return done(err);
        });
    });

    var data2 = {"Transactions":""};
    app_https.get('/listTransactions', function(req,res){
    GestiondeTransaction.findAll({ 
        include: [{  
            model: 
            Affilie, 
            where : { idAffilie : req.user.dataValues.idAffilie} 
        }]
    })
    .then(function(Transaction) {
        data2["Transactions"] = Transaction;
        res.json(data2),
        console.log(JSON.stringify(Transaction))}).catch( function(err) {
            console.log(err);
            return done(err);
        });
    });
    
    var data3 = {"Solde":""};
    app_https.get('/Solde', function(req,res){
    Beneficiaire.findAll({ 
        include: [{  
            model: 
            carteAPuce, where : { solde : req.user.dataValues.idBeneficiaire} ,
            
        }]
    })
    .then(function(solde) {
        data3["Solde"] = solde;
        res.json(data3),
        console.log(JSON.stringify(solde))}).catch( function(err) {
            console.log(err);
            return done(err);
        });
    });


    
    // app_https.post('/pushData2', function(req,res){
    //     var test = {"beneficiaire":""};
    //     test["beneficiaire"] = req.body;

    //     carteAPuce.max('NumeroCarte')
           
        
    //     .then(function(max)
    //     {
    //         console.log(max);
    //         var newCarteAPuce = carteAPuce.build( 
    //                 { 
    //                     'solde' : 0,
    //                     'etat' : 'valide',
    //                     'CodeCarte' : 0,
    //                 });
    //             newCarteAPuce.save()
    //             .then( function() 
    //                 {
    //                     res.end;
    //                 })
    //             .catch( function(err) 
    //                 {
    //                     throw err;
    //                 });

    //     })
    //     .catch( function(err) 
    //     {
    //             console.log(err);
    //             return done(err);
    //     });

    // });




















//     app_https.post('/post_donnees_excel', function(req, res) {

//   // voir DragAndDrop.js l 133 pour l'appel ajax
//   var test = {"beneficiaire":""};
//  test["beneficiaire"] = req.body;
//       JsonDecideur=test;
//       console.log(req.body);
      
//       console.log(JsonDecideur.beneficiaire.PrenomBeneficiaire);

//       // console.log(JsonDecideur.beneficiaire.NomBeneficiaire);
      
// db.getConnection(function(err, mysqlconnected){

//       // insertion dans la table carteAPuce avant d'entrer dans la table beneficiaire car clé étrangere 

//         if(!err){
        
         
//               mysqlconnected.query('SELECT MAX(NumeroCarte) from CarteAPuce ' , function(err, results) {
//                       if (!err)
//                       {


//                               var data = {"count":""};
//                               data["count"] = results;
//                               var MaxNumCarte=parseInt(JSON.stringify(data.count[0]["MAX(NumeroCarte)"]));
//                               MaxNumCarte=MaxNumCarte+1;
//                               console.log(MaxNumCarte);

//                     // ne semble pas reexecuter la requete SQL si on ne lui dit pas que le req.body a subit des modifs
//                      var test = {"beneficiaire":""};
//                      test["beneficiaire"] = req.body;
//                       JsonDecideur=test;
                         

//               mysqlconnected.query('INSERT INTO CarteAPuce (NumeroCarte, Solde, EtatCarte,CodeCarte) VALUES  ('+MaxNumCarte+','+0+',\'Valide\','+Math.round(Math.random()*10000)+')' , function(err, results) {
//                       if (!err)
//                               console.log('no error while performing query insert into carte a puce');
//                       else
//                         console.log('Error while performing Query insert into carte a puce.');
//                       });
            


//                     }
//                       else
//                       {
//                         console.log('Error while performing Query max cartea puce.');

//                       }
              
               
//                                     // insertion dans la table beneficiaire 
                                    
//                                         mysqlconnected.query('SELECT MAX(IdAvtxBeneficiaire) from beneficiaire' , function(err, results) {
//                                               if (!err)
//                                               {
//                                                       var data2 = {"count2":""};
//                                                       data2["count2"] = results;
//                                                       var MaxId=parseInt(JSON.stringify(data2.count2[0]["MAX(IdAvtxBeneficiaire)"]));
//                                                       MaxId=MaxId+1;
//                                                       console.log('no error while performing query max id benef');

//                                               }
//                                               else
//                                               {
//                                                 console.log('Error while performing Query max Id Benef.');
//                                               }

//                                               // Garde les infos de l'itération precedente si on ne redeclare pas les req.body?
//                                               // pas trouvé d'explication
//                                               var test = {"beneficiaire":""};
//                                               test["beneficiaire"] = req.body;
//                                               JsonDecideur=test;
//                                               console.log(MaxId+','+'\''+JsonDecideur.beneficiaire.NomBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.PrenomBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.AdresseBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.CodePostalBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.VilleBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.AdresseMailBeneficiaire+'\''+','+parseInt(JsonDecideur.beneficiaire.IdAvtxDecideur)+','+MaxNumCarte+','+'\''+JsonDecideur.beneficiaire.StatutBeneficiaire+'\'');
//                                                 mysqlconnected.query('INSERT INTO Beneficiaire (IdAvtxBeneficiaire, NomBeneficiaire, PrenomBeneficiaire, AdresseBeneficiaire, CodePostalBeneficiaire, VilleBeneficiaire, AdresseMailBeneficiaire, IdAvtxDecideur, NumeroCarte, StatutBeneficiaire )VALUES  ('+MaxId+','+'\''+JsonDecideur.beneficiaire.NomBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.PrenomBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.AdresseBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.CodePostalBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.VilleBeneficiaire+'\''+','+'\''+JsonDecideur.beneficiaire.AdresseMailBeneficiaire+'\''+','+parseInt(JsonDecideur.beneficiaire.IdAvtxDecideur)+','+MaxNumCarte+','+'\''+JsonDecideur.beneficiaire.StatutBeneficiaire+'\''+')' , function(err, results) {
//                                                   if (!err)
//                                                           console.log('no error while performing query insert into benef');
//                                                   else
//                                                     console.log('Error while performing Query insert into benef .');
//                                                   });
 
//                                         });
                                              
//                 });
              
//            }

        


//         else{

//           console.log("erreur");
//         }



//       });

// });










































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

    // app_https.post('/test', function(req,res){
    //     var nouveauBeneficiaire = modeles.Beneficiaire.build(
    //     {
    //         idBeneficiaire : '1500',
    //         IdDecideur : '2001',
    //         NumeroCarte : '254101'

    //     });
    //     nouveauBeneficiaire.save().then(function(response){
    //         console.log("ici", response);
    //     })
    // })

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

