Template.header.onRendered(function() {
   accountsUIBootstrap3.setLanguage("es");
   TAPi18n.setLanguage("es");
});

Template.header.helpers({
  
});

Template.header.events({
  'change .tap-i18n-dropdown': function(event) {
    accountsUIBootstrap3.setLanguage(TAPi18n.getLanguage());
  }
});