import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';



Meteor.startup(() => {
  process.env.MAIL_URL = "smtp://postmaster%40sandboxf79701b64ce042faa189110d75ccb5b3.mailgun.org:4a85270dea1bfae09bae93ba79a0b0f5-f45b080f-e139242b@smtp.mailgun.org:587";
  //  "smtps://myclassgame%40gmail.com:mcgholita06@smtp.gmail.com:465";
});
/*
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
*/
