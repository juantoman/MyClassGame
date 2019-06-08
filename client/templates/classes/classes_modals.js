Template.classesModals.helpers({
  mensaje: function(){
    var userType=Session.get('userType');
    if ( userType == "teacher") {
      return "Nueva clase/proyecto";
    } else {
      return "Código de la clase"
    }
  },
  types: function() {
    var teacherId = Meteor.user();
    var userType=Session.get('userType');
    var tipos=mcgParameters.findOne().typeClasses;
    return classes.find({'_id': { "$in": tipos } });
  },
  classImage: function() {
    avatar=this.groupImg;
    if (avatar) {
      if (avatar.substring(0, 4)=="http") {
        return avatar;
      } else {
        return images.findOne({_id: avatar}).image_url;
      }
    } else {
      return "https://res.cloudinary.com/myclassgame/image/upload/v1543412151/proves/grupo.png";
    }
  }
});

Template.classesModals.events({
  'submit form': function(event) {
    userType=$(".active").get(1).id;
    Session.set('userType',userType);
    if ( userType == "teacher") {
      event.preventDefault();
      if (Session.get("gcId")=="") {
        cn=$(event.target).find('[name=class-name-teacher]').val();
      } else {
        cn=$.grep(Session.get('lc'), function(e){ return e.id == Session.get("gcId"); })[0].name;
      }
      if (cn!=""){
        var user = Meteor.user();
        var classe = {
          teacherId: user._id,
          className: cn,
          gcId: Session.get("gcId"),
          iniHP: 10,
          stored: false,
          groupImg: "https://res.cloudinary.com/myclassgame/image/upload/v1543412151/proves/grupo.png",
          studentImg:"https://res.cloudinary.com/myclassgame/image/upload/v1542963357/proves/luke.png",
          evaluation: 1,
          CoinXP: true,
          createdOn: new Date()
        };
        cId=Meteor.call('classInsert', classe);
        Meteor.call('teacherInClass',Session.get("classId"));
      }
      var otherClassId= $("#class-name-other-teacher").val();
      if (otherClassId !=""){
        Meteor.call('otherTeacherInsert', otherClassId);
      }
      if (Session.get("gcId")!="") {
          Session.get('sc'+Session.get("gcId")).forEach(function (gcStudent) {
          var student = {
            classId: Session.get('classId'),
            studentName: gcStudent.profile.name.fullName,
            alias: gcStudent.profile.name.givenName,
            email:gcStudent.profile.emailAddress,
            gcsId:gcStudent.userId,
            groupId: 0,
            XP: 0,
            HP: 10,
            level: 0,
            coins: 0,
            rs: 0,
            os: 0,
            ys: 0,
            ws: 0,
            bs: 0,
            gs: 0,
            badges: [],
            items: [],
            cards: [],
            powers: [],
            collection: [],
            selected: 0,
            conected: 0,
            createdOn: new Date()
          };
          Meteor.call('studentInsert', student);
        });  
      }
    } else {
      event.preventDefault();
      if ( userType == "student") {
        var classId= $("#class-name-student").val();
        Meteor.call('studentClassInsert', classId);
      } else {
        var classId= $(event.target).find('[name=class-name-parent]').val();
        Meteor.call('parentClassInsert', classId);
      }
    }
    Meteor.subscribe("classes");
    $('#add_class_modal').modal('hide');
    return false;
  }
});

Template.deleteClass.events({
  'submit form': function(event) {
    Meteor.call('classDelete', Session.get('classId'));
    Modal.hide('deleteClass');
    Session.set('classId', "");
    Session.set('className', '');
    Router.go("classesPage");
  }
});

Template.adminClass.events({
  'submit form': function(event) {
    //alert($(event.target).find('[name=class-name]').val());
    event.preventDefault();
    regla="^" + $(event.target).find('[name=class-name]').val();
    n=classes.find({"_id" : {'$regex' : regla }}).count();
    if (n==1){
      cId=classes.findOne({"_id" : {'$regex' : regla }})._id;
      cName=classes.findOne({"_id" : {'$regex' : regla }}).className;
      Session.set('classId', cId);
      Session.set('className', cName);
      Session.setPersistent('navItem', "Students");
      Session.setPersistent('sogBtn',"students");
      Session.setPersistent('golBtn',"grid");
      Session.set('studentSelected', false);
      Session.setPersistent('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);
    }
    Router.go("myNav",{_id:Session.get('classId')});
    Modal.hide('adminClass');
  }
});
