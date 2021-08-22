Template.layout.helpers({
  'routeView': function() {
    r=Router.current().route.getName();
    if (r=="view"  || r=="visibleClasses") {
      return true;
    } else {
      return false;
    }
  }
});
