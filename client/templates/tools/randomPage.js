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
    id="";
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
        id=e[r]._id;
        if (!i) {
          i=classes.findOne({_id:Session.get('classId')}).studentImg;
        }
        if (i.substring(0, 4)!="http") {
          i=images.findOne({_id: i}).image_url;
        }
        break;
      case "equipo":
        var e = groups.find({classId: Session.get('classId')}).fetch();
        var r = Math.floor(Math.random() * e.length);
        t = e[r].groupName;
        i= e[r].groupImg;
        id=e[r]._id;
        if (!i) {
          i=classes.findOne({_id:Session.get('classId')}).groupImg;
        }
        if (i.substring(0, 4)!="http") {
          i=images.findOne({_id: i}).image_url;
        }
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
    $("#ModalImg").attr("title",id);
    event.preventDefault();
    Session.setPersistent('navItem',event.target.parentNode.id);
  },
  'click #ModalImg': function(event) {
    event.preventDefault();
    if ($("#ModalHeader").text()=="estudiante") {
      Session.setPersistent('studentId', $("#ModalImg").attr("title"));
      Session.set('studentSelected', true);
      Session.set('studentSelected', true);
      Session.setPersistent('sogBtn', "students");
      Session.set('groupSelected', false);
      //$(".tab-pane").removeClass("active");
      $("#studentsMain").addClass("active");
      $(".nav-pills li").removeClass("active");
      $("#sM").addClass("active");
      $("#collapseStudents").removeClass("in");
      $("#collapseStudents").removeClass("in");
      $('#randomModal').modal('hide');
    }
    if ($("#ModalHeader").text()=="equipo") {
      Session.setPersistent('groupId', $("#ModalImg").attr("title"));
      Session.set('groupSelected', true);
      Session.setPersistent('sogBtn', "groups");
      Session.set('studentSelected', false);
      //$(".tab-pane").removeClass("active");
      $(".nav-pills li").removeClass("active");
      $("#studentsMain").addClass("active");
      $("#sM").addClass("active");
      $("#collapseStudents").removeClass("in");
      $('#randomModal').modal('hide');
    }
    $('#randomModal').modal('hide');
  }
});
