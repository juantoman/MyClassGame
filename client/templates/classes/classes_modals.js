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
          CoinsRel: 1,
          XPsRel: 1,
          createdOn: new Date()
        };
        //Meteor.call('classInsert', classe);
        Meteor.call('classInsert', classe,function(error,data){
          if (error) {
            console.log(error);
          } else {
            Session.set('classId',data);
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
                  console.log(resp);
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
        });
        //Meteor.call('teacherInClass',Session.get("classId"));
      }
      var otherClassId= $("#class-name-other-teacher").val();
      if (otherClassId !=""){
        Meteor.call('otherTeacherInsert', otherClassId);
      }
    }
    Meteor.subscribe("classes");
    $('#add_class_modal').modal('hide');
    return false;
  },
  'click #GCli': function(event) {
    event.preventDefault();
    if (!Session.get('lc')) {
      var url = "https://classroom.googleapis.com/v1/courses";
      var myAccessToken=Meteor.user().services.google.accessToken;
      var params = {
         access_token: myAccessToken,
         teacherId: Meteor.user().services.google.email
      }

      HTTP.get(url,{params:params},function(error,resp){
        if (error) {
          console.log(error);
        } else {
          //console.log(resp);
          Session.set('lc',resp.data.courses);
          /*
          if (courses.length > 0) {
            for (i = 0; i < courses.length; i++) {
              var course = courses[i];
              url_students='https://classroom.googleapis.com/v1/courses/'+course.id+'/students';
              HTTP.get(url_students,{params:params},function(error,respS){
                if (error) {
                  console.log(error);
                } else {
                  console.log(respS);
                  Session.set('sc'+course.id,respS.data.students);
                }
              });
            }
          } else {
            appendPre('No courses found.');
          }*/
        }
      })
    }
  },
  'change #restoreBackupFile': function(event) {
    event.preventDefault();
    try {
        let files = event.target.files;
        if (!files.length) {
          swal({
            title: TAPi18n.__('noFile'),
            type: 'info'
          })
          return;
        }
        swal({
          title: TAPi18n.__('restore') + " " +  TAPi18n.__('class'),
          text: TAPi18n.__('areYouSure'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: TAPi18n.__('yes'),
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {
            let file = files[0];
            let reader = new FileReader();
            const self = this;
            reader.onload = (event) => {
              var result = JSON.parse(event.target.result);
              Meteor.call('classDelete',result.classId);
              _.each(result.classes, function(e) {
                Meteor.call('classInsert',e);
              });
              _.each(result.students, function(e) {
                Meteor.call('studentInsert',e);
              });
              _.each(result.images, function(e) {
                Meteor.call('imageInsert',e);
              });
              _.each(result.levels, function(e) {
                Meteor.call('levelInsert',e);
              });
              _.each(result.badges, function(e) {
                Meteor.call('badgeInsert',e);
              });
              _.each(result.groups, function(e) {
                Meteor.call('groupInsert',e);
              });
              _.each(result.store, function(e) {
                Meteor.call('itemInsert',e);
              });
              _.each(result.cards, function(e) {
                Meteor.call('cardInsert',e);
              });
              _.each(result.chromes, function(e) {
                Meteor.call('chromeInsert',e);
              });
              _.each(result.behaviours, function(e) {
                Meteor.call('behaviourInsert',e);
              });
              _.each(result.behavioursLog, function(e) {
                Meteor.call('behaviourLogInsert',e);
              });
              _.each(result.questions, function(e) {
                Meteor.call('questionInsert',e);
              });
              _.each(result.quizzes, function(e) {
                Meteor.call('quizInsert',e);
              });
              _.each(result.randomEvents, function(e) {
                Meteor.call('randomEventInsert',e);
              });
              _.each(result.convictions, function(e) {
                Meteor.call('convictionInsert',e);
              });
              _.each(result.quotes, function(e) {
                Meteor.call('quoteInsert',e);
              });
              _.each(result.challenges, function(e) {
                Meteor.call('chalInsert',e);
              });
              _.each(result.chalMissions, function(e) {
                Meteor.call('chalMissionInsert',e);
              });
              _.each(result.challengesXP, function(e) {
                Meteor.call('chalInsertXP',e);
              });
              _.each(result.diary, function(e) {
                Meteor.call('diaryInsert',e);
              });
              _.each(result.notebook, function(e) {
                Meteor.call('notebookInsert',e);
              });
              _.each(result.notebookWork, function(e) {
                Meteor.call('notebookWorkInsert',e);
              });
              _.each(result.chatClass, function(e) {
                Meteor.call('messageInsert',e);
              });
              _.each(result.chatStudentTeacher, function(e) {
                Meteor.call('messageSTInsert',e);
              });
              _.each(result.chatTeachers, function(e) {
                Meteor.call('messageTeacherInsert',e);
              });
              _.each(result.notifications, function(e) {
                Meteor.call('notificationInsert',e);
              });
              _.each(result.villains, function(e) {
                Meteor.call('villainInsert',e);
              });
              Meteor.subscribe("classes");
              Meteor.subscribe('images');
              $('#add_class_modal').modal('hide');
            };
            reader.readAsText(file);
            swal({
              title: TAPi18n.__('class') + " " +  TAPi18n.__('restored'),
              type: 'success'
            })
          // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
          }
        })
    } catch (err) {
        console.error(err);
    }
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
  },
  'click #deleteDemoClasses': function(event) {
    event.preventDefault();
    Meteor.call('deleteDemoClasses');
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
