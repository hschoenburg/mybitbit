var Sequelize = require('sequelize')

module.exports = function() {

  // create configured instance
    var sequelize = new Sequelize('bitbit', '', '', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
  })
  return sequelize;
}

