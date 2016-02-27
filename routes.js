'use strict';

module.exports = function(app_https, passport) {

    var https = require('https');
    var Sequelize = require('sequelize');
    var models = require("./modeles");
    var sync = require('synchronize');
    var Beneficiaire = models.Beneficiaire;
    var Decideur = models.Decideur;
    var carteAPuce = models.carteAPuce;
    var GestiondeTransaction = models.GestiondeTransaction;
    var Affilie = models.Affilie;
    var User = models.User;
    var Email = models.Email;
    var async = require('async');
    var bcrypt   = require('bcrypt-nodejs');

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
    // app_https.get('/signup', function(req, res) 
    // {

    //     // render the page and pass in any flash data if it exists
    //     res.render('signup.ejs',{pageTitle: 'Aventix - Signup', message: req.flash('signupMessage')});
    // });

    
     // process the signup form
    app_https.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
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
                    user : req.user
                     // get the user out of session and pass to template
                });
                break;
            }
            case 'Admin':
            {
                res.render('admin.ejs', {
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
    
    // =====================================
    // CONTACT SECTION =====================
    // =====================================
    // Mailer
    var nodemailer = require("nodemailer");


    var transporter = nodemailer.createTransport({
        port: 1025,
        ignoreTLS: true,
        // other settings...
      });
    //     service: 'gmail',
    //   auth: {
    //     user: "aurelien.landelle@gmail.com",    // your email here
    //     pass: "password"        // your password here
    //   }
    // });


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
    console.log(JSON.stringify(data))}).catch( function(err) {
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
    
    var data3 = {};
    app_https.get('/Solde', function(req,res){
    Beneficiaire.findById( req.user.dataValues.idBeneficiaire, {
        include: [{  
            model: 
            carteAPuce, attributes : ['solde', 'etat']
        }]
        
    })
    .then(function(Soldes) {
        data3["Soldes"] = {Soldes};
        res.json(data3),
        console.log(JSON.stringify(Soldes))}).catch( function(err) {
            console.log(err);
            return done(err);
        });
    });

// app_https.post('/test', function(req,res){
    //     User.findOne({where: { 'username' :  username }}).then( function(user) {
    //     {
    //         user : req.user,
    //         IdDecideur : '2001',
    //         User.findOne({where: { 'username' :  username }}).then( function(user) {

    //     });
    //     nouveauBeneficiaire.save().then(function(response){
    //         console.log("ici", response);
    //     })
    // })



 var data4 = {"DernieresTransactions":""};
    app_https.get('/listLastTransactions', function(req,res){
    GestiondeTransaction.findAll({ 
        include: [{  
            model: 
            Beneficiaire, 
            where : { idBeneficiaire : req.user.dataValues.idBeneficiaire}, 
        }]
    })
    .then(function(lastTransactions) {
        data4["DernieresTransactions"] = lastTransactions;
        res.json(data4),
        console.log(JSON.stringify(lastTransactions))}).catch( function(err) {
            console.log(err);
            return done(err);
        });
    });

    
    app_https.post('/pushData', function(req,res){
        // var test = {"beneficiaire":""};
        // test["beneficiaire"] = req.body;
        console.log(req.body),
        Beneficiaire.max('idBeneficiaire')
        
        .then(function(max)
        {   
            console.log(max);
            
            var newBeneficiaire = Beneficiaire.build( 
                    { 
                        'idBeneficiaire' : max+1,
                        'nom' : req.body.nom,
                        'prenom' : req.body.prenom,
                        'adresse' : req.body.adresse,
                        'cp' : req.body.cp,
                        'ville' : req.body.ville,
                        'email' : req.body.email,
                        'NumeroCarte' : req.body.NumeroCarte,
                        'IdDecideur' : req.body.IdDecideur,
                        'Status' : req.body.Status
                    });
                newBeneficiaire.save()
                .then( function() 
                    {
                        res.end;
                    })
                .catch( function(err) 
                    {
                        throw err;
                    });

        })
        .catch( function(err) 
        {
                console.log(err);
                return done(err);
        });

    });
    


    var data5 = {"Cartes":""};
    app_https.get('/listeCartes', function(req, res) {
    carteAPuce.max('NumeroCarte')
    
        .then(function(max) {
        data5["Cartes"] = {max};
        res.json(data5),
        console.log(JSON.stringify(max))}).catch( function(err) {
            console.log(err);
            return done(err);
        });
    });


    app_https.delete('/listBeneficiaire/:idBeneficiaire', function(req,res){
        
        var idBeneficiaire = req.params.idBeneficiaire;
        console.log(idBeneficiaire);
        Beneficiaire.destroy({where : { 'idBeneficiaire' : idBeneficiaire}})
        .then(function(destroy) {console.log('Bénéficiaire supprimé');})
            .catch( function(err) {
            console.log(err);
            return done(err);
        });
    });

    app_https.get('/listBeneficiaire/:idBeneficiaire', function(req,res){
        var idBeneficiaire = req.params.idBeneficiaire;
        console.log(idBeneficiaire);
        Beneficiaire.find({where : { 'idBeneficiaire' : idBeneficiaire}})
        .then(function(id) {console.log(JSON.stringify(id));res.json(id);})
            .catch( function(err) {
            console.log(err);
            return done(err);
        });
    });

    app_https.put('/listBeneficiaire/:idBeneficiaire', function(req,res){
        var idBeneficiaire = req.params.idBeneficiaire;
        console.log(req.body);
        Beneficiaire.update({
                'nom' : req.body.nom,
                'prenom' : req.body.prenom,
                'adresse' : req.body.adresse,
                'cp' : req.body.cp,
                'ville' : req.body.ville,
                'email' : req.body.email,
                'NumeroCarte' : req.body.numero,
                'IdDecideur' : req.body.idDecideur,
                'Status' : req.body.Status
            },{where : { 'idBeneficiaire' : idBeneficiaire}})
        .then(function(Beneficiaire){
            console.log(Beneficiaire);
            res.end;
        }).catch( function(err) {
            console.log(err);
            return done(err);
        });
    });












    app_https.post('/pushData2', function(req,res,next){
        var test = {"beneficiaire":""};
        test["beneficiaire"] = req.body;
        carteAPuce.max('NumeroCarte')
        
        
        .then(function(max)
        {   
            console.log(max);
            var newCarteAPuce = carteAPuce.build( 
                    { 
                        'NumeroCarte' : max=max+1,
                        'solde' : req.body.solde,
                        'etat' : 'valide',
                        'CodeCarte' : '0000'
                    });
                newCarteAPuce.save()
                .then( function() 
                    {
                        res.end;
                    })
                .catch( function(err) 
                    {
                        throw err;
                    });

        })
        .catch( function(err) 
        {
                console.log(err);
                return done(err);
        });

    });

    // var data = {"Users":""};
    // app_https.get('/listUsers', function(req,res){
    // User.findById( req.user.dataValues.id)  
    // .then(function(Users) {
    //     data["Users"] = Users;
    //     res.json(data),
    // console.log(JSON.stringify(Users))}).catch( function(err) {
    //         console.log(err);
    //         return done(err);
    //     });
    // });

    app_https.put('/listUsersB/:idBeneficiaire', function(req, res) {
    var idBeneficiaire = req.params.idBeneficiaire;
    console.log(req.body);
    User.update({
                'password': bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
            },{where : { 'idBeneficiaire' : idBeneficiaire}})
        .then(function(User){
            console.log(User);
            res.end;
        }).catch( function(err) {
            console.log(err);
            return done(err);
        });
    });

    app_https.put('/listUsersD/:idDecideur', function(req, res) {
    var idDecideur = req.params.idDecideur;
    console.log(req.body);
    User.update({
                'password': bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
            },{where : { 'idDecideur' : idDecideur}})
        .then(function(User){
            console.log(User);
            res.end;
        }).catch( function(err) {
            console.log(err);
            return done(err);
        });
    });

    app_https.put('/listUsersA/:idAffilie', function(req, res) {
    var idAffilie = req.params.idAffilie;
    console.log(req.body);
    User.update({
                'password': bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
            },{where : { 'idAffilie' : idAffilie}})
        .then(function(User){
            console.log(User);
            res.end;
        }).catch( function(err) {
            console.log(err);
            return done(err);
        });
    });

    app_https.put('/listUsersAdmin/:idAdmin', function(req, res) {
    var idAdmin = req.params.idAdmin;
    console.log(req.body);
    User.update({
                'password': bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
            },{where : { 'idAdmin' : idAdmin}})
        .then(function(User){
            console.log(User);
            res.end;
        }).catch( function(err) {
            console.log(err);
            return done(err);
        });
    });


    app_https.put('/listBeneficiaireS/:NumeroCarte', function(req, res) {
    var NumeroCarte = req.params.NumeroCarte;
    console.log(req.body);
    carteAPuce.update({
                'solde': req.body.solde
            },{where : { 'NumeroCarte' : NumeroCarte}})
        .then(function(NumeroCarte){
            console.log(NumeroCarte);
            res.end;
        }).catch( function(err) {
            console.log(err);
            return done(err);
        });
    });

    app_https.delete('/listCartesR/:NumeroCarte', function(req,res){
        
        var NumeroCarte = req.params.NumeroCarte;
        console.log(NumeroCarte);
        carteAPuce.destroy({where : { 'NumeroCarte' : NumeroCarte}})
        .then(function(destroy) {console.log('La carte a été supprimée');})
            .catch( function(err) {
            console.log(err);
            return done(err);
        });
    });

    app_https.delete('/listUsersR/:idBeneficiaire', function(req,res){
        
        var idBeneficiaire = req.params.idBeneficiaire;
        console.log(idBeneficiaire);
        User.destroy({where : { 'idBeneficiaire' : idBeneficiaire}})
        .then(function(destroy) {console.log("Le compte utilsiateur été supprimée");})
            .catch( function(err) {
            console.log(err);
            return done(err);
        });
    });

// Modification du Code de carte  :
    
    app_https.put('/listCodeCarte/:NumeroCarte', function(req, res) {
    var NumeroCarte = req.params.NumeroCarte;
    console.log(req.body);
    carteAPuce.update({
                'CodeCarte': req.body.CodeCarte
            },{where : { 'NumeroCarte' : NumeroCarte}})
        .then(function(NumeroCarte){
            console.log(NumeroCarte);
            res.end;
        }).catch( function(err) {
            console.log(err);
            return done(err);
        });
    });




// Email :

app_https.post('/contact-form',function(req,res){
  var data = req.body;

  transporter.sendMail({
    'from' : req.body.Email,
    'to' : 'aurelien.landelle@gmail.com',
    'subject' : req.body.Subject + 'from' + req.body.Name,
    'text' : req.body.Message
  });
  res.json(data);
  console.log("here7",data);
});

  app_https.post('/contact-form2',function(req,res){
    console.log(req.body)
    var newEmail = Email.build( 
                    { 
                        'emailFrom' : req.body.Email,
                        'emailTo' : 'aurelien.landelle@gmail.com',
                        'subject' : req.body.Subject + "from" + req.body.Name,
                        'message' : req.body.Message
                    });
                newEmail.save()
                .then( function() 
                    {
                        res.end;
                    })
                .catch( function(err) 
                    {
                        throw err;
                    })
        .catch( function(err) 
        {
                console.log(err);
                return done(err);
        });

    });

// Admin Section -request //

    app_https.get('/listBeneficiaireAll', function(req,res){
    Beneficiaire.findAll({ 
        include: [{  
            model: 
            Decideur}]})
    .then(function(Beneficiaire) {
        data["Beneficiaires"] = Beneficiaire;
        res.json(data),
    console.log(JSON.stringify(data))}).catch( function(err) {
            console.log(err);
            return done(err);
        });
    });


    app_https.post('/pushData3', function(req,res){
        // var test = {"beneficiaire":""};
        // test["beneficiaire"] = req.body;
        console.log(req.body),
        Beneficiaire.max('idBeneficiaire')
        
        .then(function(max)
        {   
            console.log(max);
            
            var newBeneficiaire = Beneficiaire.build( 
                    { 
                        'idBeneficiaire' : max+1,
                        'nom' : req.body.nom,
                        'prenom' : req.body.prenom,
                        'adresse' : req.body.adresse,
                        'cp' : req.body.cp,
                        'ville' : req.body.ville,
                        'email' : req.body.email,
                        'NumeroCarte' : req.body.NumeroCarte,
                        'IdDecideur' : req.body.IdDecideur,
                        'Status' : req.body.Status
                    });
                newBeneficiaire.save()
                .then( function() 
                    {
                        res.end;
                    })
                .catch( function(err) 
                    {
                        throw err;
                    });

        })
        .catch( function(err) 
        {
                console.log(err);
                return done(err);
        });

    });

    app_https.delete('/listBeneficiaireAll/:idBeneficiaire', function(req,res){
        
        var idBeneficiaire = req.params.idBeneficiaire;
        console.log(idBeneficiaire);
        Beneficiaire.destroy({where : { 'idBeneficiaire' : idBeneficiaire}})
        .then(function(destroy) {console.log('Bénéficiaire supprimé');})
            .catch( function(err) {
            console.log(err);
            return done(err);
        });
    });

    app_https.get('/listBeneficiaireAll/:idBeneficiaire', function(req,res){
        var idBeneficiaire = req.params.idBeneficiaire;
        console.log(idBeneficiaire);
        Beneficiaire.find({where : { 'idBeneficiaire' : idBeneficiaire}})
        .then(function(id) {console.log(JSON.stringify(id));res.json(id);})
            .catch( function(err) {
            console.log(err);
            return done(err);
        });
    });

    app_https.put('/listBeneficiaireAll/:idBeneficiaire', function(req,res){
        var idBeneficiaire = req.params.idBeneficiaire;
        console.log(req.body);
        Beneficiaire.update({
                'nom' : req.body.nom,
                'prenom' : req.body.prenom,
                'adresse' : req.body.adresse,
                'cp' : req.body.cp,
                'ville' : req.body.ville,
                'email' : req.body.email,
                'NumeroCarte' : req.body.numero,
                'IdDecideur' : req.body.idDecideur,
                'Status' : req.body.Status
            },{where : { 'idBeneficiaire' : idBeneficiaire}})
        .then(function(Beneficiaire){
            console.log(Beneficiaire);
            res.end;
        }).catch( function(err) {
            console.log(err);
            return done(err);
        });
    });


    app_https.get('/listEmail', function(req,res){
        
        console.log(req.body);
        Email.findAll({})
        .then(function(email) {console.log(JSON.stringify(email));res.json(email);})
            .catch( function(err) {
            console.log(err);
            return done(err);
        });
    });

    app_https.delete('/listEmail/:ID', function(req,res){
        var ID = req.params.ID;
        console.log(ID);
        Email.destroy({where : { 'ID' : ID}})
        .then(function(destroy) {console.log('Le mail a été supprimé');})
            .catch( function(err) {
            console.log(err);
            return done(err);
        });
    });



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



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

