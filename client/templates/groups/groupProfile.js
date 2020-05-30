Template.groupProfile.helpers({
  students: function() {
    return students.find( { $or: [ { groupId: Session.get('groupId') }, { $and: [ { groupId: 0 } , { classId: Session.get('classId')  } ] } ] } );
  },
  studentInGroup: function(studentId) {
    if ( Session.get('groupId') ==  students.findOne({_id: studentId}).groupId ) {
      return "list-group-item-danger";
    } else {
      return "noGroup";
    }
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
  selectLevels: function(){
    return levels.find({classId: Session.get('classId')});
  },
  levelSelected: function(l){
    if ( students.findOne({_id: Session.get('studentId')}).level == l ) {
      return "selected"
    } else {
      return "";
    }
  },
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
  },
  grupo: function() {
    if (this.groupId) {
      return groups.findOne({_id: this.groupId});
    } else {
      var group = {
        groupName:"Sin asignar"
      };
      return group;
    }
  },
  parent: function() {
    if (Session.get('userType')!="teacher") {
     return true;
    } else {
     return false;
    };
  }
})

Template.groupProfile.events({
  'submit form.dataStudent': function(event) {
    event.preventDefault();
    /*$('.list-group').find(".noGroup").each( function() {
      i=this._id;
      Meteor.call('studentGroup', 0, i);
    });
    $('.list-group').find(".list-group-item-danger").each( function() {
      i=this._id;
      Meteor.call('studentGroup', Session.get('groupId'), i);
    });*/
    gName=$("#gName").val();
    Meteor.call('groupModify', Session.get('groupId'), gName);
    //Modal.hide('groupModal');
  },
  'click .groupPhoto': function(event) {
    event.preventDefault();
    Session.set('imageType','group');
    Session.set('idElementImage',this._id);
    if (Session.get('userType')=="teacher") {
      Modal.show('imagesTemplate');
    }
  },
  'click .btn-warning': function(event) {
    event.preventDefault();
    Session.set('groupId',  this._id);
    Modal.show('deleteGroup');
  },
  'click button.list-group-item': function(event) {
    if (Session.get('userType')=="teacher") {
      event.preventDefault();

      if ($(event.currentTarget).hasClass("list-group-item-danger")){
        $(event.currentTarget).removeClass("list-group-item-danger");
        $(event.currentTarget).addClass("noGroup");
        Meteor.call('studentGroup', 0, this._id);
      } else {
        $(event.currentTarget).addClass("list-group-item-danger");
        $(event.currentTarget).removeClass("noGroup");
        Meteor.call('studentGroup', Session.get('groupId'), this._id);
      }
    }
  },
})
