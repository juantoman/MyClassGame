Template.randomPage.events({
  'click a': function(event) {
    randomElement=event.target.id;
    $("#ModalHeader").text("RANDOM");
    $("#ModalLabel").text("");
    $("#ModalDesc").text("");
    $("#ModalImg").removeAttr("src");
    t="";
    d="";
    i="";
    switch (randomElement) {
      case "evento":
        var e = randomEvents.find({classId: Session.get('classId')}).fetch();
        var r = Math.floor(Math.random() * e.length);
        t = e[r].eventName;
        d = e[r].eventDescription;
        imageId=e[r].eventImage;
        if (imageId != undefined) {
          i=images.findOne({_id: imageId}).image_url;
        }
        break;
      case "carta":
        var e = cards.find({classId: Session.get('classId')}).fetch();
        var r = Math.floor(Math.random() * e.length);
        t = e[r].cardName;
        d = e[r].cardDescription;
        imageId=e[r].cardImage;
        if (imageId != undefined) {
          i=images.findOne({_id: imageId}).image_url;
        }
        break;
      case "estudiante":
        var e = students.find({classId: Session.get('classId')}).fetch();
        var r = Math.floor(Math.random() * e.length);
        t = e[r].studentName;
        i= e[r].avatar;
        break;
      case "equipo":
        var e = groups.find({classId: Session.get('classId')}).fetch();
        var r = Math.floor(Math.random() * e.length);
        t = e[r].groupName;
        i= e[r].groupImg;
        break;
      case "penalización":
        var e = convictions.find({classId: Session.get('classId')}).fetch();
        var r = Math.floor(Math.random() * e.length);
        t = e[r].convictionDescription;
        i="";
        break;
      case "frase":
        var e = quotes.find({classId: Session.get('classId')}).fetch();
        var r = Math.floor(Math.random() * e.length);
        i="";
        t = e[r].quoteText;
        break;
    }
    $("#ModalHeader").text(randomElement);
    $("#ModalLabel").text(t);
    $("#ModalDesc").text(d);
    $("#ModalImg").attr("src",i);
    event.preventDefault();
    Session.setPersistent('navItem',event.target.parentNode.id);
  }
});
