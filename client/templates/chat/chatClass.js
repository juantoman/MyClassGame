Template.chatClass.helpers({
  messages: function() {
    return chatClass.find({classId: Session.get('classId')});
  },
  avatar: function(id) {
    a=students.findOne({'userId': id}).avatar;
    if (a.substring(0, 4)=="http") {
      return a;
    } else {
      return images.findOne({'_id': a}).image_url;
    }
  },
  alias: function() {
    if (Meteor.users.findOne({'_id':this.userId}).userType=="teacher") {
      a="Profe";
    } else {
      a=students.findOne({'userId': this.userId}).alias;
    }
    return a;
  },
  even: function (value) {
    return (value % 2) === 1;
  },
  teacherAvatar: function() {
    if (Meteor.users.findOne({'_id':this.userId}).userType=="teacher") {
     return true;
    } else {
     return false;
    };
  },
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
  }
});

Template.chatClass.events({
  'submit form': function(event) {
    event.preventDefault();
    //console.log($(event.target).find('[name=eventDescription]').val())
    var message = {
      classId: Session.get('classId'),
      userId: Meteor.userId(),
      message: $(event.target).find('[name=message]').val(),
      createdOn: new Date()
    };
    Meteor.call('messageInsert', message);
    $(event.target).find('[name=message]').val("");
  },
  'click .chatRemove': function(event) {
    swal({
      title: "¿Estás seguro de querer borrar este mensaje?",
      buttons: {
        NO: "No",
        SÍ: true,
      },
      icon: "warning"
    })
    .then((value) => {
      switch (value) {
        case "SÍ":
          Meteor.call('messageRemove', this._id);
          break;
      }
    })
  }
});
