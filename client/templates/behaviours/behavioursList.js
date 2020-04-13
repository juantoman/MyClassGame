Template.behavioursList.helpers({
  behaviourList: function() {
    /*
    if (Session.get('behaviourButton') == "btn-positive")
    {
      positiveBehaviour=true;
    } else {
      positiveBehaviour=false;
    }*/
    return behaviours.find({classId: Session.get('classId')});
  }
  /*,
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
  }*/
});

Template.behavioursList.events({
  'submit form.createBehaviourForm': function(event) {
    event.preventDefault();
    /*
    if (Session.get('behaviourButton') == "btn-positive")
    {
      positiveBehaviour=true;
    } else {
      positiveBehaviour=false;
    }*/
    var behaviour = {
      classId: Session.get('classId'),
      behaviourName: $(event.target).find('[name=behaviourName]').val(),
      behaviourDescription: $(event.target).find('[name=behaviourDescription]').val(),
      positive: $(event.target).find('[name=XPorHP]').is(":checked"),
      behaviourType: $(event.target).find('[name=behaviourType]').val(),
      points: $(event.target).find('[name=behaviourPoints]').val(),
      createdOn: new Date()
    };
    Meteor.call('behaviourInsert', behaviour);
  },
  'submit form.behaviourForm': function(event) {
    event.preventDefault();
    /*
    if (Session.get('behaviourButton') == "btn-positive")
    {
      positiveBehaviour=true;
    } else {
      positiveBehaviour=false;
    }*/
    var behaviour = {
      behaviourName: $(event.target).find('[name=behaviourName]').val(),
      behaviourDescription: $(event.target).find('[name=behaviourDescription]').val(),
      positive: $(event.target).find('[name=XPorHP]').is(":checked"),
      behaviourType: $(event.target).find('[name=behaviourType]').val(),
      points: $(event.target).find('[name=behaviourPoints]').val()
    };
    Meteor.call('behaviourUpdate', this._id, behaviour);
  },
  'click .btnDeleteBehaviour': function(event) {
    event.preventDefault();
    Meteor.call('behaviourDelete',this._id);
  }
});
