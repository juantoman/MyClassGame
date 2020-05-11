Template.chatClass.onRendered(function() {
  /*
  var elmnt = document.querySelector('#mG9saZR5ZHrwmZLyEm');
  var observer = new IntersectionObserver(function(entries) {
    if(entries[0].isIntersecting === true)
      console.log('Element is fully visible in screen');
  }, { threshold: [1] });
  observer.observe(elmnt);*/
  const callback = (entries, observer) =>
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      Meteor.call('messageRead', entry.target.id);
      //entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
  const observer = new IntersectionObserver(callback, { root: document.querySelector('#messageContainer'), threshold: [1] });

  document.querySelectorAll('.messageNotRead').forEach(m => observer.observe(m));
})

Template.chatClass.helpers({
  image: function(avatar) {
    avatar=students.findOne({'userId': avatar}).avatar;
    avatarVisible=classes.findOne({ _id: Session.get('classId') }).avatarVisible;
    if ( avatar=="" || !avatar || (  Session.get('userType') != "teacher"  &&  !avatarVisible ) ) {
      if ( classes.findOne({_id: Session.get('classId')}).studentImg ) {
        if (classes.findOne({_id: Session.get('classId')}).studentImg.substring(0, 4)=="http") {
          return classes.findOne({_id: Session.get('classId')}).studentImg;
        } else {
          return images.findOne({_id: classes.findOne({_id: Session.get('classId')}).studentImg}).image_url;
        }
      } else {
        return "https://avatars.dicebear.com/v2/avataaars/"+this._id+".svg";
      }
    } else  {
      if (avatar.substring(0, 4)=="http") {
        return avatar;
      } else {
        return images.findOne({_id: avatar}).image_url;
      }
    }
  },
  avatar: function(id) {
    a=students.findOne({'userId': id}).avatar;
    if (a.substring(0, 4)=="http") {
      return a;
    } else {
      return images.findOne({'_id': a}).image_url;
    }
  },
  messages: function() {
    return chatClass.find({classId: Session.get('classId')});
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
  messageNotRead: function() {
    notRead=false;
    if (Session.get('userType')=="teacher") {
      if (! this.read && this.userId == Session.get('studentId') ) { notRead=true; }
    } else {
      if (! this.read && this.userIdWith == Session.get('studentId') ) { notRead=true; }
    }
    return notRead;
  },
  onlytime: function() {
    return moment(this.createdOn).format('hh:mm');
  },
  sentMessage: function() {
    if ( this.userId == Meteor.userId() ) {
      return true;
    } else {
      return false;
    }
  },
  teacher: function() {
    if (Meteor.user().userType == "teacher") {
     return true;
    } else {
     return false;
    };
  },
  userName: function() {
    return students.findOne({'userId':this.userId}).studentName;
  }
});

Template.chatClass.events({
  'submit form#chatClass': function(event) {
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
    elmnt = document.getElementById("chatClassContainer");
    elmnt.scrollTop = elmnt.scrollHeight;
  },
  'click .chatRemove': function(event) {
    event.preventDefault();
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
 'click #STChat': function(event) {
    event.preventDefault();
    var elmnt = document.getElementsByClassName("messageNotRead")[0];
    elmnt.scrollIntoView(false);
  }
})
