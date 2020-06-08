var studentId1Battle='X6vu8aDFrGYinoXEd';

Template.battle.helpers({
  student1Battle: function() {
    return students.findOne({'_id': Session.get('studentId1Battle')});
  },
  student2Battle: function() {
    return students.findOne({'_id': Session.get('studentId2Battle')});
  },
  villainBattle: function() {
    return villains.findOne({'_id': Session.get('villainId')});
  },
  opponent: function(opponentType) {
    if (Session.get('opponent') == opponentType) {
      return true;
    } else {
      return false;
    }
  },
  image: function(avatar) {
    avatarVisible=classes.findOne({ _id: Session.get('classId') }).avatarVisible;
    if ( avatar=="" || !avatar || (  Session.get('userType') != "teacher"  &&  !avatarVisible ) ) {
      if ( classes.findOne({_id: Session.get('classId')}).studentImg ) {
        if (classes.findOne({_id: Session.get('classId')}).studentImg.substring(0, 4)=="http") {
          return classes.findOne({_id: Session.get('classId')}).studentImg;
        } else {
          cloudinary_url=images.findOne({_id: classes.findOne({_id: Session.get('classId')}).studentImg}).image_url;
          cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
          return cloudinary_url;
        }
      } else {
        return "https://avatars.dicebear.com/v2/avataaars/"+this._id+".svg";
      }
    } else  {
      if (avatar.substring(0, 4)=="http") {
        return avatar;
      } else {
        cloudinary_url=images.findOne({_id: avatar}).image_url;
        cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
        return cloudinary_url;
      }
    }
  },
  imageVillain: function() {
    if (this.villainImage.substring(0, 4)=="http") {
      return this.villainImage;
    } else {
      cloudinary_url=images.findOne({_id: this.villainImage}).image_url;
      cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
      return cloudinary_url;
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
        title: students.findOne({'_id': Session.get('studentId1Battle')}).studentName + TAPi18n.__('wins'),
        type: 'success'
      });
      $('.bat1 [data-icon=heart-broken]').attr('data-icon','heart');
      $('.bat2 [data-icon=heart-broken]').attr('data-icon','heart');
    } else if ( h1 == 0 ) {
      swal({
        title: students.findOne({'_id': Session.get('studentId2Battle')}).studentName + TAPi18n.__('wins'),
        type: 'success'
      });
      $('.bat1 [data-icon=heart-broken]').attr('data-icon','heart');
      $('.bat2 [data-icon=heart-broken]').attr('data-icon','heart');
    } else if (h1 == h2 ) {
      swal({
        title: TAPi18n.__('tied') + h1 ,
        type: 'success'
      });
    } else if (h1 > h2) {
      swal({
        title: students.findOne({'_id': Session.get('studentId1Battle')}).studentName + " " + TAPi18n.__('isWinning') + " " + h1  + " " + TAPi18n.__('to') + " " + h2 ,
        type: 'success'
      });
    } else if (h1 < h2) {
      swal({
        title: students.findOne({'_id': Session.get('studentId2Battle')}).studentName + " " + TAPi18n.__('isWinning') + " " + h2  + " " + TAPi18n.__('to') + " " + h1 ,
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
    /*$('.photo').find('img').removeClass('logoBattle');
    $('.photo2').find('img').addClass('logoBattle');*/
    $('.photo').find('.logoBattle').addClass('oculto');
    $('.photo').find('.photoFighter').removeClass('oculto');
    $('.photo2').find('.logoBattle').addClass('oculto');
    $('.photo2').find('.photoFighter').removeClass('oculto');
    //Elegir alumne aleatoriament
    if ( students.find({'classId': Session.get('classId'),'random': true }).count() <= 1 ) {
      Meteor.call('allRandomStudents',Session.get('classId'));
    }
    var e = students.find({classId: Session.get('classId'),'random':true}).fetch();
    var re = Math.floor(Math.random() * e.length);
    Session.set('studentId1Battle',e[re]._id);
    //Elegir malvat aleatoriament
    if ( villains.find({'classId': Session.get('classId'),'random': true }).count() <= 1 ) {
      Meteor.call('allRandomVillains',Session.get('classId'));
    }
    var v = villains.find({classId: Session.get('classId'),'random':true}).fetch();
    var rv = Math.floor(Math.random() * v.length);
    Session.set('villainId',v[rv]._id);
    //Session.set('studentId2Battle','');
    $('#card1Battle').click();
    $('#card2Battle').click();
    /*if ( $('#card2Battle').hasClass('card-turned') ) {
      $('#card2Battle').toggleClass('card card-turned');
      //$('.photo2').find('img').attr('src',"/images/@mcgnb.png");
      $('#card2Battle').find('.card-inside').toggleClass('card-back card-front');
      $('#card2Battle').find('.backlogocard').toggleClass('oculto');
    }*/
    $('.fighters').removeClass('oculto');
    $('.fighter2').addClass('oculto');
    Session.set('opponent','villain');
  },
  'click #svssBattle': function(event) {
    if ( students.find({'classId': Session.get('classId'),'random': true }).count() <= 1 ) {
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
    $('.photo').find('.logoBattle').addClass('oculto');
    $('.photo').find('.photoFighter').removeClass('oculto');
    $('.photo2').find('.logoBattle').addClass('oculto');
    $('.photo2').find('.photoFighter').removeClass('oculto');
    $('.fighters').removeClass('oculto');
    $('.fighter2').removeClass('oculto');
    Session.set('opponent','student');
  },
  'click #resetBattle': function(event) {
    $('#card1Battle').removeClass('card-turned');
    $('#card1Battle').addClass('card');
    $('#card1Battle').find('.card-inside').removeClass('card-front');
    $('#card1Battle').find('.card-inside').addClass('card-back');
    $('#card1Battle').find('.backlogocard').removeClass('oculto');
    $('#card2Battle').removeClass('card-turned');
    $('#card2Battle').addClass('card');
    $('#card2Battle').find('.card-inside').removeClass('card-front');
    $('#card2Battle').find('.card-inside').addClass('card-back');
    $('#card2Battle').find('.backlogocard').removeClass('oculto');
    //$('.photo').find('.imgAvatar').addClass('oculto');
    //$('.photo2').find('.imgAvatar').addClass('oculto');
    $('.photo').find('.logoBattle').removeClass('oculto');
    $('.photo').find('.photoFighter').addClass('oculto');
    $('.photo2').find('.logoBattle').removeClass('oculto');
    $('.photo2').find('.photoFighter').addClass('oculto');
    $('.fighters').addClass('oculto');
    $('.fighter2').addClass('oculto');
  }
});
