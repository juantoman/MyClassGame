Template.randomPage.onRendered(function() {
  var carousel = document.querySelector('.random_carousel');
  var cells = carousel.querySelectorAll('.carousel__cell');
  var cellCount; // cellCount set from cells-range input value
  var selectedIndex = 0;
  var cellWidth = 210;
  var cellHeight = 140;
  var isHorizontal = true;
  var rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
  var radius, theta;
  // console.log( cellWidth, cellHeight );

  function rotateCarousel() {
    var angle = theta * selectedIndex * -1;
    carousel.style.transform = 'translateZ(' + -radius + 'px) ' +
      rotateFn + '(' + angle + 'deg)';
  }

  var prevButton = document.querySelector('.previous-button');
  prevButton.addEventListener( 'click', function() {
    selectedIndex--;
    rotateCarousel();
  });

  var nextButton = document.querySelector('.next-button');
  nextButton.addEventListener( 'click', function() {
    for (var p=0;p<10;p++){
      selectedIndex++;
      rotateCarousel();
    }
  });

  var cellsRange = document.querySelector('.cells-range');
  cellsRange.addEventListener( 'change', changeCarousel );
  cellsRange.addEventListener( 'input', changeCarousel );



  function changeCarousel() {
    //cellCount = cellsRange.value;
    cellCount = cells.length
    theta = 360 / cellCount;
    var cellSize = isHorizontal ? cellWidth : cellHeight;
    radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
    for ( var i=0; i < cells.length; i++ ) {
      var cell = cells[i];
      if ( i < cellCount ) {
        // visible cell
        cell.style.opacity = 1;
        var cellAngle = theta * i;
        cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
      } else {
        // hidden cell
        cell.style.opacity = 0;
        cell.style.transform = 'none';
      }
    }

    rotateCarousel();
  }

  var orientationRadios = document.querySelectorAll('input[name="orientation"]');
  ( function() {
    for ( var i=0; i < orientationRadios.length; i++ ) {
      var radio = orientationRadios[i];
      radio.addEventListener( 'change', onOrientationChange );
    }
  })();

  function onOrientationChange() {
    var checkedRadio = document.querySelector('input[name="orientation"]:checked');
    isHorizontal = checkedRadio.value == 'horizontal';
    rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
    changeCarousel();
  }

  // set initials
  onOrientationChange();
});

