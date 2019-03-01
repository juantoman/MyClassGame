Template.mechanics.helpers({
  clase: function() {
    return classes.findOne({_id: Session.get('classId')});
  }
});

Template.mechanics.events({
  'click #mechanicsSave': function(event) {
    event.preventDefault();
    //console.log($(event.target).find('[name=eventDescription]').val())
    var mechanics = {
      m1:$("#m1").val(),
      m2:$("#m2").val(),
      m3:$("#m3").val(),
      m4:$("#m4").val(),
      m5:$("#m5").val(),
      m6:$("#m6").val(),
      m7:$("#m7").val(),
      m8:$("#m8").val(),
      m9:$("#m9").val()
    }
    Meteor.call('mechanicsUpdate', Session.get('classId'), mechanics);
  }
});
