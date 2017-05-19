var fs        = require('fs');
var path      = require('path');
var basename  = path.basename(module.filename);
var creators  = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var name = file.split('_')[0]
    var creator = require(path.join(__dirname, file));
    creators[name] = creator;
  });


module.exports = creators;
