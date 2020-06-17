Template.signinModal.events({
  'click .btnSignin': function(event) {
    event.preventDefault();
    //$("#container").toggleClass("hiddenContainer");
    Modal.show('signinModal');
  },
  'click #signUp': function(event) {
    event.preventDefault();
    container = document.getElementById('container');
    container.classList.add("right-panel-active");
  },
  'click #signIn': function(event) {
    event.preventDefault();
    container = document.getElementById('container');
    container.classList.remove("right-panel-active");
  },
 'submit .login-form-email': function(e) {
      e.preventDefault();
      var user = e.target.emailTeacher.value;
      var password = e.target.passwordTeacher.value;
      Meteor.loginWithPassword(user, password,function(error){
        if(error) {
          swal({
              title: TAPi18n.__('loginError'),
              text: error.reason,
              icon: "warning",
          });
        }else{
          //Meteor.call('mcgLog', 'loginEmail -> ' + Meteor.userId());
          Session.setPersistent('classId',Meteor.users.findOne({_id:Meteor.userId()}).classes[0]);
          Session.setPersistent('className', classes.findOne({"_id" :Session.get('classId')}));
          Session.setPersistent('navItem', "Students");
          Session.setPersistent('sogBtn',"students");
          Session.setPersistent('golBtn',"grid");
          Session.set('studentSelected', false);
          Session.set('orderStudents', "XP");
          Session.set('invertOrder', "checked");
          if ( classes.findOne({_id:Session.get('classId'), evaluation: { $exists: true } } ) ){
            Session.setPersistent('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);
            backImg=classes.findOne({"_id": Session.get('classId')}).backImg;
            $("#fondo").css("background-image", "url("+backImg+")");
          }
          if ( Session.get("loginType") == "studentLogin" ) {
            Session.setPersistent('userType','student');
            Router.go('studentsMainPage',{_id:Session.get('classId')});
          } else if ( Session.get("loginType") == "parentLogin" ) {
            Session.setPersistent('userType','parent');
            Router.go('studentsMainPage',{_id:Session.get('classId')});
          } else {
            Session.setPersistent('userType','teacher');
            Router.go('classesPage');
          }
        }
      });
      Modal.hide('signinModal');
   },
   'submit .login-form-code': function(e) {
      e.preventDefault();
      var user = e.target.codeStudent.value;
      var password = e.target.aliasStudent.value;
      if ( user.indexOf("@") === -1 ) {
        user+="@myclassgame.tk";
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
          Session.setPersistent('classId',Meteor.users.findOne({_id:Meteor.userId()}).classes[0]);
          Session.setPersistent('className', classes.findOne({"_id" :Session.get('classId')}));
          Session.setPersistent('navItem', "Students");
          Session.setPersistent('sogBtn',"students");
          Session.setPersistent('golBtn',"grid");
          Session.set('studentSelected', false);
          Session.set('orderStudents', "XP");
          Session.set('invertOrder', "checked");
          if ( classes.findOne({_id:Session.get('classId'), evaluation: { $exists: true } } ) ){
            Session.setPersistent('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);
            backImg=classes.findOne({"_id": Session.get('classId')}).backImg;
            $("#fondo").css("background-image", "url("+backImg+")");
          }
          if ( Session.get("loginType") == "studentLogin" ) {
            Session.setPersistent('userType','student');
            Router.go('studentsMainPage',{_id:Session.get('classId')});
          } else if ( Session.get("loginType") == "parentLogin" ) {
            Session.setPersistent('userType','parent');
            Router.go('studentsMainPage',{_id:Session.get('classId')});
          } else {
            Session.setPersistent('userType','teacher');
            Router.go('classesPage');
          }
        }
      });
      Modal.hide('signinModal');
   },

   'click #google': function(e) {
      e.preventDefault();
      var SCOPES = "'https://www.googleapis.com/auth/drive.metadata.readonly','https://www.googleapis.com/auth/classroom.courses.readonly','https://www.googleapis.com/auth/classroom.rosters.readonly','https://www.googleapis.com/auth/classroom.profile.emails','https://www.googleapis.com/auth/classroom.coursework.students.readonly','https://www.googleapis.com/auth/classroom.coursework.students','https://www.googleapis.com/auth/classroom.topics.readonly'";
      Meteor.loginWithGoogle({requestPermissions:['https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/drive.metadata.readonly','https://www.googleapis.com/auth/classroom.courses.readonly','https://www.googleapis.com/auth/classroom.rosters.readonly','https://www.googleapis.com/auth/classroom.profile.emails','https://www.googleapis.com/auth/classroom.coursework.students.readonly','https://www.googleapis.com/auth/classroom.coursework.students','https://www.googleapis.com/auth/classroom.topics.readonly']},function(error){
          if(error) {
            swal({
                title: TAPi18n.__('loginError'),
                text: error,
                icon: "warning",
            });
          }else{
            //Meteor.call('mcgLog', 'loginGoogle -> ' + Meteor.userId());
            Router.go('classesPage');
          }
      });

      Modal.hide('signinModal');
   },
   'click #reset': function(e) {
      e.preventDefault();
      var email = $("#emailTeacher").val();
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
      Modal.hide('signinModal');
   },
   'click #register': function(e) {
      e.preventDefault();
      var email = $("#emailTeacher").val();
      var password = $("#passwordTeacher").val();
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
          }
      });
      Modal.hide('signinModal');
   }
});
