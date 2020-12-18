Template.questionModal.helpers({
  questionSelected: function() {
    return questions.findOne({'_id': Session.get('questionId')});
  },
  questionImageUrl: function() {
    img=this.questionImage;
    //return "https://res.cloudinary.com/myclassgame/image/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/v1582290869/myclassgame/darth-vader-pajamas-officially-licensed-merch-the-23_kjngzn.png";
    if (img.substring(0, 4)=="http") {
      img=img.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/');
      return img;
    } else {
      cloudinary_url=images.findOne({_id: img}).image_url;
      cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/');
      return cloudinary_url;
    }
  },
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
