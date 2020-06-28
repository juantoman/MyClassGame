import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';

//Provar gmail-node

Meteor.startup(() => {

  API_SendGrid=mcgParameters.findOne({'_id':1}).API_SendGrid;
  //process.env.MAIL_URL = 'smtp://apikey:'+process.env.API_SendGrid+'@smtp.sendgrid.net:587';
  process.env.MAIL_URL = 'smtp://apikey:'+API_SendGrid+'@smtp.sendgrid.net:587';
  //Escribir en fichero local
  //fs = Npm.require('fs');
});
/*
Accounts.config({
    loginExpirationInDays: 0.02
})
*/
Accounts.emailTemplates.siteName = '@MyClassGame';

Accounts.emailTemplates.from = '@MyClassGame Admin <myclassgame@gmail.com>';

Accounts.emailTemplates.enrollAccount.subject = (user) => {
  return `Welcome to @MyClassGame, ${user.profile.name}`;
};

Accounts.emailTemplates.enrollAccount.text = (user, url) => {
  return 'You have been selected to participate in building a better future!'
    + ' To activate your account, simply click the link below:\n\n'
    + url;
};

Accounts.emailTemplates.resetPassword.from = () => {
  // Overrides the value set in `Accounts.emailTemplates.from` when resetting
  // passwords.
  return '@MyClassGame Admin <myclassgame@gmail.com>';
};
Accounts.emailTemplates.verifyEmail = {
   subject() {
      return "Activate your account now!";
   },
   text(user, url) {
      return `Hey ${user}! Verify your e-mail by following this link: ${url}`;
   }
};

Meteor.methods({
  mcgLog: function(texto) {
    //Log fichero local
    /*
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    fs.appendFile(process.env["PWD"] + '/myclassgame.log', dateTime + ' : ' + texto + '\n',
        function (err) {
            if (err) throw err;
              console.log('Done!');
        }
    );*/
  },
  createStudentUser: function(studentId,password,classId) {
    if ( ! students.findOne({ _id: studentId }).userCreated ) {
      var u=Accounts.createUser({email: studentId.substring(0,6)+'@myclassgame.tk',password: password});
      Meteor.users.update({ _id: u }, { $set: {userType: 'student', studentId: studentId} });
      Meteor.call('studentUserClassInsert', classId, u);
      var Id =  students.update({ _id: studentId }, { $set: {userCreated: true, userId:u} });
    }
  },
  deleteStudentUser: function(userId,studentId) {
    Meteor.users.remove({'_id':userId});
    var Id =  students.update({ _id: studentId }, { $set: {userCreated: false, userId:""} });
  },
  createParentUser: function(studentId,classId) {
    var u=Accounts.createUser({email: studentId.substring(0,6)+'@myclassgame.tk',password: studentId.substring(0,6)});
    Meteor.users.update({ _id: u }, { $set: {userType: 'student'} });
    Meteor.call('studentUserClassInsert', classId, u);
    var Id =  students.update({ _id: studentId }, { $set: {userCreated: true, userId:u} });
  },
  deleteParentUser: function(userId,studentId) {
    Meteor.users.remove({'_id':userId});
    var Id =  students.update({ _id: studentId }, { $set: {userCreated: false, userId:""} });
  },
  adminClass: function(hash) {
    return classes.findOne({"_id" : {'$regex' : hash }});
  }
});
