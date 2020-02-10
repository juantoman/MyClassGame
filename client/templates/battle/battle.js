var studentId1Battle='X6vu8aDFrGYinoXEd';

Template.battle.helpers({
  student1Battle: function() {
    return students.findOne({'_id': Session.get('studentId1Battle')});
  },
  student2Battle: function() {
    return students.findOne({'_id': Session.get('studentId2Battle')});
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
  }
});

Template.battle.events({
  'click .battleHeart': function(event) {
    event.preventDefault();
    //$(event.currentTarget).toggleClass('oculto');
    $(event.currentTarget).find('[data-fa-i2svg]').attr('data-icon','heart-broken');
    h1=$('.bat1').find('[data-icon=heart]').length;
    h2=$('.bat2').find('[data-icon=heart]').length;
    if ( h2 == 0 ) {
      swal({
        title: 'H1 GANA!!!',
        type: 'success'
      });
      $('.bat1 [data-icon=heart-broken]').attr('data-icon','heart');
      $('.bat2 [data-icon=heart-broken]').attr('data-icon','heart');
    } else if ( h1 == 0 ) {
      swal({
        title: 'H2 GANA!!!',
        type: 'success'
      });
      $('.bat1 [data-icon=heart-broken]').attr('data-icon','heart');
      $('.bat2 [data-icon=heart-broken]').attr('data-icon','heart');
    } else if (h1 == h2 ) {
      swal({
        title: "Vais empatados a " + h1 ,
        type: 'success'
      });
    } else if (h1 > h2) {
      swal({
        title: "H1 va ganando " + h1  + " a " + h2 ,
        type: 'success'
      });
    } else if (h1 < h2) {
      swal({
        title: "H2 va ganando " + h2  + " a " + h1 ,
        type: 'success'
      });
    }
  },
  /*'click .battle .card,.battle .card-turned': function(event) {*/
  'click .battle .card': function(event) {
    $(event.currentTarget).toggleClass('card card-turned');
    $(event.currentTarget).find('.card-inside').toggleClass('card-back card-front');
    $(event.currentTarget).find('.backlogocard').toggleClass('oculto');
  },
  'click #svsmBattle': function(event) {
    if ( students.find({'classId': Session.get('classId'),'random': true }).count() == 1 ) {
      Meteor.call('allRandomStudents',Session.get('classId'));
    }
    var e = students.find({classId: Session.get('classId'),'random':true}).fetch();
    var r = Math.floor(Math.random() * e.length);
    Session.set('studentId1Battle',e[r]._id);
    $('#card1Battle').click();
    if ( $('#card2Battle').hasClass('card-turned') ) {
      $('#card2Battle').toggleClass('card card-turned');
      $('#card2Battle').find('.card-inside').toggleClass('card-back card-front');
      $('#card2Battle').find('.backlogocard').toggleClass('oculto');
    }
  },
  'click #svssBattle': function(event) {
    if ( students.find({'classId': Session.get('classId'),'random': true }).count() == 1 ) {
      Meteor.call('allRandomStudents',Session.get('classId'));
    }
    var e1 = students.find({classId: Session.get('classId'),'random':true}).fetch();
    var r1 = Math.floor(Math.random() * e1.length);
    var e2 = students.find({classId: Session.get('classId'),'random':true}).fetch();
    var r2 = Math.floor(Math.random() * e2.length);
    Session.set('studentId1Battle',e1[r1]._id);
    Session.set('studentId2Battle',e2[r2]._id);
    $('#card1Battle').click();
    $('#card2Battle').click();
  }
});
