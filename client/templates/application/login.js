Template.login.onRendered(function () {
  Session.set("loginType","teacherLogin");
});

Template.login.events({
    'submit .login-form': function(e) {
        e.preventDefault();
        if ( Session.get("loginType") == "teacherLogin") {
          var user = e.target.emailTeacher.value;
          var password = e.target.passwordTeacher.value;
        } else {
          var user = e.target.codeStudent.value;
          var password = e.target.aliasStudent.value;
        }
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
              Router.go('myNav',{_id:Session.get('classId')});
            } else if ( Session.get("loginType") == "parentLogin" ) {
              Session.setPersistent('userType','parent');
              Router.go('myNav',{_id:Session.get('classId')});
            } else {
              Session.setPersistent('userType','teacher');
              Router.go('classesPage');
            }
          }
        });
     },
     'click .loginBtn': function(e) {
         e.preventDefault();
         Session.set("loginType",$(e.currentTarget).find("input").prop("id"));
         if ( Session.get("loginType")!= "teacherLogin") {
           $(".loginTeacher").addClass("oculto");
           $(".loginNoTeacher").removeClass("oculto");
         } else {
           $(".loginTeacher").removeClass("oculto");
           $(".loginNoTeacher").addClass("oculto");
         }
      },
     'click #google': function(e) {
        e.preventDefault();
        Meteor.loginWithGoogle(redirect_uri="https://www.myclassgame.tk/_oauth/google",function(error){
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
     },
     'click #register': function(e) {
        e.preventDefault();
        var email = $("#emailTeacher").val();
        var password = $("#passwordTeacher").val();
        if ( email.indexOf("@") === -1 ) {
          email+="@myclassgame.tk";
        }
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
     }
 });
