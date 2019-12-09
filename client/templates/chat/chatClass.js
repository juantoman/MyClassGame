Template.chatClass.onRendered(function() {

})

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
      title: 'Borrar mensaje',
      text: '¿Estás seguro de querer borrar este mensaje?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('messageRemove', this._id);
        swal({
          title: '¡Mensaje borrado!',
          type: 'success'
        })
      // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      }
    })
  },
  'click .control-label': function(event) {
    var elmnt = document.getElementsByClassName("lastMessageRead")[0];
    //elmnt.scrollIntoView(false);
    var observer = new IntersectionObserver(function(entries) {
    	if(entries[0].isIntersecting === true)
    		console.log('Element is fully visible in screen');
    }, { threshold: [1] });

    observer.observe(elmnt);
  },
  'click .chatContainer': function(event) {
    $(".chatContainer").removeClass("lastMessageRead");
    $(event.target).addClass("lastMessageRead");
  }
});
