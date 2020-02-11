Template.questions.helpers({
  questions: function() {
    return questions.find({'classId': Session.get('classId'),'quizId':this._id});
  },
  quizzes: function() {
    return quizzes.find({'classId': Session.get('classId')});
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
      title: 'Eliminar pregunta',
      text: '¿Estás seguro de querer eliminar esta pregunta?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('questionDelete', this._id);
        swal({
          title: '¡Pregunta eliminada!',
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
      title: 'Eliminar cuestionario y sus preguntas',
      text: '¿Estás seguro de querer eliminar este cuestionario?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('quizDelete', this._id);
        Meteor.call('questionsQuizDelete', this._id);
        swal({
          title: 'Cuestionario eliminado!',
          type: 'success'
        })
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
  }
});
