Template.storytelling.helpers({
  clase: function() {
    return classes.findOne({_id: Session.get('classId')});
  }
});

Template.storytelling.events({
  'click #storySave': function(event) {
    event.preventDefault();
    //console.log($(event.target).find('[name=eventDescription]').val())
    var story = {
      n1:$("#n1").val(),
      n2:$("#n2").val(),
      n3:$("#n3").val(),
      n4:$("#n4").val(),
      n5:$("#n5").val(),
      n6:$("#n6").val(),
      n7:$("#n7").val(),
      n8:$("#n8").val(),
      n9:$("#n9").val(),
      n10:$("#n10").val(),
      n11:$("#n11").val(),
      n12:$("#n12").val()
    }
    Meteor.call('storyUpdate', Session.get('classId'), story);
  }
});
