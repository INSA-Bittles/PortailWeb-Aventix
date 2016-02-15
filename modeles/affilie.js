'use strict';

module.exports = function(sequelize, DataTypes) {
  var bcrypt   = require('bcrypt-nodejs');
  var Affilie = sequelize.define('Affilie', 
  {
    idDecideur: 
    {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      field: 'IdAvtxAffilie'
    },
    NomRestaurant: 
    {
      type: DataTypes.STRING,
      field: 'NomRestaurant'
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
      field: 'AdresseResponsable'
    },
    ville: 
    {
      type: DataTypes.STRING,
      field: 'VilleRestaurant'
    },
    RIB: 
    {
      type: DataTypes.STRING,
      field: 'RIBRestaurant'
    },
  },
  {
      tableName: "affilie",
      classMethods: 
      {
        associate: function(models) {
          // associations can be defined here
        }
      }
  });
  return Affilie;
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