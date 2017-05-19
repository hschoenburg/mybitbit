'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    queryInterface.addColumn('Debits', 'usd_fee_total', {
      type: Sequelize.INTEGER
    })

    queryInterface.addColumn('Debits', 'xlm_usd_fx', {
      type: Sequelize.INTEGER
    })

    queryInterface.addColumn('Debits', 'xlm_php_fx', {
      type: Sequelize.INTEGER
    })

    queryInterface.addColumn('Debits', 'usd_fee_total', {
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

    queryInterface.dropColumn('Debits', 'usd_fee_total', {
      type: Sequelize.INTEGER
    })

    queryInterface.dropColumn('Debits', 'xlm_usd_fx', {
      type: Sequelize.INTEGER
    })

    queryInterface.dropColumn('Debits', 'xlm_php_fx', {
      type: Sequelize.INTEGER
    })

    queryInterface.dropColumn('Debits', 'usd_fee_total', {
      type: Sequelize.INTEGER
    })

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
}
