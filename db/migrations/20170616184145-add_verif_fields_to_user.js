'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {


    queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING
    })


    queryInterface.addColumn('Users', 'phone_verified', {
      type: Sequelize.BOOLEAN
    })


    queryInterface.addColumn('Users', 'email_verified', {
      type: Sequelize.BOOLEAN
    })



    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
