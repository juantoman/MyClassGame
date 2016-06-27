Template.behavioursList.helpers({
  behaviourList: function() {
    if (Session.get('behaviourButton') == "btn-positive")
    {
      positiveBehaviour=true;
    } else {
      positiveBehaviour=false;
    }
    return behaviours.find({classId: Session.get('classId'), positive: positiveBehaviour });
  },
  btnSelected: function(positive) {
    if (Session.get('behaviourButton') == "btn-positive")
    {
      if (positive) {
        return "btn-success";
      } else {
        return "btn-default";
      }
      
    } else {
      if (positive) {
        return "btn-default";
      } else {
        return "btn-danger";
      }
    }
  },
  fGreen: function() {
    if (Session.get('behaviourButton') == "btn-positive")
    {
      return "has-success";
    } else {
      return "has-error"
    }
  },
  bGreen: function() {
    if (Session.get('behaviourButton') == "btn-positive")
    {
      return "btn-success";
    } else {
      return "btn-danger"
    }
  }
});

Template.behavioursList.events({
  'submit form': function(event) {
    event.preventDefault();
    if (Session.get('behaviourButton') == "btn-positive")
    {
      positiveBehaviour=true;
    } else {
      positiveBehaviour=false;
    }
    var behaviour = {
      classId: Session.get('classId'),
      behaviourDescription: $(event.target).find('[name=behaviourDescription]').val(),
      positive: positiveBehaviour,
      points: $(event.target).find('[name=behaviourPoints]').val(),
      createdOn: new Date()
    };
    Meteor.call('behaviourInsert', behaviour);
  },
  'change .inputGroup': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      if (event.target.id=="inputDesc")
      {
        Meteor.call('behaviourUpdateDesc', event.target.name, event.currentTarget.value);
      } else {
        Meteor.call('behaviourUpdatePoints', event.target.name, event.currentTarget.value);
      }  
    } else {
      Meteor.call('behaviourDelete',event.target.name);
    }
  },
  'click button': function(event) {
    //event.preventDefault();
    Session.setPersistent('behaviourButton', event.currentTarget.id);
    /*if (Session.get('behaviourButton') == "btn-positive")
    {
      $(".form-group").addClass("has-success").removeClass("has-error");
      $("#btn-save").removeClass("btn-danger").addClass("btn-success");
    } else {
      $(".form-group").removeClass("has-success").addClass("has-error");
      $("#btn-save").removeClass("btn-success").addClass("btn-danger");
    }*/
  }  
});