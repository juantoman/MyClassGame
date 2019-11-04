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
              Meteor.call('mcgLog', 'loginEmail -> ' + Meteor.userId());
              Router.go('/');
            }
        });
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
