'use strict';

module.exports = function(sequelize, DataTypes) {
  var bcrypt   = require('bcrypt-nodejs');
  var carteAPuce = sequelize.define('carteAPuce', 
  {
    NumeroCarte: 
    {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      field: 'NumeroCarte'
    },
    solde: 
    {
      type: DataTypes.FLOAT,
      field: 'Solde'
    },
    etat: 
    {
      type: DataTypes.ENUM('Valide','Bloquée'),
      field: 'EtatCarte'
    },
    CodeCarte: 
    {
      type: DataTypes.STRING,
      field: 'CodeCarte'
    }
  },
  {
      tableName: "carteapuce",
      classMethods: 
      {
        associate: function(models) {
          
        }
      }
  });
  return carteAPuce;
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