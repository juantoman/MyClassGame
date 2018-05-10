Template.classesModals.helpers({
  mensaje: function(){
    var userType=Session.get('userType');
    if ( userType == "teacher") {
      return "Nueva clase";
    } else {
      return "Código de la clase"
    }
  }
});

Template.classesModals.events({
  'submit form': function(event) {
    var userType=Session.get('userType');
    if ( userType == "teacher") {
      event.preventDefault();
      var user = Meteor.user();
      var classe = {
        teacherId: user._id,
        className: $(event.target).find('[name=class-name]').val(),
        createdOn: new Date()
      };
      Meteor.call('classInsert', classe);
      $('#add_class_modal').modal('hide');
      return false;
    } else {
      event.preventDefault();
      var classId= $(event.target).find('[name=class-name]').val();
      Meteor.call('studentClassInsert', classId);
      $('#add_class_modal').modal('hide');
      return false;
    }
  }
});

Template.deleteClass.events({
  'submit form': function(event) {
    Meteor.call('classDelete', Session.get('classId'));
    Modal.hide('deleteClass');
  }
});

