Template.randomCarousel.onRendered(function() {

});

Template.randomCarousel.helpers({
 students: function() {
   if ($("#todosR").hasClass("btn-warning")) {
     return students.find({classId: Session.get('classId')});
   } else {
     return students.find({classId: Session.get('classId'),'random':true});
   }
 },
 events: function() {
   if ($("#todosR").hasClass("btn-warning")) {
     return randomEvents.find({classId: Session.get('classId')});
   } else {
     return randomEvents.find({classId: Session.get('classId'),'random':true});
   }
 },
 cards: function() {
   if ($("#todosR").hasClass("btn-warning")) {
     return cards.find({classId: Session.get('classId')});
   } else {
     return cards.find({classId: Session.get('classId'),'random':true});
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
    var r = Math.floor(Math.random() * cells.length)+cells.length;
    for (var p=0;p<r;p++){
      selectedIndex++;
      onOrientationChange();
    }
  }
});
