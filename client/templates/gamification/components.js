Template.components.helpers({
  clase: function() {
    return classes.findOne({_id: Session.get('classId')});
  }
});

Template.components.events({
  'click #componentsSave': function(event) {
    event.preventDefault();
    //console.log($(event.target).find('[name=eventDescription]').val())
    var components = {
      c1:$("#c1").val(),
      c2:$("#c2").val(),
      c3:$("#c3").val(),
      c4:$("#c4").val(),
      c5:$("#c5").val(),
      c6:$("#c6").val(),
      c7:$("#c7").val(),
      c8:$("#c8").val(),
      c9:$("#c9").val()
    }
    Meteor.call('componentsUpdate', Session.get('classId'), components);
  }
});
