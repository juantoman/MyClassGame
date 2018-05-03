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
        return "/images/user_group_128.png";
      }
    }
  },
  gXP: function(idG) {
    xp=0;
    n=students.find( { groupId:idG } ).count();
    students.find( { groupId:idG } ).forEach(function(s){
      xp+=s.XP;
    });
    r=parseInt(xp/n);
    return r;
  }
});
Template.groupsPage.events({
  'click .btn-delete-group': function(event) {
    event.preventDefault();
    Session.set('groupId', event.target.name);
    Modal.show('deleteGroup');
  },
  'click .btn-xp': function(event) {
    event.preventDefault();
    Session.setPersistent('groupId', event.target.name);
    Modal.show('groupXPModal');
  },
  'click .btn-hp': function(event) {
    event.preventDefault();
    Session.setPersistent('groupId', event.target.name);
    Modal.show('groupHPModal');
  },
  'click .btn-primary': function(event) {
    event.preventDefault();
    Session.setPersistent('groupId', event.target.name);
    Modal.show('groupModal');
  }
});