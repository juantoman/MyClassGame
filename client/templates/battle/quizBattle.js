Template.quizBattle.onRendered(function() {
  Session.set('quizId',$('#quizId').val());
});

Template.quizBattle.helpers({
  student1Battle: function() {
    return students.findOne({'_id': Session.get('studentId1Battle')});
  },
  student2Battle: function() {
    return students.findOne({'_id': Session.get('studentId2Battle')});
  },
  villainBattle: function() {
    return villains.findOne({'_id': Session.get('villainId')});
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
  nextQuestion: function() {
    return questions.findOne({'_id': Session.get('questionId')});
    //return questions.find({'classId': Session.get('classId')});
  },
  quizzes: function() {
    return quizzes.find({'classId': Session.get('classId')});
  },
  opponent: function(opponentType) {
    if (Session.get('opponent') == opponentType) {
      return true;
    } else {
      return false;
    }
  },
  imageVillain: function() {
    if (this.villainImage.substring(0, 4)=="http" || this.villainImage.substring(0, 1)=="/") {
      return this.villainImage;
    } else {
      cloudinary_url=images.findOne({_id: this.villainImage}).image_url;
      cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
      return cloudinary_url;
    }
  },
  fighter1Corrects: function() {
    return Session.get('fighter1Corrects');
  },
  fighter2Corrects: function() {
    return Session.get('fighter2Corrects');
  }
});

Template.quizBattle.events({
  'click .question .photo': function(event) {
    $('.question .photo').removeClass('answerSelected');
    $(event.currentTarget).toggleClass('answerSelected');
  },
  'click .question .photo2': function(event) {
    $('.question .photo2').removeClass('answerSelected');
    $(event.currentTarget).toggleClass('answerSelected');
  },
  'click #correctAnswer': function(event) {
    $('.cuestionAnswer').toggleClass('correctAnswer');
    $('.battleCorrectBtn .btn').toggleClass('oculto');
    $('.questionAnswer').parent().find('.answerSelected').toggleClass('incorrectAnswer');
    $('.cuestionAnswer').parent().find('.answerSelected').addClass('cAnswer');
    $('.cAnswer').each(function( index ) {
      if ( $( this ).hasClass('photo') ) {
        Session.set('fighter1Corrects',Session.get('fighter1Corrects')+1)
      }
      if ( $( this ).hasClass('photo2') ) {
        Session.set('fighter2Corrects',Session.get('fighter2Corrects')+1)
      }
    });
  },
  'click #nextQuestion': function(event) {
    Meteor.call('questionUsed', Session.get('questionId'));
    $('.cuestionAnswer').removeClass('correctAnswer');
    $('.question .photo').removeClass('answerSelected incorrectAnswer cAnswer');
    $('.question .photo2').removeClass('answerSelected incorrectAnswer cAnswer');
    $('.battleCorrectBtn .btn').toggleClass('oculto');
    var q = questions.find({quizId: Session.get('quizId'),'used':false}).fetch();
    var r = Math.floor(Math.random() * q.length);
    if (q.length ==0 ) {
      Session.set('questionId','');
      $('.battleParameters').toggleClass('oculto');
      $('.battleQuestions').toggleClass('oculto');
    } else {
      Session.set('questionId',q[r]._id);
    }

  },
  'click #startBattle': function(event) {
    event.preventDefault();
    Meteor.call('questionResetUsed');
    var q = questions.find({quizId: Session.get('quizId'),'used':false}).fetch();
    var r = Math.floor(Math.random() * q.length);
    Session.set('questionId',q[r]._id);
    $('.battleCorrectBtn #correctAnswer').removeClass('oculto');
    $('.battleCorrectBtn #nextQuestion').addClass('oculto');
    $('.battleParameters').toggleClass('oculto');
    $('.battleQuestions').toggleClass('oculto');
    Session.set('fighter1Corrects',0);
    Session.set('fighter2Corrects',0);
  },
  'change #quizId': function(event) {
    event.preventDefault();
    Session.set('quizId',$('#quizId').val());
  }
})
