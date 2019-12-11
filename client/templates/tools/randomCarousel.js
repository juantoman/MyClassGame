var selectedIndex = 0;

Template.randomCarousel.onRendered(function() {
  Session.set("randomElement","estudiante");
  $('.random_carousel').hide();
  Session.set("randomAll",false);
});

Template.randomCarousel.helpers({
 students: function() {
   if (Session.get("randomAll")) {
     return students.find({classId: Session.get('classId')});
   } else {
     return students.find({classId: Session.get('classId'),'random':true});
   }
 },
 events: function() {
   if (Session.get("randomAll")) {
     return randomEvents.find({classId: Session.get('classId')});
   } else {
     return randomEvents.find({classId: Session.get('classId'),'random':true});
   }
 },
 cards: function() {
   if (Session.get("randomAll")) {
     return cards.find({classId: Session.get('classId')});
   } else {
     return cards.find({classId: Session.get('classId'),'random':true});
   }
 },
 chromes: function() {
   if (Session.get("randomAll")) {
     return chromes.find({classId: Session.get('classId')});
   } else {
     return chromes.find({classId: Session.get('classId'),'random':true});
   }
 },
 groups: function() {
   if (Session.get("randomAll")) {
     return groups.find({classId: Session.get('classId')});
   } else {
     return groups.find({classId: Session.get('classId'),'random':true});
   }
 },
 convictions: function() {
   if (Session.get("randomAll")) {
     return convictions.find({classId: Session.get('classId')});
   } else {
     return convictions.find({classId: Session.get('classId'),'random':true});
   }
 },
 quotes: function() {
   if (Session.get("randomAll")) {
     return quotes.find({classId: Session.get('classId')});
   } else {
     return quotes.find({classId: Session.get('classId'),'random':true});
   }
 },
 element: function() {
   return Session.get("randomElement");
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
 equals: function(randomBtn) {
   if (randomBtn==Session.get("randomElement")) {
     return true;
   } else {
     return false;
   }
 }
});

Template.randomCarousel.events({
  'click .randomButton': function(event) {
    $('.random_carousel').show();
    var carousel = document.querySelector('.random_carousel');
    var cells = carousel.querySelectorAll('.carousel__cell');
    var cellCount; // cellCount set from cells-range input value

    var cellWidth = 410;
    var cellHeight = 240;
    var isHorizontal = true;
    var rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
    var radius, theta;
    var elementNumber;
    // console.log( cellWidth, cellHeight );

    function rotateCarousel() {
      var angle = theta * selectedIndex * -1;
      elementNumber=Math.abs(angle/360-parseInt(angle/360))*cells.length;
      carousel.style.transform = 'translateZ(' + -radius + 'px) ' +
        rotateFn + '(' + angle + 'deg)';
    }

    function changeCarousel() {
      //cellCount = cellsRange.value;
      cellCount = cells.length;
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
    /*
    var orientationRadios = document.querySelectorAll('input[name="orientation"]');
    ( function() {
      for ( var i=0; i < orientationRadios.length; i++ ) {
        var radio = orientationRadios[i];
        radio.addEventListener( 'change', onOrientationChange );
      }
    })();
    */
    function onOrientationChange() {
      //var checkedRadio = document.querySelector('input[name="orientation"]:checked');
      //isHorizontal = checkedRadio.value == 'horizontal';
      rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
      changeCarousel();
    }

    // set initials
    var r = Math.floor(Math.random() * cells.length+3*cells.length);
    var audio = new Audio('/sound/ruleta.mp3');
    audio.play();
    selectedIndex+=r;
    onOrientationChange();
    if (Session.get("randomElement")=="evento") {
      var delayInMilliseconds = 3000;
      setTimeout(function() {
        cells[elementNumber].getElementsByTagName('img')[0].click();
      }, delayInMilliseconds);
    }
  },
  'click .removeCarousel': function(event) {
    switch (Session.get("randomElement")) {
      case "estudiante":
        Meteor.call('noRandomStudent',this._id);
        if ( students.find({'classId': Session.get('classId'),'random': true }).count() == 1 ) {
          Meteor.call('allRandomStudents',Session.get('classId'));
        }
        break;
      case "evento":
        Meteor.call('noRandomEvent',this._id);
        if ( randomEvents.find({'classId': Session.get('classId'),'random': true }).count() == 1 ) {
          Meteor.call('allRandomEvents',Session.get('classId'));
        }
        break;
      case "carta":
        Meteor.call('noRandomCard',this._id);
        if ( cards.find({'classId': Session.get('classId'),'random': true }).count() == 1 ) {
          Meteor.call('allRandomCards',Session.get('classId'));
        }
        break;
      case "carta":
        Meteor.call('noRandomCard',this._id);
        if ( cards.find({'classId': Session.get('classId'),'random': true }).count() == 1 ) {
          Meteor.call('allRandomCards',Session.get('classId'));
        }
        break;
      case "cromo":
        Meteor.call('noRandomChrome',this._id);
        if ( chromes.find({'classId': Session.get('classId'),'random': true }).count() == 1 ) {
          Meteor.call('allRandomChromes',Session.get('classId'));
        }
        break;
      case "equipo":
        Meteor.call('noRandomGroup',this._id);
        if ( groups.find({'classId': Session.get('classId'),'random': true }).count() == 1 ) {
          Meteor.call('allRandomGroups',Session.get('classId'));
        }
        break;
      case "penalización":
        Meteor.call('noRandomConviction',this._id);
        if ( convictions.find({'classId': Session.get('classId'),'random': true }).count() == 1 ) {
          Meteor.call('allRandomConvictions',Session.get('classId'));
        }
        break;
      case "frase":
        Meteor.call('noRandomQuote',this._id);
        if ( quotes.find({'classId': Session.get('classId'),'random': true }).count() == 1 ) {
          Meteor.call('allRandomQuotes',Session.get('classId'));
        }
        break;
    }
    $('.randomButton').click();
  },
  'click img': function(event) {
    event.preventDefault();
    if (Session.get("randomElement")=="estudiante") {
      Session.setPersistent('studentId', this._id);
      Session.set('studentSelected', true);
      Session.setPersistent('sogBtn', "students");
      Session.set('groupSelected', false);
      $("#collapseStudents").removeClass("in");
      $(".nav-pills li").removeClass("active");
      $("#tools").removeClass("active");
      $("#studentsMain").addClass("active");
      $("#sM").addClass("active");
    }
    if (Session.get("randomElement")=="equipo") {
      Session.setPersistent('groupId', this._id);
      Session.set('groupSelected', true);
      Session.setPersistent('sogBtn', "groups");
      Session.set('studentSelected', false);
      $("#tools").removeClass("active");
      $(".nav-pills li").removeClass("active");
      $("#studentsMain").addClass("active");
      $("#sM").addClass("active");
      $("#collapseStudents").removeClass("in");
    }
    if (Session.get("randomElement")=="evento") {
      swal({
        title: this.eventName,
        text: this.eventDescription,
        imageUrl: event.target.src,
        imageWidth: 500,
        imageAlt: this.eventName,
        width: '80%'
      })
    }
  }
});
