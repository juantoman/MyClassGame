Template.tutorial.events({
  'click button': function(event) {
    event.preventDefault();
    Session.set('tutorial', false);
  }
});