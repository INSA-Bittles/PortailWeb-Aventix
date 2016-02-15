'use strict';

module.exports = function(sequelize, DataTypes) {
  var bcrypt   = require('bcrypt-nodejs');
  var GestiondeTransaction = sequelize.define('GestiondeTransaction', 
  {
    NumeroDeTransaction: 
    {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      field: 'NumeroDeTransaction'
    },
    Montant: 
    {
      type: DataTypes.INTEGER,
      field: 'Montant'
    },
    date: 
    {
      type: DataTypes.DATE,
      field: 'DateOperation'
    },
    NumeroCarte: 
    {
      type: DataTypes.STRING,
      field: 'NumeroCarte'
    },
    idAffilie: 
    {
      type: DataTypes.INTEGER(10),
      field: 'IdAvtxAffilie'
    }
  },
  {
      tableName: "GestiondeTransaction",
      classMethods: 
      {
        associate: function(models) {
          
        }
      }
  });
  return GestiondeTransaction;
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