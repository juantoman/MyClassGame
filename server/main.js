import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email'

//Provar gmail-node

Meteor.startup(() => {
  process.env.MAIL_URL = 'smtp://apikey:'+process.env.API_SendGrid+'@smtp.sendgrid.net:587';
});

Accounts.config({
    loginExpirationInDays: 0.02
})

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