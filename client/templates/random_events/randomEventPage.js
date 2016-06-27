Template.randomEventPage.helpers({
  
});

Template.randomEventPage.events({
  'click a': function(event) {
    var e = randomEvents.find({classId: Session.get('classId')}).fetch();
    var r = Math.floor(Math.random() * e.length);
    t = e[r].eventDescription;
    $("#ModalLabel").text(t);
    event.preventDefault();
    //event.target.parentNode.className="active";
    //Router.go(event.target.href)
    Session.setPersistent('navItem',event.target.parentNode.id);
  }
});
