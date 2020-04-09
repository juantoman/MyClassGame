Meteor.startup(function () {
  console.log(location);
  if ( location.host !== 'localhost:8000' ) {
    if (location.href !== 'https://www.myclassgame.tk/') {
        location.href = 'https://www.myclassgame.tk/';
    }
  }
});
