'use strict';

module.exports = function(sequelize, DataTypes) {
  var bcrypt   = require('bcrypt-nodejs');
  var Email = sequelize.define('Email', 
  {
     ID: 
    {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      field: 'ID'
    },
    emailFrom: 
    {
      type: DataTypes.STRING,
      field: 'emailFrom'
    },
    emailTo: 
    {
      type: DataTypes.STRING,
      field: 'emailTo'

    },
    date: 
    {
      type: DataTypes.DATE,
      field: 'date'
    },
    subject: 
    {
      type: DataTypes.STRING,
      field: 'subject'
    },
    message: 
    {
      type: DataTypes.TEXT,
      field: 'message'
    }
  },
  {
      tableName: "email",
      classMethods: 
      {
        associate: function(models) {
          // associations can be defined here
          
        }
        
        
      }
  });
  return Email;
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