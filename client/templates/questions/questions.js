Template.questions.helpers({
  questions: function() {
    return questions.find({'classId': Session.get('classId'),'quizId':this._id});
  },
  quizzes: function() {
    return quizzes.find({'classId': Session.get('classId')},{sort: {order: 1}});
  },
  isTeacher: function() {
    if (Session.get('userType')=="teacher") {
      return true;
    } else {
      return false;
    };
  }
})

Template.questions.events({
  'click .quizCreateBtn': function(event) {
    event.preventDefault();
    var quiz = {
      classId: Session.get('classId'),
      quizName: $('#quizName').val(),
      createdOn: new Date()
    }
    $('#quizName').val('');
    Meteor.call('quizInsert',quiz);
  },
  'click .quizUpdateBtn': function(event) {
    event.preventDefault();
    Meteor.call('quizUpdate', this._id, $(event.currentTarget).prev().val());
  },
  'click .quizRemoveBtn': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('delete') + " " + TAPi18n.__('quiz'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('quizDelete', this._id);
        Meteor.call('questionsQuizDelete', this._id);
        swal({
          title: TAPi18n.__('quiz') + " " + TAPi18n.__('deleted'),
          type: 'success'
        })
        $("#myQuizzes").removeClass("oculto");
        $("#myQuiz").addClass("oculto");
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
  },
  'click .allQuizzes': function(event) {
    event.preventDefault();
    $("#myQuizzes").removeClass("oculto");
    $("#myQuiz").addClass("oculto");
  },
  'click .oneQuiz': function(event) {
    event.preventDefault();
    Session.set('quizId',this._id);
    $("#myQuizzes").addClass("oculto");
    $("#myQuiz").removeClass("oculto");
  }
});
