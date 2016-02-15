'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
      field: 'type'
    },
    idBeneficiaire: 
    {
      type: DataTypes.INTEGER,
      field: 'IdAvtxBeneficiaire'
    },
    idDecideur: 
    {
      type: DataTypes.INTEGER,
      field: 'IdAvtxDecideur'
    },
    idAffilie: 
    {
      type: DataTypes.INTEGER,
      field: 'IdAvtxAffilie'
    }
  },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};