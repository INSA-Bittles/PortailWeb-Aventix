'use strict';

module.exports = function(sequelize, DataTypes) {
  var bcrypt   = require('bcrypt-nodejs');
  var User = sequelize.define('User', 
  {
    username: 
    {
      type: DataTypes.STRING,
      primaryKey: true,
      field: 'username'
    },
    password: 
    {
      type: DataTypes.STRING,
      field: 'password'
    },
    type: 
    {
      type: DataTypes.STRING,
      defaultValue: "Beneficiaire",
      field: 'type'
    },
    idBeneficiaire: 
    {
      type: DataTypes.INTEGER,
      defaultValue: null,
      field: 'IdAvtxBeneficiaire'

    },
    idDecideur: 
    {
      type: DataTypes.INTEGER,
      defaultValue: null,
      field: 'IdAvtxDecideur'
    },
    idAffilie: 
    {
      type: DataTypes.INTEGER,
      defaultValue: null,
      field: 'IdAvtxAffilie'
    },
    idAdmin: 
    {
      type: DataTypes.INTEGER,
      defaultValue: null,
      field: 'IdAdmin'
    }
  },
  {
      tableName: "users",
      classMethods: 
      {
        associate: function(models) {
          // associations can be defined here
          this.belongsTo( models.Beneficiaire, { foreignKey: { name: 'idBeneficiaire', allowNull: true} } );
          this.belongsTo( models.Decideur, { foreignKey: { name: 'IdAvtxDecideur', allowNull: true} } );
          this.belongsTo( models.Affilie, { foreignKey: { name: 'IdAvtxAffilie', allowNull: true} } );
          this.belongsTo( models.GestiondeTransaction, { foreignKey: { name: 'IdAvtxAffilie', allowNull: true} } );
        },
        generateHash: function(password) {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); 
        },
        
      },
      instanceMethods: 
      {
        validPassword: function(password) {
          return bcrypt.compareSync(password, this.password);
        }
      }
  });
  return User;
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