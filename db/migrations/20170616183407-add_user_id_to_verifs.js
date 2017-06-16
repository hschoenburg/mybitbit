'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    queryInterface.removeColumn('Verifs', 'recipient_id', {
      type: Sequelize.INTEGER
    })

    queryInterface.addColumn('Verifs', 'user_id', {
      type: Sequelize.INTEGER
    })

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {


    queryInterface.removeColumn('Verifs', 'user_id', {
      type: Sequelize.INTEGER
    })

    queryInterface.addColumn('Verifs', 'recipient_id', {
      type: Sequelize.INTEGER
    })

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
