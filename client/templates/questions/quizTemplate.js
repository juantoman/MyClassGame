Template.quizTemplate.helpers({
  questions: function() {
    return questions.find({'classId': Session.get('classId'),'quizId':Session.get('quizId')});
  },
  quiz: function() {
    return quizzes.findOne({'_id': Session.get('quizId')});
  },
  isTeacher: function() {
    if (Session.get('userType')=="teacher") {
      return true;
    } else {
      return false;
    };
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

Template.quizTemplate.events({
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
      quizId: Session.get('quizId'),
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
  'click .questionImage, click .questionBtnImage': function(event) {
    event.preventDefault();
    Session.set('imageType','question');
    Session.set('idElementImage',this._id);
    Modal.show('imagesTemplate');
  }
})
