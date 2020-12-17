Template.newQuestionModal.events({
  'click .answerBtn': function(event) {
    $(event.currentTarget).toggleClass("answerSelected");
  },
  'submit #newQuestionForm': function(event) {
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
      quizId: Session.get('quizId'),
      question: desc,
      answers: answers,
      used: false,
      createdOn: new Date()
    };
    Meteor.call('questionInsert', question);
    $('#newQuestionForm').toggleClass('oculto');
  },
  'click .questionImage, click .questionBtnImage': function(event) {
    event.preventDefault();
    Session.set('imageType','question');
    Session.set('idElementImage',this._id);
    Modal.show('imagesTemplate');
  },
})
