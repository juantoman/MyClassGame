Template.login.events({
    'submit .login-form': function(e) {
        e.preventDefault();
        var email = e.target.email.value;
        var password = e.target.password.value;
        Meteor.loginWithPassword(email, password,function(error){
            if(error) {
                //do something if error occurred or 
            }else{
               FlowRouter.go('/');
            }
        });
     },
     'click #google': function(e) {
        e.preventDefault();
        Meteor.loginWithGoogle(function(error){
            if(error) {
                //do something if error occurred or 
            }else{
               FlowRouter.go('/');
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
        Accounts.createUser({email: email,password: password}, function (e, r) {
            if (e) {
                console.log(e.reason);
            } else {
                // success
                swal({
                    title: "¡Usuario registrado correctamente!",
                    text: "Se ha registrado el uruario "+ email,
                    icon: "info",
                });
            }
        });
     }
 });