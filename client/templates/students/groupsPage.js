Template.groupsPage.helpers({
  groups: function() {
    if (classes.findOne({'_id': Session.get('classId')}).onlyMyStudent && Meteor.user().userType!="teacher") {
      try {
        emailUser=Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address;
      }
      catch(err) {
        emailUser=Meteor.users.findOne({_id: Meteor.userId()}).services.google.email;
      }
      try {
        currentGroup=students.findOne({'classId': Session.get('classId'),'email': emailUser}).groupId;
      }
      catch(err) {
        regla='^'+emailUser.substring(0,6);
        currentGroup=students.findOne({'_id':{'$regex' :regla}}).groupId;
      }
      return groups.find({_id: currentGroup});
    } else {
      return groups.find({classId: Session.get('classId')}, {sort: {createdOn: -1}});
    }
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
        cloudinary_url=images.findOne({_id: avatar}).image_url;
        cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
        return cloudinary_url;
      }
    } else {
      if ( classes.findOne({_id: Session.get('classId')}).groupImg ) {
        if (classes.findOne({_id: Session.get('classId')}).groupImg.substring(0, 4)=="http") {
          return classes.findOne({_id: Session.get('classId')}).groupImg;
        } else {
          cloudinary_url=images.findOne({_id: classes.findOne({_id: Session.get('classId')}).groupImg}).image_url;
          cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
          return cloudinary_url;
        }
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/v1543412151/proves/grupo.png";
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
    my="card__ice";
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
