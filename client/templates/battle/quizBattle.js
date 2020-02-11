Template.quizBattle.helpers({
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
  },
  nextQuestion: function() {
    return questions.findOne({'_id': Session.get('questionId')});
    //return questions.find({'classId': Session.get('classId')});
  },
  quizzes: function() {
    return quizzes.find({'classId': Session.get('classId')});
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
  },
  'click #nextQuestion': function(event) {
    Meteor.call('questionUsed', Session.get('questionId'));
    $('.cuestionAnswer').removeClass('correctAnswer');
    $('.question .photo').removeClass('answerSelected incorrectAnswer');
    $('.question .photo2').removeClass('answerSelected incorrectAnswer');
    $('.battleCorrectBtn .btn').toggleClass('oculto');
    var q = questions.find({quizId: Session.get('quizId'),'used':false}).fetch();
    var r = Math.floor(Math.random() * q.length);
    if (q.length ==0 ) {
      Session.set('questionId','');
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
  },
  'change #quizId': function(event) {
    event.preventDefault();
    Session.set('quizId',$('#quizId').val());
  }
})
