Template.randomPage.events({
  'click a': function(event) {
    randomElement=event.target.id;
    switch (randomElement) {
      case "evento":
        var e = randomEvents.find({classId: Session.get('classId')}).fetch();
        var r = Math.floor(Math.random() * e.length);
        t = e[r].eventDescription;
        break;
      case "estudiante":
        var e = students.find({classId: Session.get('classId')}).fetch();
        var r = Math.floor(Math.random() * e.length);
        t = e[r].studentName;
        break;
      case "grupo":
        var e = groups.find({classId: Session.get('classId')}).fetch();
        var r = Math.floor(Math.random() * e.length);
        t = e[r].groupName;
        break;
      case "castigo":
        var e = convictions.find({classId: Session.get('classId')}).fetch();
        var r = Math.floor(Math.random() * e.length);
        t = e[r].convictionDescription;
        break;
    }


    $("#ModalHeader").text(randomElement + " aleatorio");
    $("#ModalLabel").text(t);
    event.preventDefault();
    Session.setPersistent('navItem',event.target.parentNode.id);
  }
});