Template.randomPage.helpers({
 students: function() {
   return students.find({ classId: Session.get('classId') } );
 },
 image: function(avatar) {
   avatarVisible=classes.findOne({ _id: Session.get('classId') }).avatarVisible;
   if ( avatar=="" || !avatar || (  Session.get('userType') != "teacher"  &&  !avatarVisible ) ) {
     if ( classes.findOne({_id: Session.get('classId')}).studentImg ) {
       if (classes.findOne({_id: Session.get('classId')}).studentImg.substring(0, 4)=="http") {
         return classes.findOne({_id: Session.get('classId')}).studentImg;
       } else {
         return images.findOne({_id: classes.findOne({_id: Session.get('classId')}).studentImg}).image_url;
       }
     } else {
       return "https://res.cloudinary.com/myclassgame/image/upload/v1542963357/proves/luke.png";
     }
   } else  {
     if (avatar.substring(0, 4)=="http") {
       return avatar;
     } else {
       return images.findOne({_id: avatar}).image_url;
     }
   }
 },
});

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
        if ( randomEvents.find({'classId': Session.get('classId'),'random': true }).count() == 0 ) {
          Meteor.call('allRandomEvents',Session.get('classId'));
        }
        if ($("#todosR").hasClass("btn-warning")) {
          var e = randomEvents.find({classId: Session.get('classId')}).fetch();
        } else {
          var e = randomEvents.find({classId: Session.get('classId'),'random':true}).fetch();
        }
        var r = Math.floor(Math.random() * e.length);
        if (!$("#todosR").hasClass("btn-warning")) {
          Meteor.call('noRandomEvent',e[r]._id);
        }
        t = e[r].eventName;
        d = e[r].eventDescription;
        imageId=e[r].eventImage;
        if (imageId != undefined) {
          i=images.findOne({_id: imageId}).image_url;
        }
        break;
      case "carta":
        if ( cards.find({'classId': Session.get('classId'),'random': true }).count() == 0 ) {
          Meteor.call('allRandomCards',Session.get('classId'));
        }
        if ($("#todosR").hasClass("btn-warning")) {
          var e = cards.find({classId: Session.get('classId')}).fetch();
        } else {
          var e = cards.find({classId: Session.get('classId'),'random':true}).fetch();
        }
        var r = Math.floor(Math.random() * e.length);
        if (!$("#todosR").hasClass("btn-warning")) {
          Meteor.call('noRandomCard',e[r]._id);
        }
        t = e[r].cardName;
        d = e[r].cardDescription;
        imageId=e[r].cardImage;
        if (imageId != undefined) {
          i=images.findOne({_id: imageId}).image_url;
        }
        break;
      case "cromo":
        if ( chromes.find({'classId': Session.get('classId'),'random': true }).count() == 0 ) {
          Meteor.call('allRandomChromes',Session.get('classId'));
        }
        if ($("#todosR").hasClass("btn-warning")) {
          var e = chromes.find({classId: Session.get('classId')}).fetch();
        } else {
          var e = chromes.find({classId: Session.get('classId'),'random':true}).fetch();
        }
        var r = Math.floor(Math.random() * e.length);
        if (!$("#todosR").hasClass("btn-warning")) {
          Meteor.call('noRandomChrome',e[r]._id);
        }
        t = e[r].chromeName;
        d = e[r].chromeDescription;
        imageId=e[r].chromeImage;
        if (imageId != undefined) {
          i=images.findOne({_id: imageId}).image_url;
        }
        break;
      case "estudiante":
        if ( students.find({'classId': Session.get('classId'),'random': true }).count() == 0 ) {
          Meteor.call('allRandomStudents',Session.get('classId'));
        }
        if ($("#todosR").hasClass("btn-warning")) {
          var e = students.find({classId: Session.get('classId')}).fetch();
        } else {
          var e = students.find({classId: Session.get('classId'),'random':true}).fetch();
        }
        var r = Math.floor(Math.random() * e.length);
        if (!$("#todosR").hasClass("btn-warning")) {
          Meteor.call('noRandomStudent',e[r]._id);
        }
        t = e[r].studentName;
        i= e[r].avatar;
        id=e[r]._id;
        if (!i) {
          i=classes.findOne({_id:Session.get('classId')}).studentImg;
          if (!i) {
            i="https://res.cloudinary.com/myclassgame/image/upload/v1542963357/proves/luke.png"
          }
        }
        if (i.substring(0, 4)!="http") {
          i=images.findOne({_id: i}).image_url;
        }
        break;
      case "equipo":
        if ( groups.find({'classId': Session.get('classId'),'random': true }).count() == 0 ) {
          Meteor.call('allRandomGroups',Session.get('classId'));
        }
        if ($("#todosR").hasClass("btn-warning")) {
          var e = groups.find({classId: Session.get('classId')}).fetch();
        } else {
          var e = groups.find({classId: Session.get('classId'),'random':true}).fetch();
        }
        var r = Math.floor(Math.random() * e.length);
        if (!$("#todosR").hasClass("btn-warning")) {
          Meteor.call('noRandomGroup',e[r]._id);
        }
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
        if ( convictions.find({'classId': Session.get('classId'),'random': true }).count() == 0 ) {
          Meteor.call('allRandomConvictions',Session.get('classId'));
        }
        if ($("#todosR").hasClass("btn-warning")) {
          var e = convictions.find({classId: Session.get('classId')}).fetch();
        } else {
          var e = convictions.find({classId: Session.get('classId'),'random':true}).fetch();
        }
        var r = Math.floor(Math.random() * e.length);
        if (!$("#todosR").hasClass("btn-warning")) {
          Meteor.call('noRandomConviction',e[r]._id);
        }
        t = e[r].convictionDescription;
        i="";
        break;
      case "frase":
        if ( quotes.find({'classId': Session.get('classId'),'random': true }).count() == 0 ) {
          Meteor.call('allRandomQuotes',Session.get('classId'));
        }
        if ($("#todosR").hasClass("btn-warning")) {
          var e = quotes.find({classId: Session.get('classId')}).fetch();
        } else {
          var e = quotes.find({classId: Session.get('classId'),'random':true}).fetch();
        }
        var r = Math.floor(Math.random() * e.length);
        if (!$("#todosR").hasClass("btn-warning")) {
          Meteor.call('noRandomQuote',e[r]._id);
        }
        i="";
        t = e[r].quoteText;
        break;
      case "todosR":
        $(event.target).toggleClass("btn-warning");
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
