Template.login.events({
    'submit .login-form': function(e) {
        e.preventDefault();
        var user = e.target.email.value;
        var password = e.target.password.value;
        if ( user.indexOf("@") === -1 ) {
          user+="@myclassgame.tk";
        }
        Meteor.loginWithPassword(user, password,function(error){
          if(error) {
              //do something if error occurred or
          }else{
            regla="^" + password;
            n=students.find({"_id" : {'$regex' : regla }}).count();
            if (n==1){
              cId=students.findOne({"_id" : {'$regex' : regla }}).classId;
              Session.setPersistent('classId', cId);
              Session.setPersistent('className', classes.findOne({"_id" :cId}));
              Session.setPersistent('navItem', "Students");
              Session.setPersistent('sogBtn',"students");
              Session.setPersistent('golBtn',"grid");
              Session.set('studentSelected', false);
              Session.setPersistent('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);
              backImg=classes.findOne({"_id": Session.get('classId')}).backImg;
              $("#fondo").css("background-image", "url("+backImg+")");
              Session.set('orderStudents', "XP");
              Session.set('invertOrder', "checked");
              Meteor.call('mcgLog', 'loginEmail -> ' + Meteor.userId());
              if ( Session.get("loginType") == "studentLogin" ) {
                Meteor.call('userTypeInsert', "student");
                Session.setPersistent('userType','student');
                Router.go('myNav',{_id:Session.get('classId')});
              } else if ( Session.get("loginType") == "parentLogin" ) {
                Meteor.call('userTypeInsert', "parent");
                Session.setPersistent('userType','parent');
                Router.go('myNav',{_id:Session.get('classId')});
              } else {
                Meteor.call('userTypeInsert', "teacher");
                Session.setPersistent('userType','teacher');
                Router.go('/');
              }
            }
          }
        });
     },
     'click .loginBtn': function(e) {
         e.preventDefault();
         Session.set("loginType",$(e.currentTarget).find("input").prop("id"));
         if ( Session.get("loginType")!= "teacherLogin") {
           $("#loginBtnTeacher").addClass("oculto");
         } else {
           $("#loginBtnTeacher").removeClass("oculto");
         }
      },
     'click #google': function(e) {
        e.preventDefault();
        Meteor.loginWithGoogle(redirect_uri="http://myclassgame.iestacio.com/_oauth/google",function(error){
            if(error) {
                //Router.go('/classesPage');
                //do something if error occurred or
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
                console.log(e.reason);
            } else {
                // success
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
                console.log(e.reason);
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
