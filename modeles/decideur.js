'use strict';

module.exports = function(sequelize, DataTypes) {
  var bcrypt   = require('bcrypt-nodejs');
  var Decideur = sequelize.define('Decideur', 
  {
    idDecideur: 
    {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      field: 'IdAvtxDecideur'
    },
    NomSociete: 
    {
      type: DataTypes.STRING,
      field: 'NomSociete'
    },
    prenom: 
    {
      type: DataTypes.STRING,
      field: 'PrenomResponsable'
    },
    nom: 
    {
      type: DataTypes.STRING,
      field: 'NomResponsable'
    },
    adresse: 
    {
      type: DataTypes.STRING,
      field: 'AdresseSociete'
    },
    cp: 
    {
      type: DataTypes.CHAR(5),
      field: 'CodePostalSociete'
    },
    ville: 
    {
      type: DataTypes.STRING,
      field: 'VilleSociete'
    },
    email: 
    {
      type: DataTypes.STRING,
      field: 'Adressemail'
    },
  },
  {
      tableName: "decideur",
      classMethods: 
      {
        associate: function(models) {
          // associations can be defined here
        }
      }
  });
  return Decideur;
};

// // methods ======================
// // generating a hash
// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };