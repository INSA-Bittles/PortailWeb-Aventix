'use strict';

module.exports = function(sequelize, DataTypes) {
  var bcrypt   = require('bcrypt-nodejs');
  var Beneficiaire = sequelize.define('Beneficiaire', 
  {
    idBeneficiaire: 
    {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      field: 'IdAvtxBeneficiaire'
    },
    nom: 
    {
      type: DataTypes.STRING,
      field: 'NomBeneficiaire'
    },
    prenom: 
    {
      type: DataTypes.STRING,
      field: 'PrenomBeneficiaire'
    },
    adresse: 
    {
      type: DataTypes.STRING,
      field: 'AdresseBeneficiaire'
    },
    cp: 
    {
      type: DataTypes.CHAR(5),
      field: 'CodePostalBeneficiaire'
    },
    ville: 
    {
      type: DataTypes.STRING,
      field: 'VilleBeneficiaire'
    },
    email: 
    {
      type: DataTypes.STRING,
      field: 'AdresseMailBeneficiaire'
    },
    IdDecideur: 
    {
      type: DataTypes.INTEGER(10),
      field: 'IdAvtxDecideur'
    },
    NumeroCarte: 
    {
      type: DataTypes.INTEGER(11),
      field: 'NumeroCarte'
    },
    Status: 
    {
      type: DataTypes.ENUM('Cadre','Cadre avec astreinte','Employe sedentaire'),
      field: 'StatutBeneficiaire'
    },

  },
  {
      tableName: "beneficiaire",
      classMethods: 
      {
        associate: function(models) {
          this.belongsTo( models.carteAPuce, { foreignKey: { name: 'NumeroCarte', allowNull: true} } );
          this.belongsTo( models.User, { foreignKey: { name: 'idBeneficiaire', allowNull: true} } );
        }
      }
  });
  return Beneficiaire;
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