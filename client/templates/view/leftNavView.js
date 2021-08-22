Template.leftNavView.helpers({

})

Template.leftNavView.events({
  'click #close-sidebar, mouseleave #sidebar': function(event) {
    $(".page-wrapper").removeClass("toggled");
  },
  'mouseover #show-sidebar, mouseover #show-sidebar-line, click #show-sidebar, click #show-sidebar-line': function(event) {
    $(".page-wrapper").addClass("toggled");
  },
  'click #gamification': function(event) {
    event.preventDefault();
    Router.go('gamification',{_id:Session.get('classId')});
  },
  'click .copyVisibleClass': function(event) {
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
  'click .clases': function(event) {
    event.preventDefault();
    Session.set('className', '');
    Session.set('studentSelected', false);
    Session.set('groupSelected', false);
    $("#fondo").css("background-image", "");
    Router.go('classesPage');
  }
})
