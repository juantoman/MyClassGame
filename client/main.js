$.getScript("https://cdn.tiny.cloud/1/uxh471978q9jgw7y107j4cuzopr9tsqh5ytfj1ajjhywc89m/tinymce/5/tinymce.min.js");
//$.getScript("https://cdn.tiny.cloud/1/uxh471978q9jgw7y107j4cuzopr9tsqh5ytfj1ajjhywc89m/tinymce/5/jquery.tinymce.min.js");
Meteor.startup(function () {
  //$.getScript("https://cdn.tiny.cloud/1/uxh471978q9jgw7y107j4cuzopr9tsqh5ytfj1ajjhywc89m/tinymce/5/tinymce.min.js");
  console.log(location);
  if ( location.host !== 'localhost:8000' ) {
    if (location.href !== 'https://www.myclassgame.tk/') {
        //location.href = 'https://www.myclassgame.tk/';
        // loc=location.href;
        // if (loc.includes('myclassgame.tk')) {
        //     location.href = 'https://www.myclassgame.tk/';
        // }
        // if (loc.includes('mcgdeploy.tk')) {
        //     location.href = 'https://www.mcgdeploy.tk/';
        // }
    }
  }
});
