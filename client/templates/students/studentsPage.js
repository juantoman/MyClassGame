Template.studentsPage.onRendered(function() {
  $.getScript("https://apis.google.com/js/api.js");
  try {
    emailUser=Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address;
  }
  catch(err) {
    emailUser=Meteor.users.findOne({_id: Meteor.userId()}).services.google.email;
  }
  try {
    currentStudent=students.findOne({'classId': Session.get('classId'),'email': emailUser})._id;
  }
  catch(err) {
    regla='^'+emailUser.substring(0,6);
    currentStudent=students.findOne({'_id':{'$regex' :regla}})._id;
  }
  Session.set('currentStudent',currentStudent);
});

Template.studentsPage.helpers({
  students: function() {
    var sortOrder = {};
    if (Session.get('invertOrder')=="checked") {
      sortOrder[Session.get('orderStudents')]=-1;
    } else {
      sortOrder[Session.get('orderStudents')]=1;
    }
    sortOrder["_id"]=-1;
    if (classes.findOne({'_id': Session.get('classId')}).onlyMyStudent && Meteor.user().userType!="teacher") {
      emailUser=Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address.substring(0,6);
      regla='^'+emailUser;
      currentStudent=students.findOne({'_id':{'$regex' :regla}})._id;
      Session.setPersistent('studentId', currentStudent);
      Session.set('studentSelected', true);
      return students.find({'_id': currentStudent});
    } else {
      return students.find({'classId': Session.get('classId')}, {sort: sortOrder});
    }
  },
  image: function(avatar) {
    avatarVisible=classes.findOne({ _id: Session.get('classId') }).avatarVisible;
    if ( avatar=="" || !avatar || (  Session.get('userType') != "teacher"  &&  !avatarVisible ) ) {
      if ( classes.findOne({_id: Session.get('classId')}).studentImg ) {
        if (classes.findOne({_id: Session.get('classId')}).studentImg.substring(0, 4)=="http") {
          return classes.findOne({_id: Session.get('classId')}).studentImg;
        } else {
          return images.findOne({_id: classes.findOne({_id: Session.get('classId')}).studentImg}).image_url;
        }
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/v1542963357/proves/luke.png";
      }
    } else  {
      if (avatar.substring(0, 4)=="http") {
        return avatar;
      } else {
        return images.findOne({_id: avatar}).image_url;
      }
    }
  },
  medal: function() {
    try {
      f=students.findOne({'classId': Session.get('classId')},{sort:{'XP':-1}}).XP;
      s=students.findOne({'classId': Session.get('classId'),'XP':{$ne: f}}, {sort:{'XP':-1}}).XP;
      t=students.findOne({'classId': Session.get('classId'),'XP':{$nin: [ f, s ]}}, {sort:{'XP':-1}}).XP;
      switch (this.XP) {
        case f:
          return "medal-gold.png";
          break;
        case s:
          return "medal-silver.png";
          break;
        case t:
          return "medal-bronze.png";
          break;
        default:
          return "oculto";
          break;
      }
    }
    catch(err) {
      return "oculto";
    }
  },
  grid: function() {
    if ( Session.get('golBtn') == "grid" ) {
      return true;
    } else {
      return false;
    }
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
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
  },
  parent: function() {
    if (Session.get('userType')!="teacher") {
     return true;
    } else {
     return false;
    };
  },
  modalTeacher: function() {
    if (Session.get('userType')=="teacher") {
     //return "#mod_student_modal";
    } else {
     return "";
    }
  },
  myuser: function(emailStudent) {
    //alert("hola");
    try {
      emailUser=Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address;
    }
    catch(err) {
      emailUser=Meteor.users.findOne({_id: Meteor.userId()}).services.google.email;
    }
    if (emailUser.substring(0,6)==this._id.substring(0,6)) {
      return true;
    }
    if ( emailStudent.toUpperCase() == emailUser.toUpperCase() ) {
      return true;
    } else {
      return false;
    }
  },
  thumbSelected: function(id) {
    if ( parseInt(students.findOne({"_id": id}).selected) == 1 ) {
      return 'userSelected';
    } else {
      return 'userNotSelected';
    }
  },
  checkSelected: function(s) {
    if ( s ) {
      return 'checked';
    }
  },
  studentSelected: function(s) {
    if ( s ) {
      return 'studentSelected';
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
  levelDesc: function(id) {
    xpChecked=classes.findOne({_id: Session.get('classId')}).xpChangeLevel;
    if (xpChecked) {
      levelXP=classes.findOne({_id: Session.get('classId')}).levelXP;
      XP=students.findOne({_id: id}).XP;
      n=String(parseInt(XP/levelXP));
    } else {
      n=String(students.findOne({_id: id}).level);
    }
    desc=levels.findOne({classId: Session.get('classId'),level: n }).levelDescription;
    return desc;
  },
  messagesNotRead: function() {
    if (Meteor.user().userType=="teacher") {
      n=chatStudentTeacher.find({$and: [ { read: false } , { userId:this._id}, { userIdWith:Meteor.userId()} ] }).count();
    } else {
      n=chatStudentTeacher.find({$and: [ { read: false } , { userIdWith:this._id} ] }).count();
    }
    if (n>0) { return n; }
  }
});

Template.studentsPage.events({
  'click .btn-delete-student': function(event) {
    event.preventDefault();
    Session.set('studentId', event.target.name);
    Modal.show('deleteStudent');
  },
  'click .btn-xp': function(event) {
    event.preventDefault();
    if ($(event.target).closest('div').attr("id")){
      Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    } else {
      Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    }
    if ( Session.get('userType')=="teacher") {
      Modal.show('xpModal');
    }
    event.stopPropagation();
  },
  'click .btn-hp': function(event) {
    event.preventDefault();
    if ($(event.target).closest('div').attr("id")){
      Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    } else {
      Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    }
    if ( Session.get('userType')=="teacher") {
      Modal.show('hpModal');
    }
    event.stopPropagation();
  },
   'click .btn-cards': function(event) {
    event.preventDefault();
    if ($(event.target).closest('div').attr("id")){
      Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    } else {
      Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    }
    if ( Session.get('userType')=="teacher") {
      Modal.show('cardsModal');
    }
    event.stopPropagation();
  },
  'click .info-list': function(event) {
    event.preventDefault();
    Session.set('nXP',0);
    Session.set('nBg',0);
    Session.set('nMM',0);
    Session.set('nR',0);
    Session.set('nHP',0);
    Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    Session.set('studentSelected', true);
  },
  'click .btn-badge': function(event) {
    event.preventDefault();
    if ($(event.target).closest('div').attr("id")){
      Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    } else {
      Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    }
    if ( Session.get('userType')=="teacher") {
      Modal.show('badgeModal');
    }
    event.stopPropagation();
  },
  'click .btn-store': function(event) {
    event.preventDefault();
    if ($(event.target).closest('div').attr("id")){
      Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    } else {
      Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    }
    if ( Session.get('userType')=="teacher") {
      Modal.show('storeModal');
    }
    event.stopPropagation();
  },
  'click .foto,.info-grid,.card__image': function(event) {
    event.preventDefault();
    Session.set('nXP',0);
    Session.set('nBg',0);
    Session.set('nMM',0);
    Session.set('nR',0);
    Session.set('nHP',0);
    if (event.target.name!=""){
      Session.setPersistent('studentId', this._id);
      Session.set('studentSelected', true);
    }
    Meteor.call('mcgLog', 'selectStudent -> userId: ' + Meteor.userId() + ' , classId : ' + Session.get('classId') + ' , studentId : ' + Session.get('studentId'));
    //Router.go('studentPage',{_id:Session.get('studentId')});
    event.stopPropagation();
  },
  'click #drive': function(event) {
    loadPicker();
  },
  'click .btn-select,#selectedStudent,.thumbnailStudent': function(event) {
    event.preventDefault();
    Meteor.call('studentSelection', this._id);
  },
  'click .studentTeam': function(event) {
    event.preventDefault();
    students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
      Meteor.call('studentSelection', item["_id"]);
    });
    students.find( { $and: [ {groupId: this.groupId },{ classId: Session.get('classId')  } ] } ).forEach(function (item){
      Meteor.call('studentSelection', item["_id"]);
    });
    event.stopPropagation();
  },
});
