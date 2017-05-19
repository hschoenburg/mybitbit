

module.exports = function(app, models) {

// moving this to the user model as a function
  app.param('user_id', function(req, res, next, user_id) {

      if (Number.isInteger(Number(user_id))) {
        models.User.findById(user_id).then(function(user) {
          req.user = user;
          next();
        }).catch(function(err) { throw err; })

      } else {
        res.send('Problem finding user')
      }
  })

        // typically we might sanity check that user_id is of the right format
      //   UserDatabase.find(user_id, function(err, user) {
      //       if (err) return next(err);
      //           if (!user) return next(...create a 404 error...);
      //            
      //                req.user = user;
      //                    next()
      //                      });
      //                      });'

}

