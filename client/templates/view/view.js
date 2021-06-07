Template.view.onRendered(function() {
  classId=location.pathname.substring(6);
  Session.set('classId',classId);
  if (classes.find({'_id':Session.get('classId')}).count()==0 || !classes.findOne({'_id':Session.get('classId')}).visibleClass  ) {
    if ( location.host == 'localhost:8000' ) {
      location.href = 'http://localhost:8000/';
    }
    if (location.origin == 'https://www.myclassgame.es') {
      location.href = 'https://www.myclassgame.es/';
    }
  }
})
