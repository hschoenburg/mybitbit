
$(document).ready(function() {
  console.log("hey whats up")

  hello.init({
    facebook: "1754938408152723"
    }, {
    redirect_uri: 'http://localhost:3000'
  })

  $('#fb-login').click(function(e) {
    e.preventDefault();
    console.log('whoah');
    hello('facebook').login()

  })

  hello.on('auth.login', function(auth) {
    hello(auth.network).api('me').then(function(profile) {
      profile.facebook_id = profile.id
      profile.token = auth.authResponse.access_token
      console.log(profile)
      request
        .post('/auth/facebook')
        .set('Accept', 'application/json')
        .send({
          profile: profile
        })
        .end(function(err, res) {
          console.log(res);

        })
    })

  })
})

