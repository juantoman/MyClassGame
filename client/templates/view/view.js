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
  $("#mainTab").css('background-image','url("'+images.findOne({_id: classes.findOne({_id: Session.get("classId")}).backImg}).image_url+'")');
  if ( classes.findOne({_id: Session.get("classId")}).backImg != "" ) {
    $("#mainTab").css('background-image','url("'+images.findOne({_id: classes.findOne({_id: Session.get("classId")}).backImg}).image_url+'")');
    $(".opacityDiv").addClass('opacityProfile');
   }
})

Template.view.events({
  'click .copyVisibleClassButton': function(event) {
    event.preventDefault();
    cId=Session.get('classId');
    var c = classes.findOne({'_id': cId});
    delete c._id;
    c.teacherId=Meteor.userId();
    c.className="Copia_" + c.className;
    c.iniHP=10;
    c.visibleClass=false;
    Meteor.call('classDuplicate',c,cId);
    swal({
      title: TAPi18n.__('duplicateClass'),
      type: 'success'
    });
    Session.set('className', '');
    Session.set('studentSelected', false);
    Session.set('groupSelected', false);
    $("#fondo").css("background-image", "");
    Router.go('classesPage');
  },
})
