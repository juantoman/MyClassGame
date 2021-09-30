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
      // emailUser=Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address.substring(0,6);
      // regla='^'+emailUser;
      // currentStudent=students.findOne({'_id':{'$regex' :regla}})._id;
      currentStudent=students.findOne({'classId':Session.get('classId'),'userId':Meteor.userId()})._id;
      Session.setPersistent('studentId', currentStudent);
      Session.setPersistent('studentSelected', true);
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
          cloudinary_url=images.findOne({_id: classes.findOne({_id: Session.get('classId')}).studentImg}).image_url;
          cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/');
          return cloudinary_url;
        }
      } else {
        return "https://avatars.dicebear.com/v2/avataaars/"+this._id+".svg";
      }
    } else  {
      if (avatar.substring(0, 4)=="http") {
        return avatar;
      } else {
        cloudinary_url=images.findOne({_id: avatar}).image_url;
        cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
        return cloudinary_url;
      }
    }
  },
  medal: function() {
    try {
      if (classes.findOne({'_id': Session.get('classId')}).medalsVisible) {
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
      } else {
        return "oculto";
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
        groupName:"NA"
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
    }

    if (Meteor.userId()== this.userId) {
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
    na=students.findOne({_id: id}).level;
    if (xpChecked) {
      c=classes.findOne({_id: Session.get('classId')});
      levelXP=c.levelXP;
      levelXPRatio=c.levelXPRatio;
      XP=students.findOne({_id: id}).XP;
      if ( isNaN(levelXP) || levelXP =="" || levelXP == 0 ) {
        n=0;
      } else {
        n=parseInt((XP/levelXP-1)/levelXPRatio+1);
      }
      if ( na != n ) {
        Meteor.call('studentLevel', this._id, n);
      }
    } else {
      n=na;
    }
    return n;
  },
  levelDesc: function(id) {
    xpChecked=classes.findOne({_id: Session.get('classId')}).xpChangeLevel;
    if (xpChecked) {
      c=classes.findOne({_id: Session.get('classId')});
      levelXP=c.levelXP;
      levelXPRatio=c.levelXPRatio;
      XP=students.findOne({_id: id}).XP;
      n=String(parseInt((XP/levelXP-1)/levelXPRatio+1));
    } else {
      n=String(students.findOne({_id: id}).level);
    }
    desc=levels.findOne({classId: Session.get('classId'),level: n }).levelDescription;
    return desc;
  },
  messagesNotRead: function() {
    if (Meteor.user().userType=="teacher") {
      n=chatStudentTeacher.find( { 'read': false , 'userId': this._id , 'userIdWith': Meteor.userId() } ).count();
    } else {
      n=chatStudentTeacher.find({$and: [ { read: false } , { userIdWith:this._id} ] }).count();
    }
    if (n>0) { return n; }
  },
  hideAbsents: function() {
    return Session.get('hideAbsents');
  },
  studentUserId: function() {
    if (Meteor.userId()== this.userId) {
      return true;
    } else {
      return false;
    }
  },
  compressCard: function() {
    return Session.get("compressCard");
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
    Session.setPersistent('studentId', this._id);
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
    Session.setPersistent('studentId', this._id);
    if ( Session.get('userType')=="teacher") {
      Modal.show('hpModal');
    }
    event.stopPropagation();
  },
   'click .btn-cards': function(event) {
    event.preventDefault();
    // if ($(event.target).closest('div').attr("id")){
    //   Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    // } else {
    //   Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    // }
    Session.setPersistent('studentId', this._id);
    if ( Session.get('userType')=="teacher") {
      Modal.show('cardsModal');
    }
    event.stopPropagation();
  },
  'click .btn-chromes': function(event) {
   event.preventDefault();
   if( chromes.find({'classId': Session.get('classId')}).count() == 0 ) {
    Meteor.subscribe('chromes',"class",Session.get("classId"));
   }
   // if ($(event.target).closest('div').attr("id")){
   //   Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
   // } else {
   //   Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
   // }
   Session.setPersistent('studentId', this._id);
   if ( Session.get('userType')=="teacher") {
     Modal.show('chromesModal');
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
    Session.setPersistent('studentId', this._id);
    Session.set('studentSelected', true);
    event.stopPropagation();
  },
  'click .btn-badge': function(event) {
    event.preventDefault();
    // if ($(event.target).closest('div').attr("id")){
    //   Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    // } else {
    //   Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    // }
    Session.setPersistent('studentId', this._id);
    if ( Session.get('userType')=="teacher") {
      Modal.show('badgeModal');
    }
    event.stopPropagation();
  },
  'click .btn-store': function(event) {
    event.preventDefault();
    // if ($(event.target).closest('div').attr("id")){
    //   Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    // } else {
    //   Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    // }
    Session.setPersistent('studentId', this._id);
    if ( Session.get('userType')=="teacher") {
      Modal.show('storeModal');
    }
    event.stopPropagation();
  },
  'click .btn-coins': function(event) {
    event.preventDefault();
    // if ($(event.target).closest('div').attr("id")){
    //   Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    // } else {
    //   Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    // }
    Session.setPersistent('studentId', this._id);
    if ( Session.get('userType')=="teacher") {
      Modal.show('coinsModal');
    }
    event.stopPropagation();
  },
  'click .foto,.info-grid,.card__image,.card__name': function(event) {
    event.preventDefault();
    Session.set('nXP',0);
    Session.set('nBg',0);
    Session.set('nMM',0);
    Session.set('nR',0);
    Session.set('nHP',0);
    if (event.target.name!=""){
      Session.set('studentId', this._id);
      Session.set('studentSelected', true);

      emailUser="";

      if ( Meteor.users.find( { '_id': Meteor.userId(), 'emails' : { $exists: true } } ).count() > 0 ) {
        emailUser=Meteor.user().emails[0].address;
      }

      if ( Meteor.users.find( { '_id': Meteor.userId(), 'services.google.email' : { $exists: true } } ).count() > 0 ) {
        emailUser=Meteor.user().services.google.email;
      }

      if (emailUser.substring(0,6)==Session.get('studentId').substring(0,6)) {
        Session.set('IsMyUser', true);
      }

      myUserId=students.findOne({_id:Session.get('studentId')}).userId;

      if (Meteor.userId()==myUserId) {
        Session.set('IsMyUser', true);
      } else {
        Session.set('IsMyUser', false);
      }
    }
    //Meteor.call('mcgLog', 'selectStudent -> userId: ' + Meteor.userId() + ' , classId : ' + Session.get('classId') + ' , studentId : ' + Session.get('studentId'));
    //Router.go('studentPage',{_id:Session.get('studentId')});
    event.stopPropagation();
  },
  'click #drive': function(event) {
    loadPicker();
  },
  'click .btn-select,#selectedStudent,.thumbnailStudent,.user-card': function(event) {
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
  'click .studentPresent,.studentAbsent': function(event) {
    event.preventDefault();
    //$(event.currentTarget).toggleClass('studentPresent studentAbsent');
    Meteor.call('studentPresent', this._id);
    event.stopPropagation();
  }
});
