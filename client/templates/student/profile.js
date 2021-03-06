Template.userProfile.helpers({
    image: function(avatar) {
    avatarVisible=classes.findOne({ _id: Session.get('classId') }).avatarVisible;
    if ( avatar=="" || !avatar || (  Session.get('userType') != "teacher"  &&  !avatarVisible ) ) {
      if ( classes.findOne({_id: Session.get('classId')}).studentImg ) {
        if (classes.findOne({_id: Session.get('classId')}).studentImg.substring(0, 4)=="http") {
          return classes.findOne({_id: Session.get('classId')}).studentImg;
        } else {
          cloudinary_url=images.findOne({_id: classes.findOne({_id: Session.get('classId')}).studentImg}).image_url;
          cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_100,f_auto,dpr_auto/')
          return cloudinary_url;
        }
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/q_auto,w_auto,h_60,f_auto,dpr_auto/v1542963357/proves/luke.png";
      }
    } else  {
      if (avatar.substring(0, 4)=="http") {
        return avatar;
      } else {
        cloudinary_url=images.findOne({_id: avatar}).image_url;
        cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_100,f_auto,dpr_auto/')
        return cloudinary_url;
      }
    }
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
  levelAutomatic: function(id) {
    xpChecked=classes.findOne({_id: Session.get('classId')}).xpChangeLevel;
    if (xpChecked) {
      levelXP=classes.findOne({_id: Session.get('classId')}).levelXP;
      XP=students.findOne({_id: id}).XP;
      n=parseInt(XP/levelXP);
    } else {
      n=students.findOne({_id: id}).level;
    }
    return n;
  },
  xpChangeLevel: function(id) {
    return classes.findOne({_id: Session.get('classId')}).xpChangeLevel;
  }
})

Template.userProfile.events({
  'submit form.dataStudent': function(event) {
    event.preventDefault();
    var user = Meteor.user();
    studentId=Session.get('studentId');
    studentName=$(event.target).find('[name=sName]').val();
    level=$(event.target).find('[name=sLevel]').val();
    alias=$(event.target).find('[name=sAlias]').val();
    avatar=$(event.target).find('[name=sAvatar]').val();
    email=$(event.target).find('[name=sEmail]').val();
    Meteor.call('studentModify',studentId,studentName,level,alias,avatar,email);
  }
})
