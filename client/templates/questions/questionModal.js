Template.questionModal.helpers({
  questionSelected: function() {
    return questions.findOne({'_id': Session.get('questionId')});
  }
})

Template.questionModal.events({
  'click .answerBtn': function(event) {
    $(this).toggleClass("answerSelected");
  },
  'submit form.questionForm': function(event) {
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
    Meteor.call('questionUpdate', question, answers);
    $('#questionModal').fadeOut(500);
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
    $('#questionModal').fadeOut(500);
    $('html').css('overflow','auto');
  },
})
