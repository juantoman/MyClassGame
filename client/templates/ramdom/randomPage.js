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
      case "equipo":
        var e = groups.find({classId: Session.get('classId')}).fetch();
        var r = Math.floor(Math.random() * e.length);
        t = e[r].groupName;
        break;
      case "penalización":
        var e = convictions.find({classId: Session.get('classId')}).fetch();
        var r = Math.floor(Math.random() * e.length);
        t = e[r].convictionDescription;
        break;
      case "frase":
        var e = quotes.find({classId: Session.get('classId')}).fetch();
        var r = Math.floor(Math.random() * e.length);
        t = e[r].quoteText;
        break;
    }


    $("#ModalHeader").text(randomElement);
    $("#ModalLabel").text(t);
    event.preventDefault();
    Session.setPersistent('navItem',event.target.parentNode.id);
  }
});
