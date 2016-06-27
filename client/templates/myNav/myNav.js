Template.myNav.helpers({
  n(m) {
    var navSelected = Session.get('navItem');
    if ( m == navSelected ) {
      return "active";
    }else{
      return "";
    }
  }
});
Template.myNav.events({
  'click a': function(event) {
    event.preventDefault();
    //event.target.parentNode.className="active";
    Router.go(event.target.href)
    Session.setPersistent('navItem',event.target.parentNode.id);
  }
});
