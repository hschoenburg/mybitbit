window.fbAsyncInit = function() {
    FB.init({
      appId            : '1754938408152723',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.9'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

window.onload = function(stuff) {

FB.ui(
{
  method: 'share',
  href: ' http://bitbit-staging.herokuapp.com/',
}, function(response){});
}
