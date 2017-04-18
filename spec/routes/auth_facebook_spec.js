var httpMocks = require('node-mocks-http')

var route = require('../../routes/auth')

// ok auth might be hard to test because we are using passport 
// instead of our own controller here.
//
// Lets blackbox passport and assume it wont break #fingers crossed
//
// See user_creator.create_from_facebook for the 'controller' logic

