var app = require('./app')

var port_number = process.env.PORT || 3000;

app.listen(port_number, function(e) {
  console.log('Server listening on '+port_number)
});
