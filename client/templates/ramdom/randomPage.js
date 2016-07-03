Template.randomPage.events({
  'click a': function(event) {
    randomElement=event.target.id;
    switch (randomElement) {
      case "event":
        var e = randomEvents.find({classId: Session.get('classId')}).fetch();
        var r = Math.floor(Math.random() * e.length);
        t = e[r].eventDescription;
        break;
      case "student":
        var e = students.find({classId: Session.get('classId')}).fetch();
        var r = Math.floor(Math.random() * e.length);
        t = e[r].studentName;
        break;
      case "group":
        var e = groups.find({classId: Session.get('classId')}).fetch();
        var r = Math.floor(Math.random() * e.length);
        t = e[r].groupName;
        break;
    }


    $("#ModalHeader").text("Random "+randomElement);
    $("#ModalLabel").text(t);
    event.preventDefault();
    Session.setPersistent('navItem',event.target.parentNode.id);
  }
});
