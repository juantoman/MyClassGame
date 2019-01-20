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
  gImage: function(image) {
    if (image) {
     return image;
    } else {
      if (classes.findOne({_id: Session.get('classId')}).groupImg) {
        return classes.findOne({_id: Session.get('classId')}).groupImg;
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
  }
});
Template.groupsPage.events({
  'click .btn-delete-group': function(event) {
    event.preventDefault();
    Session.set('groupId', event.target.name);
    Modal.show('deleteGroup');
  },
  'click .btn-xp': function(event) {
    if (Session.get('userType')=="teacher") {
      event.preventDefault();
      Session.setPersistent('groupId', event.target.name);
      Modal.show('groupXPModal');
    }
  },
  'click .btn-hp': function(event) {
    event.preventDefault();
    Session.setPersistent('groupId', event.target.name);
    Modal.show('groupHPModal');
  },
  'click .btnGroup': function(event) {
    event.preventDefault();
    Session.setPersistent('groupId', event.target.name);
    Modal.show('groupModal');
  },
  'click .fotog': function(event) {
    event.preventDefault();
    //alert(Meteor.users.findOne({_id: Meteor.userId()}).services.google.email);
    Session.setPersistent('groupId', event.target.name);
    Session.set('groupSelected', true);
  }
});