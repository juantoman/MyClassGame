Template.dinamics.helpers({
  clase: function() {
    return classes.findOne({_id: Session.get('classId')});
  }
});

Template.dinamics.events({
  'click #dinamicsSave': function(event) {
    event.preventDefault();
    //console.log($(event.target).find('[name=eventDescription]').val())
    var dinamics = {
      d1:$("#d1").val(),
      d2:$("#d2").val(),
      d3:$("#d3").val(),
      d4:$("#d4").val(),
      d5:$("#d5").val(),
      d6:$("#d6").val(),
      d7:$("#d7").val(),
      d8:$("#d8").val(),
      d9:$("#d9").val()
    }
    Meteor.call('dinamicsUpdate', Session.get('classId'), dinamics);
  }
});
