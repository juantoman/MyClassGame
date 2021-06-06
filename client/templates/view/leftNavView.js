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
  }
})
