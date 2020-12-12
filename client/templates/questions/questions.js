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
  'click .answerBtn': function(event) {
    $(event.currentTarget).toggleClass("answerSelected");
  },
  'submit .newQuestionForm': function(event) {
    event.preventDefault();
    var desc=$(event.currentTarget .questionDescription).val();
    var answers=[];
    $(event.currentTarget .answer).each(function(i,a){
      var answer = {
        answer: $(a).val(),
        correct: $(a).prev().hasClass('answerSelected')
      };
      answers.push(answer);
    })
    var question = {
      classId: Session.get('classId'),
      quizId: this._id,
      question: desc,
      answers: answers,
      used: false,
      createdOn: new Date()
    };
    Meteor.call('questionInsert', question);
  },
  'submit .questionForm': function(event) {
    event.preventDefault();
    var question=$(event.currentTarget .questionDescription).val();
    var answers=[];
    $(event.currentTarget .answer).each(function(i,a){
      var answer = {
        answer: $(a).val(),
        correct: $(a).prev().hasClass('answerSelected')
      };
      answers.push(answer);
    })
    Meteor.call('questionUpdate', this._id, question, answers);
  },
  'click .deleteQuestionBtn': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('delete') + " " + TAPi18n.__('question'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('questionDelete', this._id);
        swal({
          title: TAPi18n.__('question') + " " + TAPi18n.__('deleted'),
          type: 'success'
        })
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
  },
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
    $("#myQuizzes").addClass("oculto");
    $("#myQuiz").removeClass("oculto");
  }
});
