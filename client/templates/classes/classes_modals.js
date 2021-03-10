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
        cloudinary_url=images.findOne({_id: avatar}).image_url;
        cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_100,f_auto,dpr_auto/')
        return cloudinary_url;
      }
    } else {
      cloudinary_url="https://res.cloudinary.com/myclassgame/image/upload/v1543412151/proves/grupo.png";
      cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_100,f_auto,dpr_auto/')
      return cloudinary_url;
    }
  }
});

Template.classesModals.events({
  'submit form#add_class_form': function(event) {
    event.preventDefault();
    //userType=$(".active").get(1).id;
    //Session.set('userType',userType);
    if ( Session.get('userType') == "teacher") {
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
          groupImg: "https://avatars.dicebear.com/v2/jdenticon/"+cn+".svg",
          studentImg:"",
          evaluation: 1,
          CoinXP: true,
          createdOn: new Date()
        };
        cId=Meteor.call('classInsert', classe);
        //Meteor.call('teacherInClass',Session.get("classId"));
      }
      var otherClassId= $("#class-name-other-teacher").val();
      if (otherClassId !=""){
        Meteor.call('otherTeacherInsert', otherClassId);
      }
      if (Session.get("gcId")!="") {
        var url = 'https://classroom.googleapis.com/v1/courses/'+Session.get("gcId")+'/students';
        var myAccessToken=Meteor.user().services.google.accessToken;

        var params = {
           access_token: myAccessToken
        }

        HTTP.get(url,{params:params},function(error,resp){
          if (error) {
            //console.log(error);
          } else {
            //console.log(resp);
            resp.data.students.forEach(function (gcStudent) {
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
        });
      }
    }
    Meteor.subscribe("classes");
    $('#add_class_modal').modal('hide');
    return false;
  }
});

Template.newClassSFModal.events({
  'submit form#newClassSFForm': function(event) {
    event.preventDefault();
    var classId=$("#classIdInput").val();
    var studentId=$("#studentIdInput").val();
    // if (studentId) {
    //   Meteor.subscribe('allStudents');
    // }
    //alert(Session.get('userType'));
    if (  Session.get('userType') == "student") {
      Meteor.call('studentClassInsert', classId, studentId);
    } else {
      Meteor.call('parentClassInsert', classId, studentId);
    }
    Meteor.subscribe('classes');
    Meteor.subscribe('images');
    Modal.hide('newClassSFModal');
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
  'click #adminClassBtn': function(event) {
    //alert($(event.target).find('[name=class-name]').val());
    event.preventDefault();
    //regla="^" + $(event.target).find('[name=class-name]').val();
    regla="^" + $('#adminClassId').val();
    //Meteor.subscribe('classes','all');
    Meteor.call('adminClass', regla,function(error,data){
      if (error) {
        console.log(error);
      } else {
        Modal.hide('adminClass');
        Session.set('classId', data._id);
        Session.set('className', data.className);
        Session.setPersistent('navItem', "Students");
        Session.setPersistent('sogBtn',"students");
        Session.setPersistent('golBtn',"grid");
        Session.set('studentSelected', false);
        Session.setPersistent('evaluation',1);//classes.findOne({_id:Session.get('classId')}).evaluation);
        Router.go('myNav',{_id:Session.get('classId')});
      }
    });
    /*
    if (c){
      alert("Se ha encontrado la clase");
      //cId=classes.findOne({"_id" : {'$regex' : regla }})._id;
      cName="admin";//classes.findOne({"_id" : {'$regex' : regla }}).className;
      Session.set('classId', c._id);
      Session.set('className', cName);
      Session.setPersistent('navItem', "Students");
      Session.setPersistent('sogBtn',"students");
      Session.setPersistent('golBtn',"grid");
      Session.set('studentSelected', false);
      Session.setPersistent('evaluation',1);//classes.findOne({_id:Session.get('classId')}).evaluation);
      Modal.hide('adminClass');
      Router.go('myNav',{_id:Session.get('classId')});
    } else {
      alert("No se ha encontrado la clase");
    }*/
  },
  'click #deleteUsers': function(event) {
    event.preventDefault();
    Meteor.call('deleteUsers');
  },
  'click #deleteClasses': function(event) {
    event.preventDefault();
    Meteor.call('deleteClassesNotAlive');
  },
  'click #aliveFalse': function(event) {
    event.preventDefault();
    Meteor.call('aliveFalseUsers');
    Meteor.call('aliveFalseClasses');
  }
});

Template.userTypeModal.events({
  'submit .userTypeModalForm': function(event) {
    event.preventDefault();
    var userType = $(".btn-group-student-login").find(".active").find("input").val();
    Session.set('userType', userType);
    Meteor.call('userTypeInsert', Session.get('userType'));
    Modal.hide('userTypeModal');
  },
});
