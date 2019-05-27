Template.groupsPage.helpers({
  groups: function() {
    return groups.find({classId: Session.get('classId')}, {sort: {createdOn: -1}});
  },
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
  },
  gImage: function() {
    avatar=this.groupImg;
    if (avatar) {
      if (avatar.substring(0, 4)=="http" || avatar.substring(0, 4)=="data") {
        return avatar;
      } else {
        return images.findOne({_id: avatar}).image_url;
      }
    } else {
      if ( classes.findOne({_id: Session.get('classId')}).groupImg ) {
        if (classes.findOne({_id: Session.get('classId')}).groupImg.substring(0, 4)=="http") {
          return classes.findOne({_id: Session.get('classId')}).groupImg;
        } else {
          return images.findOne({_id: classes.findOne({_id: Session.get('classId')}).groupImg}).image_url;
        }
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/v1543412151/proves/grupo.png";
      }
    }
  },
  gXP: function(idG) {
    xp=0;
    n=students.find( { groupId:idG } ).count();
    students.find( { groupId:idG } ).forEach(function(s){ xp+=s.XP; });
    r=parseInt(xp/n);
    return r;
  },
  selected: function() {
    return Session.get('groupSelected');
  },
  myuser: function() {
    //alert("hola");
    my="card--ice";
    students.find( { 'groupId': this._id } ).forEach( function(u) {
        emailStudent="";
        if(u.email){emailStudent=u.email};
        if ( emailStudent.toUpperCase() == Session.get("emailUser").toUpperCase() ) {
          my="myuser";
        }
    });
    return my;
  }
});
Template.groupsPage.events({
  'click .btn-delete-group': function(event) {
    event.preventDefault();
    Session.set('groupId',  this._id);
    Modal.show('deleteGroup');
  },
  'click .btn-xp': function(event) {
    if (Session.get('userType')=="teacher") {
      event.preventDefault();
      Session.setPersistent('groupId',  this._id);
      Modal.show('groupXPModal');
    }
  },
  'click .btn-hp': function(event) {
    event.preventDefault();
    Session.setPersistent('groupId', this._id);
    Modal.show('groupHPModal');
  },
  'click .btnGroup': function(event) {
    event.preventDefault();
    Session.setPersistent('groupId',  this._id);
    Modal.show('groupModal');
  },
  'click .fotog, click .groupPhoto': function(event) {
    event.preventDefault();
    //alert(Meteor.users.findOne({_id: Meteor.userId()}).services.google.email);
    Session.setPersistent('groupId',  this._id);
    Session.set('groupSelected', true);
  }
});