Template.questions.helpers({
  questions: function() {
    return questions.find({'classId': Session.get('classId')});
  },
})

Template.questions.events({
  'click .input-group-addon': function(event) {
    $(event.currentTarget).toggleClass("answerSelected");
  },
  'click #newQuestionBtn': function(event) {
    event.preventDefault();
    var question = {
      classId: Session.get('classId'),
      question: $('#quizQuestion').val(),
      answers: [
        {
          answer: $('#quizAnswerA').val(),
          correct: $('#quizAnswerA').prev().hasClass('answerSelected')
        },
        {
          answer: $('#quizAnswerB').val(),
          correct: $('#quizAnswerB').prev().hasClass('answerSelected')
        },
        {
          answer: $('#quizAnswerC').val(),
          correct: $('#quizAnswerC').prev().hasClass('answerSelected')
        }
      ],
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
    Meteor.call('questionDelete', this._id);
  }
});
