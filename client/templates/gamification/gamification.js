Template.gamification.events({
  'click #dessign': function(event) {
    event.preventDefault();
    Router.go('dessignTemplate',{_id:Session.get('classId')});
  },
  'click #myComponents': function(event) {
    event.preventDefault();
    Router.go('componentsTemplate',{_id:Session.get('classId')});
  },
  'click #adventure': function(event) {
    event.preventDefault();
    Router.go('adventure',{_id:Session.get('classId')});
  },
  'click #missions': function(event) {
    event.preventDefault();
    Router.go('missions',{_id:Session.get('classId')});
  }
})
