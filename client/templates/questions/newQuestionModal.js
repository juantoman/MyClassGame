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
    n=questions.find({quizId: Session.get("quizId")}).count()+1;
    var question = {
      classId: Session.get('classId'),
      quizId: Session.get('quizId'),
      question: desc,
      answers: answers,
      used: false,
      order: n,
      visible: false,
      createdOn: new Date()
    };
    Meteor.call('questionInsert', question);
    $('#newQuestionModal').fadeOut(500);
    $('html').css('overflow','auto');
  },
  'click .questionImage, click .questionBtnImage': function(event) {
    event.preventDefault();
    Session.set('imageType','question');
    Session.set('idElementImage',this._id);
    Modal.show('imagesTemplate');
  },
  'click .questionModalClose': function(event) {
    //$('#myBackground').toggleClass('oculto');
    $('#newQuestionModal').fadeOut(500);
    $('html').css('overflow','auto');
  },
})
