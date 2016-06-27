Template.classesModals.events({
  'submit form': function(event) {
    event.preventDefault();
    var user = Meteor.user();
    var classe = {
      teacherId: user._id,
      className: $(event.target).find('[name=class-name]').val(),
      createdOn: new Date()
    };
    Meteor.call('classInsert', classe);
    return false;
  }
});
