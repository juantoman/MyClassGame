jQuery.fn.extend({
    printElem: function() {
        var cloned = this.clone();
        var printSection = $('#printSection');
        if (printSection.length == 0) {
            printSection = $('<div id="printSection"></div>')
            $('body').append(printSection);
        }
        printSection.append(cloned);
        var toggleBody = $('body *:visible');
        toggleBody.hide();
        $('#printSection, #printSection *').show();
        window.print();
        printSection.remove();
        toggleBody.show();
    }
});

Template.studentsPrint.helpers({
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
  code: function() {
    return this._id.substring(0,6);
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
      return "myuser";
    }
    if ( emailStudent.toUpperCase() == emailUser.toUpperCase() ) {
      return "myuser";
    } else {
      return "";
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
  }
});

Template.studentsPrint.events({
  'click #btn-print': function(event) {
    $("#studentsPrintModal .modal-body").printElem();
    //window.print();
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('studentsPrint');
  }
});
