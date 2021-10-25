Template.signinModal.onRendered(function() {
  $('[data-toggle="tooltip"]').tooltip();
  Session.set('signInType', "email");
});

Template.signinModal.helpers({
  gamiright: function() {
    return Session.get('gamiright');
  }
});

Template.signinModal.events({
  'click .btnSignin': function(event) {
    event.preventDefault();
    //$("#container").toggleClass("hiddenContainer");
    Modal.show('signinModal');
  },
  'click .signUp': function(event) {
    event.preventDefault();
    container = document.getElementById('container_sign');
    container.classList.add("right-panel-active");
    //Session.set('userType', "student");
  },
  'click .signIn': function(event) {
    event.preventDefault();
    container = document.getElementById('container_sign');
    container.classList.remove("right-panel-active");
    //Session.set('userType', "teacher");
  },
  // 'click .btn-group-student-login .btn': function(event) {
  //   event.preventDefault();
  //   $(".btn-group-student-login .btn").toggleClass("btn-info");
  //   $(".studentLoginDiv").toggleClass("oculto");
  // },
 // 'submit .siginForm': function(e) {
 //      e.preventDefault();
 //      var user = e.target.userEmail.value;
 //      var password = e.target.userPassword.value;
 //      Meteor.loginWithPassword(user, password,function(error){
 //        if(error) {
 //          swal({
 //              title: TAPi18n.__('loginError'),
 //              text: error.reason,
 //              icon: "warning",
 //          });
 //        }else{
 //
 //          //Meteor.call('mcgLog', 'loginEmail -> ' + Meteor.userId());
 //          // Session.setPersistent('classId',Meteor.users.findOne({_id:Meteor.userId()}).classes[0]);
 //          // Session.setPersistent('className', classes.findOne({"_id" :Session.get('classId')}));
 //          Session.setPersistent('navItem', "Students");
 //          Session.setPersistent('sogBtn',"students");
 //          Session.setPersistent('golBtn',"grid");
 //          Session.set('studentSelected', false);
 //          Session.set('orderStudents', "XP");
 //          Session.set('invertOrder', "checked");
 //          if ( classes.findOne({_id:Session.get('classId'), evaluation: { $exists: true } } ) ){
 //            Session.setPersistent('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);
 //            backImg=classes.findOne({"_id": Session.get('classId')}).backImg;
 //            $("#fondo").css("background-image", "url("+backImg+")");
 //          }
 //          // if ( Session.get("loginType") == "studentLogin" ) {
 //          //   Session.setPersistent('userType','student');
 //          //   Router.go('studentsMainPage',{_id:Session.get('classId')});
 //          // } else if ( Session.get("loginType") == "parentLogin" ) {
 //          //   Session.setPersistent('userType','parent');
 //          //   Router.go('studentsMainPage',{_id:Session.get('classId')});
 //          // } else {
 //          //   Session.setPersistent('userType','teacher');
 //
 //            Router.go('classesPage');
 //          // }
 //        }
 //      });
 //      // Session.set('userType', "teacher");
 //      Modal.hide('signinModal');
 //   },
   'submit .siginForm': function(e) {
      e.preventDefault();
      signInType=Session.get('signInType');
      if ( signInType == "code" ) {
        var user = e.target.codeStudent.value;
        var password = e.target.aliasStudent.value;
        if ( user.indexOf("@") === -1 ) {
          user+="@myclassgame.tk";
        }
      } else {
        var user = e.target.userEmail.value;
        var password = e.target.userPassword.value;
      }
      Meteor.loginWithPassword(user, password,function(error){
        if(error) {
          swal({
              title: TAPi18n.__('loginError'),
              text: error.reason,
              icon: "warning",
          });
        }else{
          //Meteor.call('mcgLog', 'loginEmail -> ' + Meteor.userId());
          // Session.setPersistent('classId',Meteor.users.findOne({_id:Meteor.userId()}).classes[0]);
          // Session.setPersistent('className', classes.findOne({"_id" :Session.get('classId')}));
          Session.setPersistent('navItem', "Students");
          Session.setPersistent('sogBtn',"students");
          Session.setPersistent('golBtn',"grid");
          Session.set('studentSelected', false);
          //Session.set('orderStudents', "XP");
          //Session.set('invertOrder', "checked");

          // if ( classes.findOne({_id:Session.get('classId'), evaluation: { $exists: true } } ) ){
          //   Session.setPersistent('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);
          //   backImg=classes.findOne({"_id": Session.get('classId')}).backImg;
          //   $("#fondo").css("background-image", "url("+backImg+")");
          // }
          // if ( Session.get("loginType") == "studentLogin" ) {
          //   Session.setPersistent('userType','student');
          //   Router.go('studentsMainPage',{_id:Session.get('classId')});
          // } else if ( Session.get("loginType") == "parentLogin" ) {
          //   Session.setPersistent('userType','parent');
          //   Router.go('studentsMainPage',{_id:Session.get('classId')});
          // } else {
          //   Session.setPersistent('userType','teacher');
          Router.go('classesPage');
          // }
        }
      });
      // Session.set('userType', "student");
      Modal.hide('signinModal');
   },

   'click .googleSignin': function(e) {
      e.preventDefault();
      var SCOPES = "'https://www.googleapis.com/auth/drive.metadata.readonly','https://www.googleapis.com/auth/classroom.courses.readonly','https://www.googleapis.com/auth/classroom.rosters.readonly','https://www.googleapis.com/auth/classroom.profile.emails','https://www.googleapis.com/auth/classroom.coursework.students.readonly','https://www.googleapis.com/auth/classroom.coursework.students','https://www.googleapis.com/auth/classroom.topics.readonly'";
      Meteor.loginWithGoogle({requestPermissions:['https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/classroom.courses.readonly','https://www.googleapis.com/auth/classroom.rosters.readonly','https://www.googleapis.com/auth/classroom.profile.emails']},function(error){
      //Meteor.loginWithGoogle(redirect_uri="https://www.myclassgame.tk/_oauth/google",function(error){
          if(error) {
            swal({
                title: TAPi18n.__('loginError'),
                text: error,
                icon: "warning",
            });
          }else{
            //Meteor.call('mcgLog', 'loginGoogle -> ' + Meteor.userId());

            //Meteor.call('userTypeInsert', Session.get('userType'));
            Router.go('classesPage');
          }
      });
      //Session.set('userType', Session.get('userType'));
      Modal.hide('signinModal');
   },
   'click .resetPassword': function(e) {
      e.preventDefault();
      // if ( Session.get('userType') == "teacher" ) {
      //   var email = $("#emailTeacher").val();
      // } else {
      //   var email = $("#emailStudent").val();
      // }

      var email = $("#userEmail").val();
      if ( email.indexOf("@") === -1 ) {

        Accounts.forgotPassword({username: email}, function (e, r) {
            if (e) {
              swal({
                  title: TAPi18n.__('error'),
                  text: e.reason,
                  icon: "warning",
              });
            } else {
                swal({
                    title: TAPi18n.__('emailSended'),
                    text: TAPi18n.__('to') + " " + email,
                    icon: "info",
                });
            }
        });

      } else {
        Accounts.forgotPassword({email: email}, function (e, r) {
            if (e) {
              swal({
                  title: TAPi18n.__('error'),
                  text: e.reason,
                  icon: "warning",
              });
            } else {
                swal({
                    title: TAPi18n.__('emailSended'),
                    text: TAPi18n.__('to') + " " + email,
                    icon: "info",
                });
            }
        });
      }
      //Session.set('userType', "teacher");
      Modal.hide('signinModal');
   },
   'click .registerMCG': function(e) {
      e.preventDefault();
      var email = $("#newUserEmail").val();
      var password = $("#newUserPassword").val();
      var userType = $(".btn-group-student-login").find(".active").find("input").val();
      Session.set('userType', userType);
      if ( email.indexOf("@") === -1 ) {
        Accounts.createUser({username: email,password: password}, function (e, r) {
            if (e) {
                swal({
                    title: TAPi18n.__('resgisterError'),
                    text: e.reason,
                    icon: "warning",
                });
            } else {
                // success
                swal({
                    title: TAPi18n.__('resgisteredUser'),
                    text: TAPi18n.__('emailUserRegistered') + email,
                    icon: "info",
                });
                Meteor.call('userTypeInsert', Session.get('userType'));
            }
        });
      } else {
        Accounts.createUser({email: email,password: password}, function (e, r) {
            if (e) {
                swal({
                    title: TAPi18n.__('resgisterError'),
                    text: e.reason,
                    icon: "warning",
                });
            } else {
                // success
                swal({
                    title: TAPi18n.__('resgisteredUser'),
                    text: TAPi18n.__('emailUserRegistered') + email,
                    icon: "info",
                });
                Meteor.call('userTypeInsert', Session.get('userType'));
            }
        });
      }
      //Session.set('userType', "teacher");
      Modal.hide('signinModal');
   },
   'change .signInType input': function(e) {
      e.preventDefault();
      var signInType = $(".signInType").find(".active").find("input").val();
      Session.set('signInType', signInType);
      if ( signInType == "email" ) {
        $(".emailSignIn").removeClass("oculto");
        $(".codeSignIn").addClass("oculto");
      } else {
        $(".codeSignIn").removeClass("oculto");
        $(".emailSignIn").addClass("oculto");
      }
    }
});
