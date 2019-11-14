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
                title: "¡Error de login!",
                text: error.reason,
                icon: "warning",
            });
          }else{
            Meteor.call('mcgLog', 'loginEmail -> ' + Meteor.userId());
            Session.setPersistent('classId',Meteor.users.findOne({_id:Meteor.userId()}).classes[0]);
            Session.setPersistent('className', classes.findOne({"_id" :Session.get('classId')}));
            Session.setPersistent('navItem', "Students");
            Session.setPersistent('sogBtn',"students");
            Session.setPersistent('golBtn',"grid");
            Session.set('studentSelected', false);
            Session.setPersistent('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);
            backImg=classes.findOne({"_id": Session.get('classId')}).backImg;
            $("#fondo").css("background-image", "url("+backImg+")");
            Session.set('orderStudents', "XP");
            Session.set('invertOrder', "checked");
            if ( Session.get("loginType") == "studentLogin" ) {
              Session.setPersistent('userType','student');
              Router.go('myNav',{_id:Session.get('classId')});
            } else if ( Session.get("loginType") == "parentLogin" ) {
              Session.setPersistent('userType','parent');
              Router.go('myNav',{_id:Session.get('classId')});
            } else {
              Session.setPersistent('userType','teacher');
              Router.go('/');
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
        Meteor.loginWithGoogle(redirect_uri="http://myclassgame.iestacio.com/_oauth/google",function(error){
            if(error) {
              swal({
                  title: "¡Error de login!",
                  text: error.reason,
                  icon: "warning",
              });
            }else{
              Meteor.call('mcgLog', 'loginGoogle -> ' + Meteor.userId());
              Router.go('/');
            }
        });
     },
     'click #reset': function(e) {
        e.preventDefault();
        var email = $("#email").val();
        Accounts.forgotPassword({email: email}, function (e, r) {
            if (e) {
              swal({
                  title: "¡Error!",
                  text: e.reason,
                  icon: "warning",
              });
            } else {
                swal({
                    title: "¡Correo de recuperación enviado!",
                    text: "Correo enviado a: "+ email,
                    icon: "info",
                });
            }
        });
     },
     'click #register': function(e) {
        e.preventDefault();
        var email = $("#email").val();
        var password = $("#password").val();
        if ( email.indexOf("@") === -1 ) {
          email+="@myclassgame.tk";
        }
        Accounts.createUser({email: email,password: password}, function (e, r) {
            if (e) {
                swal({
                    title: "¡Error de registro!",
                    text: e.reason,
                    icon: "warning",
                });
            } else {
                // success
                swal({
                    title: "¡Usuario registrado correctamente!",
                    text: "Se ha registrado el usuario "+ email,
                    icon: "info",
                });
            }
        });
     }
 });
