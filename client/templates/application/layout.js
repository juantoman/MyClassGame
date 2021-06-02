Template.layout.helpers({
  'routeView': function() {
    r=Router.current().route.getName();
    if (r=="view") {
      return true;
    } else {
      return false;
    }
  }
});
