Template.conviction.events({
  'click a': function(event) {
    randomElement=event.target.id;
    var e = convictions.find({classId: Session.get('classId')}).fetch();
    var r = Math.floor(Math.random() * e.length);
    t = e[r].convictionDescription;
    $("#convictionLabel").text(t);
    event.preventDefault();
    //Session.setPersistent('navItem',event.target.parentNode.id);
  }
});
