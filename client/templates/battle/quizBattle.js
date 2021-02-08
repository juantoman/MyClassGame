let timePassed = 0;
let timeLeft;
let timerInterval = null;

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

Template.quizBattle.onRendered(function() {
  Session.set('quizId',$('#quizId').val());
  Session.set('fighter1Corrects',0);
  Session.set('fighter2Corrects',0);
  Session.set('considerHP',true);
  Session.set('errorLoseHP',true);
  Session.set('nQuestions',questions.find({quizId: Session.get('quizId')}).count());
  n=questions.find({'quizId': $('#quizId').val()}).count();
  Session.set('maxNumberQuestions',n);
  Session.set('minCorrectAnswers',parseInt(Math.ceil(n/2)));
  Session.set('opponent1','');
  Session.set('opponent2','');
});

Template.quizBattle.helpers({
  student1Battle: function() {
    if (Session.get('opponent1')=='student'){
      return students.findOne({'_id': Session.get('opponentId1Battle')});
    }
    if (Session.get('opponent1')=='class'){
      c=classes.findOne({ _id: Session.get('classId') });
      data={
        studentName:c.className,
        HP:villains.findOne({'_id': Session.get('villainId')}).HP
      };
      return data;
    }
    if (Session.get('opponent1')=='team'){
      g=groups.findOne({ _id: Session.get('opponentId1Battle') });
      hp=0;
      students.find( { $and: [ { present: 1 }, { groupId: Session.get('opponentId1Battle') }, { classId: Session.get('classId')  } ] } ).forEach(function (student){
        if ( student["HP"]>hp ) { hp=student["HP"]; }
      });
      data={
        studentName:g.groupName,
        HP:hp,
        avatar:g.groupImg
      };
      return data;
    }
  },
  student2Battle: function() {
    if (Session.get('opponent2')=='student'){
      return students.findOne({'_id': Session.get('opponentId2Battle')});
    }
    if (Session.get('opponent2')=='team'){
      g=groups.findOne({ _id: Session.get('opponentId2Battle') });
      hp=0;
      students.find( { $and: [ { present: 1 }, { groupId: Session.get('opponentId2Battle') }, { classId: Session.get('classId')  } ] } ).forEach(function (student){
        if ( student["HP"]>hp ) { hp=student["HP"]; }
      });
      data={
        studentName:g.groupName,
        HP:hp,
        avatar:g.groupImg
      };
      return data;
    }
  },
  villainBattle: function() {
    return villains.findOne({'_id': Session.get('villainId')});
  },
  image: function(avatar) {
    if (Session.get('opponent1')=='class'){
      avatar=classes.findOne({ _id: Session.get('classId') }).groupImg;
      if (avatar) {
        if (avatar.substring(0, 4)=="http") {
          return avatar;
        } else {
          cloudinary_url=images.findOne({_id: avatar}).image_url;
          cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
          return cloudinary_url;
        }
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/v1543412151/proves/grupo.png";
      }
    }
    avatarVisible=classes.findOne({ _id: Session.get('classId') }).avatarVisible;
    if ( avatar=="" || !avatar || (  Session.get('userType') != "teacher"  &&  !avatarVisible ) ) {
      if ( classes.findOne({_id: Session.get('classId')}).studentImg ) {
        if (classes.findOne({_id: Session.get('classId')}).studentImg.substring(0, 4)=="http") {
          return classes.findOne({_id: Session.get('classId')}).studentImg;
        } else {
          cloudinary_url=images.findOne({_id: classes.findOne({_id: Session.get('classId')}).studentImg}).image_url;
          cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
          return cloudinary_url;
        }
      } else {
        return "https://avatars.dicebear.com/v2/avataaars/"+this._id+".svg";
      }
    } else  {
      if (avatar.substring(0, 4)=="http") {
        return avatar;
      } else {
        cloudinary_url=images.findOne({_id: avatar}).image_url;
        cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
        return cloudinary_url;
      }
    }
  },
  gImage: function(avatar) {
    if (avatar) {
      if (avatar.substring(0, 4)=="http" || avatar.substring(0, 4)=="data") {
        return avatar;
      } else {
        return images.findOne({_id: avatar}).image_url;
      }
    } else {
      if ( classes.findOne({_id: Session.get('classId')}).groupImg ) {
        if (classes.findOne({_id: Session.get('classId')}).groupImg.substring(0, 4)=="http") {
          return classes.findOne({_id: Session.get('classId')}).groupImg;
        } else {
          return images.findOne({_id: classes.findOne({_id: Session.get('classId')}).groupImg}).image_url;
        }
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/v1543412151/proves/grupo.png";
      }
    }
  },
  nextQuestion: function() {
    return questions.findOne({'_id': Session.get('questionId')});
    //return questions.find({'classId': Session.get('classId')});
  },
  quizzes: function() {
    return quizzes.find({'classId': Session.get('classId')});
  },
  students: function() {
    return students.find({'classId': Session.get('classId')});
  },
  groups: function() {
    return groups.find({'classId': Session.get('classId')});
  },
  villains: function() {
    return villains.find({'classId': Session.get('classId')});
  },
  opponent1: function(opponentType) {
    if (Session.get('opponent1') == opponentType) {
      return true;
    } else {
      return false;
    }
  },
  opponent2: function(opponentType) {
    if (Session.get('opponent2') == opponentType) {
      return true;
    } else {
      return false;
    }
  },
  imageVillain: function() {
    if (this.villainImage.substring(0, 4)=="http" || this.villainImage.substring(0, 1)=="/") {
      return this.villainImage;
    } else {
      cloudinary_url=images.findOne({_id: this.villainImage}).image_url;
      cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
      return cloudinary_url;
    }
  },
  fighter1Corrects: function() {
    return Session.get('fighter1Corrects');
  },
  fighter2Corrects: function() {
    return Session.get('fighter2Corrects');
  },
  fighter1Incorrects: function() {
    return Session.get('fighter1Incorrects');
  },
  fighter2Incorrects: function() {
    return Session.get('fighter2Incorrects');
  },
  questionN: function() {
    return Session.get('questionN');
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
  fighter1Winner: function() {
    // if ( ( Session.get('fighter1Corrects') >= Session.get('fighter2Corrects') && ! Session.get('withoutHP')=="fighter1" )
    // || Session.get('withoutHP')=="fighter2") {
    //   return true;
    // } else {
    //   return false;
    // }
    if ( Session.get('winner') == "fighter1" || Session.get('winner') == "both" ) {
      return true;
    } else {
      return false;
    }
  },
  fighter2Winner: function() {
    // if (Session.get('fighter1Corrects') <= Session.get('fighter2Corrects') || Session.get('withoutHP')=="fighter1") {
    //   return true;
    // } else {
    //   return false;
    // }
    if ( Session.get('winner') == "fighter2" || Session.get('winner') == "both" ) {
      return true;
    } else {
      return false;
    }
  },
  battleXP: function() {
    if (Session.get('winner') == "both") {
      return parseInt(Session.get('battleXP')/2);
    } else {
      return Session.get('battleXP');
    }
  },
  battleHPFighter1: function() {
    if (Session.get('winner') == "both") {
      bhp=Session.get('battleHP')/2;
    } else {
      bhp=Session.get('battleHP');
    }
    if (Session.get('errorLoseHP')) {
      hp=parseInt(bhp-Session.get('fighter1Incorrects'));
    }
    return hp;
  },
  battleHPFighter2: function() {
    if (Session.get('winner') == "both") {
      bhp=Session.get('battleHP')/2;
    } else {
      bhp=Session.get('battleHP');
    }
    if (Session.get('errorLoseHP')) {
      hp=parseInt(bhp-Session.get('fighter2Incorrects'));
    }
    return hp;
  },
  battleCoins: function() {
    if (Session.get('winner') == "both") {
      return parseInt(Session.get('battleCoins')/2);
    } else {
      return Session.get('battleXP');
    }
  },
  maxNumberQuestions: function() {
    return Session.get('maxNumberQuestions');
  },
  minCorrectAnswers: function() {
    return Session.get('minCorrectAnswers');
  },
  nQuestions: function() {
    return Session.get('nQuestions');
  },
  student1Selected: function() {
    if ( this._id == Session.get('opponentId1Battle') ) {
      return true;
    } else {
      return false;
    }
  },
  student2Selected: function() {
    if ( this._id == Session.get('opponentId2Battle') ) {
      return true;
    } else {
      return false;
    }
  },
  team2Selected: function() {
    if ( this._id == Session.get('opponentId2Battle') ) {
      return true;
    } else {
      return false;
    }
  },
  villainSelected: function() {
    if ( this._id == Session.get('villainId') ) {
      return true;
    } else {
      return false;
    }
  },
  considerHP: function() {
    return Session.get('considerHP');
  },
  errorLoseHP: function() {
    return Session.get('errorLoseHP');
  },
  anwswerChar: function(index) {
    if (index==0) { return "A";}
    if (index==1) { return "B";}
    if (index==2) { return "C";}
    if (index==3) { return "D";}
  }
});

Template.quizBattle.events({
  'click .question .photo': function(event) {
    if ( $('.question .photo').hasClass('timeRunning') ) {
      $('.question .photo').removeClass('answerSelected');
      $(event.currentTarget).toggleClass('answerSelected');
    }
  },
  'click .question .photo2': function(event) {
    if ( Session.get('opponent2') != "villain" && $('.question .photo').hasClass('timeRunning') ) {
      $('.question .photo2').removeClass('answerSelected');
      $(event.currentTarget).toggleClass('answerSelected');
    }
  },
  'click #correctAnswer': function(event) {
    $('.cuestionAnswer').toggleClass('correctAnswer');
    $('.battleCorrectBtn .btn').toggleClass('oculto');
    $('.questionAnswer').parent().find('.answerSelected').toggleClass('incorrectAnswer');
    $('.cuestionAnswer').parent().find('.answerSelected').addClass('cAnswer');
    $('.cAnswer').each(function( index ) {
      if ( $( this ).hasClass('photo') ) {
        Session.set('fighter1Corrects',Session.get('fighter1Corrects')+1)
      }
      if ( $( this ).hasClass('photo2') ) {
        Session.set('fighter2Corrects',Session.get('fighter2Corrects')+1)
      }
    });
    if ( Session.get('opponent2') == "villain") {
      if ( $('.incorrectAnswer').length == 1 || $('.answerSelected').length == 1 ) {
        Session.set('fighter2Corrects',Session.get('fighter2Corrects')+1);
      }
    }
    Session.set('fighter1Incorrects',Session.get('questionN')-Session.get('fighter1Corrects'));
    Session.set('fighter2Incorrects',Session.get('questionN')-Session.get('fighter2Corrects'));
    clearInterval(timerInterval);
    timeLeft = Session.get('answerTime');
    $("#timerBtn").text(formatTime(timeLeft));
    timePassed = 0;
    $("#timerBtn").css('background-color','navy');
    $('.question .photo').removeClass('timeRunning');
  },
  'click #nextQuestion': function(event) {
    Session.set('withoutHP',"none");
    if ( Session.get('considerHP') ) {
      if (Session.get('opponent1')=='student'){
        if ( Session.get('fighter1Incorrects') == students.findOne({'_id': Session.get('opponentId1Battle')}).HP ) {
          //alert( students.findOne({'_id': Session.get('opponentId1Battle')}).studentName + " se ha quedado sin HP");
          Session.set('withoutHP',"fighter1");
          if( Session.get('fighter2Corrects') >= Session.get('minCorrectAnswers') ) {
            Session.set('winner',"fighter2");
          } else {
            Session.set('winner',"none");
          }
        }
        if (Session.get('opponent2')!='villain'){
          if ( Session.get('fighter2Incorrects') == students.findOne({'_id': Session.get('opponentId2Battle')}).HP ) {
            if ( Session.get('withoutHP') == "fighter1") {
              Session.set('withoutHP',"both");
              Session.set('winner',"none");
            } else {
              Session.set('withoutHP',"fighter2");
              if( Session.get('fighter1Corrects') >= Session.get('minCorrectAnswers') ) {
                Session.set('winner',"fighter1");
              } else {
                Session.set('winner',"none");
              }
            }
          }
        } else {
          if ( Session.get('fighter2Incorrects') == villains.findOne({'_id': Session.get('villainId')}).HP ) {
            if ( Session.get('withoutHP') == "fighter1") {
              Session.set('withoutHP',"both");
              Session.set('winner',"none");
            } else {
              Session.set('withoutHP',"fighter2");
              if( Session.get('fighter1Corrects') >= Session.get('minCorrectAnswers') ) {
                Session.set('winner',"fighter1");
              } else {
                Session.set('winner',"none");
              }
            }
          }
        }
      }
      if (Session.get('opponent1')=='class') {
        if ( Session.get('fighter1Incorrects') == villains.findOne({'_id': Session.get('villainId')}).HP ) {
          //alert( students.findOne({'_id': Session.get('opponentId1Battle')}).studentName + " se ha quedado sin HP");
          Session.set('withoutHP',"fighter1");
          Session.set('winner',"fighter2");
        }
        if ( Session.get('fighter2Incorrects') == villains.findOne({'_id': Session.get('villainId')}).HP ) {
          Session.set('withoutHP',"fighter2");
          if( Session.get('fighter1Corrects') >= Session.get('minCorrectAnswers') ) {
            Session.set('winner',"fighter1");
          } else {
            Session.set('winner',"none");
          }
        }
      }
      if (Session.get('opponent1')=='team') {
        hp=0;
        students.find( { $and: [ { present: 1 }, { groupId: Session.get('opponentId1Battle') }, { classId: Session.get('classId')  } ] } ).forEach(function (student){
          if ( student["HP"]>hp ) { hp=student["HP"]; }
        });
        if ( Session.get('fighter1Incorrects') == hp ) {
          //alert( students.findOne({'_id': Session.get('opponentId1Battle')}).studentName + " se ha quedado sin HP");
          Session.set('withoutHP',"fighter1");
          Session.set('winner',"fighter2");
        }
        if (Session.get('opponent2')=='villain'){
          if ( Session.get('fighter2Incorrects') == villains.findOne({'_id': Session.get('villainId')}).HP ) {
            Session.set('withoutHP',"fighter2");
            if( Session.get('fighter1Corrects') >= Session.get('minCorrectAnswers') ) {
              Session.set('winner',"fighter1");
            } else {
              Session.set('winner',"none");
            }
          }
        } else {
          hp=0;
          students.find( { $and: [ { present: 1 }, { groupId: Session.get('opponentId2Battle') }, { classId: Session.get('classId')  } ] } ).forEach(function (student){
            if ( student["HP"]>hp ) { hp=student["HP"]; }
          });
          if ( Session.get('fighter2Incorrects') == hp ) {
            Session.set('withoutHP',"fighter2");
            if( Session.get('fighter1Corrects') >= Session.get('minCorrectAnswers') ) {
              Session.set('winner',"fighter1");
            } else {
              Session.set('winner',"none");
            }
          }
        }
      }
    }
    if (Session.get('questionN') <= Session.get('nQuestions') ) {
      Meteor.call('questionUsed', Session.get('questionId'));
      $('.cuestionAnswer').removeClass('correctAnswer');
      $('.question .photo').removeClass('answerSelected incorrectAnswer cAnswer');
      $('.question .photo2').removeClass('answerSelected incorrectAnswer cAnswer');
      $('.battleCorrectBtn .btn').toggleClass('oculto');
      var q = questions.find({quizId: Session.get('quizId'),'used':false}).fetch();
      var r = Math.floor(Math.random() * q.length);
      if (q.length ==0 || Session.get('questionN') == Session.get('nQuestions') || Session.get('withoutHP') != "none") {
        Session.set('questionId','');
        // $('.battleParameters').toggleClass('oculto');
        // $('.battleQuestions').toggleClass('oculto');
        // $('.battleModal').fadeOut(500);
        // $('html').css('overflow','auto');
        $('.battleQuestions').toggleClass('oculto');
        $('.battleResults').css('opacity',1);
        if ( Session.get('withoutHP') == "none" ) {
          if ( Session.get('fighter1Corrects') == Session.get('fighter2Corrects') && Session.get('fighter1Corrects') >= Session.get('minCorrectAnswers') ) {
            Session.set('winner',"both");
          } else if ( Session.get('fighter1Corrects') > Session.get('fighter2Corrects') && Session.get('fighter1Corrects') >= Session.get('minCorrectAnswers') ) {
            Session.set('winner',"fighter1");
          } else if ( Session.get('fighter2Corrects') > Session.get('fighter1Corrects') && Session.get('fighter2Corrects') >= Session.get('minCorrectAnswers') ) {
            Session.set('winner',"fighter2");
          } else {
            Session.set('winner',"none");
          }
        }
      } else {
        Session.set('questionId',q[r]._id);
      }
      Session.set('questionN',Session.get('questionN')+1);
      $(".answerText").addClass('oculto');
      $("#timerBtn").text("START");
    }
  },
  'submit form.battleParametersForm': function(event) {
    event.preventDefault();
    if ( Session.get('opponent1')!='' ) {
      Meteor.call('questionResetUsed');
      var q = questions.find({quizId: Session.get('quizId'),'used':false}).fetch();
      var r = Math.floor(Math.random() * q.length);
      Session.set('questionId',q[r]._id);
      $('.battleCorrectBtn #correctAnswer').removeClass('oculto');
      $('.battleCorrectBtn #nextQuestion').addClass('oculto');
      $('.battleParameters').toggleClass('oculto');
      $('.battleQuestions').toggleClass('oculto');
      Session.set('fighter1Corrects',0);
      Session.set('fighter2Corrects',0);
      Session.set('fighter1Incorrects',0);
      Session.set('fighter2Incorrects',0);
      Session.set('battleXP',$(event.target).find('[name=battleXP]').val());
      Session.set('battleHP',$(event.target).find('[name=battleHP]').val());
      Session.set('battleCoins',$(event.target).find('[name=battleCoins]').val());
      Session.set('questionN',1);
      Session.set('answerTime',$('.answerTime').val());
      Session.set('nQuestions',questions.find({quizId: Session.get('quizId')}).count());
      n=questions.find({'quizId': $('#quizId').val()}).count();
      Session.set('maxNumberQuestions',n);
      Session.set('minCorrectAnswers',parseInt(Math.ceil(n/2)));
      timeLeft = Session.get('answerTime');
      timePassed = 0;
      $('.battleModal').fadeIn(500);
      $('html').css('overflow','hidden');
      $("#timerBtn").text(formatTime(timeLeft));
    }
  },
  'change #quizId': function(event) {
    event.preventDefault();
    Session.set('quizId',$('#quizId').val());
    n=questions.find({'quizId': $('#quizId').val()}).count();
    Session.set('maxNumberQuestions',n);
    Session.set('minCorrectAnswers',parseInt(Math.ceil(n/2)));
  },
  'click .closeBattle': function(event) {
    event.preventDefault();
    Session.set('questionId','');
    $('.battleModal').fadeOut(500);
    $('.battleParameters').toggleClass('oculto');
    $('.battleQuestions').toggleClass('oculto');
    $('html').css('overflow','auto');
  },
  'click .closeResultsBattle': function(event) {
    event.preventDefault();
    Session.set('questionId','');
    $('.battleModal').fadeOut(500);
    $('.battleParameters').toggleClass('oculto');
    $('.battleResults').css('opacity',0);
    $('html').css('overflow','auto');
  },
  'click .swordsResults': function(event) {
    event.preventDefault();
    Session.set('questionId','');
    swal({
      title: TAPi18n.__('save') + " " +  TAPi18n.__('results'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        if (Session.get('winner') == "fighter1") {
          //Student Winner
          if ( Session.get('opponent1') == "student" ) {
            if (Session.get('errorLoseHP')) {
              hp=parseInt(Session.get('battleHP')-Session.get('fighter1Incorrects'));
            } else {
              hp=parseInt(Session.get('battleHP'));
            }
            var behaviour = {
              classId: Session.get('classId'),
              student: Session.get('opponentId1Battle'),
              behavior: 'Battle',
              behaviourType: 'Battle',
              'XP': Session.get('battleXP'),
              'HP': hp,
              Coins: Session.get('battleCoins'),
              Energy:0,
              evaluation: Session.get('evaluation'),
              comment: $("#commentXP").val(),
              createdOn: new Date()
            };
            Meteor.call('behaviourLogInsert', behaviour);
            Meteor.call('studentXP', Session.get('opponentId1Battle'), Session.get('battleXP'));
            Meteor.call('studentHP', Session.get('opponentId1Battle'), -hp);
            Meteor.call('incCoins', Session.get('opponentId1Battle'), Session.get('battleCoins'));
          }
          //Student Loser
          if ( Session.get('opponent2') == "student" && Session.get('errorLoseHP') ) {
            hp=-Session.get('fighter2Incorrects');
            var behaviour = {
              classId: Session.get('classId'),
              student: Session.get('opponentId2Battle'),
              behavior: 'Battle',
              behaviourType: 'Battle',
              'XP': 0,
              'HP': hp,
              Coins: 0,
              Energy:0,
              evaluation: Session.get('evaluation'),
              comment: $("#commentXP").val(),
              createdOn: new Date()
            };
            Meteor.call('behaviourLogInsert', behaviour);
            Meteor.call('studentHP', Session.get('opponentId2Battle'), -hp);
          }
          //class Winner
          if ( Session.get('opponent1') == "class" ) {
            if (Session.get('errorLoseHP')) {
              hp=parseInt(Session.get('battleHP')-Session.get('fighter1Incorrects'));
            } else {
              hp=parseInt(Session.get('battleHP'));
            }
            students.find( { $and: [ { present: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (student){
              var behaviour = {
                classId: Session.get('classId'),
                student: student["_id"],
                behavior: 'Battle',
                behaviourType: 'Battle',
                'XP': Session.get('battleXP'),
                'HP': hp,
                Coins: Session.get('battleCoins'),
                Energy:0,
                evaluation: Session.get('evaluation'),
                comment: $("#commentXP").val(),
                createdOn: new Date()
              };
              Meteor.call('behaviourLogInsert', behaviour);
              Meteor.call('studentXP', student["_id"], Session.get('battleXP'));
              Meteor.call('studentHP', student["_id"], -hp);
              Meteor.call('incCoins', student["_id"], Session.get('battleCoins'));
            });
          }
          //team1 winner
          if ( Session.get('opponent1') == "team" ) {
            if (Session.get('errorLoseHP')) {
              hp=parseInt(Session.get('battleHP')-Session.get('fighter1Incorrects'));
            } else {
              hp=parseInt(Session.get('battleHP'));
            }
            students.find( { $and: [ { present: 1 }, { groupId: Session.get('opponentId1Battle') }, { classId: Session.get('classId')  } ] } ).forEach(function (student){
              var behaviour = {
                classId: Session.get('classId'),
                student: student["_id"],
                behavior: 'Battle',
                behaviourType: 'Battle',
                'XP': Session.get('battleXP'),
                'HP': hp,
                Coins: Session.get('battleCoins'),
                Energy:0,
                evaluation: Session.get('evaluation'),
                comment: $("#commentXP").val(),
                createdOn: new Date()
              };
              Meteor.call('behaviourLogInsert', behaviour);
              Meteor.call('studentXP', student["_id"], Session.get('battleXP'));
              Meteor.call('studentHP', student["_id"], -hp);
              Meteor.call('incCoins', student["_id"], Session.get('battleCoins'));
            });
          }
          //team2 loser
          if ( Session.get('opponent2') == "team" ) {
            if (Session.get('errorLoseHP')) {
              students.find( { $and: [ { present: 1 }, { groupId: Session.get('opponentId2Battle') }, { classId: Session.get('classId')  } ] } ).forEach(function (student){
                hp=Session.get('fighter2Incorrects');
                if ( student["HP"]<hp ) { hp=student["HP"]; }
                var behaviour = {
                  classId: Session.get('classId'),
                  student: student["_id"],
                  behavior: 'Battle',
                  behaviourType: 'Battle',
                  'XP': Session.get('battleXP'),
                  'HP': -hp,
                  Coins: Session.get('battleCoins'),
                  Energy:0,
                  evaluation: Session.get('evaluation'),
                  comment: $("#commentXP").val(),
                  createdOn: new Date()
                };
                Meteor.call('behaviourLogInsert', behaviour);
                Meteor.call('studentHP', student["_id"], hp);
              });
            }
          }
        }
        if ( Session.get('winner') == "fighter2" ) {
          //Student Winner
          if (Session.get('opponent2') == "student") {
            if (Session.get('errorLoseHP')) {
              hp=parseInt(Session.get('battleHP')-Session.get('fighter2Incorrects'));
            } else {
              hp=parseInt(Session.get('battleHP'));
            }
            var behaviour = {
              classId: Session.get('classId'),
              student: Session.get('opponentId2Battle'),
              behavior: 'Battle',
              behaviourType: 'Battle',
              'XP': Session.get('battleXP'),
              'HP': hp,
              Coins: Session.get('battleCoins'),
              Energy:0,
              evaluation: Session.get('evaluation'),
              comment: $("#commentXP").val(),
              createdOn: new Date()
            };
            Meteor.call('behaviourLogInsert', behaviour);
            Meteor.call('studentXP', Session.get('opponentId2Battle'), Session.get('battleXP'));
            Meteor.call('studentHP', Session.get('opponentId2Battle'), -hp);
            Meteor.call('incCoins', Session.get('opponentId2Battle'), Session.get('battleCoins'));
          }
          //Student Loser
          if (Session.get('opponent1') == "student" && Session.get('errorLoseHP')) {
            hp=-Session.get('fighter1Incorrects');
            var behaviour = {
              classId: Session.get('classId'),
              student: Session.get('opponentId1Battle'),
              behavior: 'Battle',
              behaviourType: 'Battle',
              'XP': 0,
              'HP': hp,
              Coins: 0,
              Energy:0,
              evaluation: Session.get('evaluation'),
              comment: $("#commentXP").val(),
              createdOn: new Date()
            };
            Meteor.call('behaviourLogInsert', behaviour);
            Meteor.call('studentHP', Session.get('opponentId1Battle'), -hp);
          }
          //class loser
          if ( Session.get('opponent1') == "class" ) {
            if (Session.get('errorLoseHP')) {
              students.find( { $and: [ { present: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (student){
                hp=Session.get('fighter1Incorrects');
                if ( student["HP"]<hp ) { hp=student["HP"]; }
                var behaviour = {
                  classId: Session.get('classId'),
                  student: student["_id"],
                  behavior: 'Battle',
                  behaviourType: 'Battle',
                  'XP': 0,
                  'HP': -hp,
                  Coins: 0,
                  Energy:0,
                  evaluation: Session.get('evaluation'),
                  comment: $("#commentXP").val(),
                  createdOn: new Date()
                };
                Meteor.call('behaviourLogInsert', behaviour);
                Meteor.call('studentHP', student["_id"], hp);
              });
            }
          }
          //team2 winner
          if ( Session.get('opponent2') == "team" ) {
            if (Session.get('errorLoseHP')) {
              hp=parseInt(Session.get('battleHP')-Session.get('fighter2Incorrects'));
            } else {
              hp=parseInt(Session.get('battleHP'));
            }
            students.find( { $and: [ { present: 1 }, { groupId: Session.get('opponentId2Battle') }, { classId: Session.get('classId')  } ] } ).forEach(function (student){
              var behaviour = {
                classId: Session.get('classId'),
                student: student["_id"],
                behavior: 'Battle',
                behaviourType: 'Battle',
                'XP': Session.get('battleXP'),
                'HP': hp,
                Coins: Session.get('battleCoins'),
                Energy:0,
                evaluation: Session.get('evaluation'),
                comment: $("#commentXP").val(),
                createdOn: new Date()
              };
              Meteor.call('behaviourLogInsert', behaviour);
              Meteor.call('studentXP', student["_id"], Session.get('battleXP'));
              Meteor.call('studentHP', student["_id"], -hp);
              Meteor.call('incCoins', student["_id"], Session.get('battleCoins'));
            });
          }
          //team1 loser
          if ( Session.get('opponent1') == "team" ) {
            if (Session.get('errorLoseHP')) {
              students.find( { $and: [ { present: 1 }, { groupId: Session.get('opponentId1Battle') }, { classId: Session.get('classId')  } ] } ).forEach(function (student){
                hp=Session.get('fighter1Incorrects');
                if ( student["HP"]<hp ) { hp=student["HP"]; }
                var behaviour = {
                  classId: Session.get('classId'),
                  student: student["_id"],
                  behavior: 'Battle',
                  behaviourType: 'Battle',
                  'XP': Session.get('battleXP'),
                  'HP': -hp,
                  Coins: Session.get('battleCoins'),
                  Energy:0,
                  evaluation: Session.get('evaluation'),
                  comment: $("#commentXP").val(),
                  createdOn: new Date()
                };
                Meteor.call('behaviourLogInsert', behaviour);
                Meteor.call('studentHP', student["_id"], hp);
              });
            }
          }
        }
        if (Session.get('winner') == "both") {
          if (Session.get('opponent1') == "student" ) {
            // Fighter1
            if (Session.get('errorLoseHP')) {
              hp=parseInt(Session.get('battleHP')/2-Session.get('fighter1Incorrects'));
            } else {
              hp=parseInt(Session.get('battleHP')/2);
            }
            var behaviour = {
              classId: Session.get('classId'),
              student: Session.get('opponentId1Battle'),
              behavior: 'Battle',
              behaviourType: 'Battle',
              'XP': parseInt(Session.get('battleXP')/2),
              'HP': hp,
              Coins: parseInt(Session.get('battleCoins')/2),
              Energy:0,
              evaluation: Session.get('evaluation'),
              comment: $("#commentXP").val(),
              createdOn: new Date()
            };
            Meteor.call('behaviourLogInsert', behaviour);
            Meteor.call('studentXP', Session.get('opponentId1Battle'), parseInt(Session.get('battleXP')/2));
            Meteor.call('studentHP', Session.get('opponentId1Battle'), -hp);
            Meteor.call('incCoins', Session.get('opponentId1Battle'), parseInt(Session.get('battleCoins')/2));
            // Fighter2
            if (Session.get('errorLoseHP')) {
              hp=parseInt(Session.get('battleHP')/2-Session.get('fighter2Incorrects'));
            } else {
              hp=parseInt(Session.get('battleHP')/2);
            }
            var behaviour = {
              classId: Session.get('classId'),
              student: Session.get('opponentId2Battle'),
              behavior: 'Battle',
              behaviourType: 'Battle',
              'XP': parseInt(Session.get('battleXP')/2),
              'HP': hp,
              Coins: parseInt(Session.get('battleCoins')/2),
              Energy:0,
              evaluation: Session.get('evaluation'),
              comment: $("#commentXP").val(),
              createdOn: new Date()
            };
            Meteor.call('behaviourLogInsert', behaviour);
            Meteor.call('studentXP', Session.get('opponentId2Battle'), parseInt(Session.get('battleXP')/2));
            Meteor.call('studentHP', Session.get('opponentId2Battle'), -hp);
            Meteor.call('incCoins', Session.get('opponentId2Battle'), parseInt(Session.get('battleCoins')/2));
          }
          if (Session.get('opponent1') == "team" ) {
            //team1
            if (Session.get('errorLoseHP')) {
              hp=parseInt(Session.get('battleHP')/2-Session.get('fighter1Incorrects'));
            } else {
              hp=parseInt(Session.get('battleHP')/2);
            }
            students.find( { $and: [ { present: 1 }, { groupId: Session.get('opponentId1Battle') }, { classId: Session.get('classId')  } ] } ).forEach(function (student){
              var behaviour = {
                classId: Session.get('classId'),
                student: student["_id"],
                behavior: 'Battle',
                behaviourType: 'Battle',
                'XP': parseInt(Session.get('battleXP')/2),
                'HP': hp,
                Coins: parseInt(Session.get('battleCoins')/2),
                Energy:0,
                evaluation: Session.get('evaluation'),
                comment: $("#commentXP").val(),
                createdOn: new Date()
              };
              Meteor.call('behaviourLogInsert', behaviour);
              Meteor.call('studentXP', student["_id"], parseInt(Session.get('battleXP')/2));
              Meteor.call('studentHP', student["_id"], -hp);
              Meteor.call('incCoins', student["_id"], parseInt(Session.get('battleCoins')/2));
            });
            //team2
            if (Session.get('errorLoseHP')) {
              hp=parseInt(Session.get('battleHP')/2-Session.get('fighter2Incorrects'));
            } else {
              hp=parseInt(Session.get('battleHP')/2);
            }
            students.find( { $and: [ { present: 1 }, { groupId: Session.get('opponentId2Battle') }, { classId: Session.get('classId')  } ] } ).forEach(function (student){
              var behaviour = {
                classId: Session.get('classId'),
                student: student["_id"],
                behavior: 'Battle',
                behaviourType: 'Battle',
                'XP': parseInt(Session.get('battleXP')/2),
                'HP': hp,
                Coins: parseInt(Session.get('battleCoins')/2),
                Energy:0,
                evaluation: Session.get('evaluation'),
                comment: $("#commentXP").val(),
                createdOn: new Date()
              };
              Meteor.call('behaviourLogInsert', behaviour);
              Meteor.call('studentXP', student["_id"], parseInt(Session.get('battleXP')/2));
              Meteor.call('studentHP', student["_id"], -hp);
              Meteor.call('incCoins', student["_id"], parseInt(Session.get('battleCoins')/2));
            });
          }
        }
        if (Session.get('winner') == "none") {
          if (Session.get('errorLoseHP')) {
            //Student1 Loser
            if ( Session.get('opponent1') == "student" ) {
              hp=-Session.get('fighter1Incorrects');
              var behaviour = {
                classId: Session.get('classId'),
                student: Session.get('opponentId1Battle'),
                behavior: 'Battle',
                behaviourType: 'Battle',
                'XP': 0,
                'HP': hp,
                Coins: 0,
                Energy:0,
                evaluation: Session.get('evaluation'),
                comment: $("#commentXP").val(),
                createdOn: new Date()
              };
              Meteor.call('behaviourLogInsert', behaviour);
              Meteor.call('studentHP', Session.get('opponentId1Battle'), -hp);
            }
            //Student2 Loser
            if ( Session.get('opponent2') == "student" ) {
              hp=-Session.get('fighter2Incorrects');
              var behaviour = {
                classId: Session.get('classId'),
                student: Session.get('opponentId2Battle'),
                behavior: 'Battle',
                behaviourType: 'Battle',
                'XP': 0,
                'HP': hp,
                Coins: 0,
                Energy:0,
                evaluation: Session.get('evaluation'),
                comment: $("#commentXP").val(),
                createdOn: new Date()
              };
              Meteor.call('behaviourLogInsert', behaviour);
              Meteor.call('studentHP', Session.get('opponentId2Battle'), -hp);
            }
            //team1 loser
            if ( Session.get('opponent1') == "team" ) {
              if (Session.get('errorLoseHP')) {
                students.find( { $and: [ { present: 1 }, { groupId: Session.get('opponentId1Battle') }, { classId: Session.get('classId')  } ] } ).forEach(function (student){
                  hp=Session.get('fighter1Incorrects');
                  if ( student["HP"]<hp ) { hp=student["HP"]; }
                  var behaviour = {
                    classId: Session.get('classId'),
                    student: student["_id"],
                    behavior: 'Battle',
                    behaviourType: 'Battle',
                    'XP': Session.get('battleXP'),
                    'HP': -hp,
                    Coins: Session.get('battleCoins'),
                    Energy:0,
                    evaluation: Session.get('evaluation'),
                    comment: $("#commentXP").val(),
                    createdOn: new Date()
                  };
                  Meteor.call('behaviourLogInsert', behaviour);
                  Meteor.call('studentHP', student["_id"], hp);
                });
              }
            }
            //team2 loser
            if ( Session.get('opponent2') == "team" ) {
              if (Session.get('errorLoseHP')) {
                students.find( { $and: [ { present: 1 }, { groupId: Session.get('opponentId2Battle') }, { classId: Session.get('classId')  } ] } ).forEach(function (student){
                  hp=Session.get('fighter2Incorrects');
                  if ( student["HP"]<hp ) { hp=student["HP"]; }
                  var behaviour = {
                    classId: Session.get('classId'),
                    student: student["_id"],
                    behavior: 'Battle',
                    behaviourType: 'Battle',
                    'XP': Session.get('battleXP'),
                    'HP': -hp,
                    Coins: Session.get('battleCoins'),
                    Energy:0,
                    evaluation: Session.get('evaluation'),
                    comment: $("#commentXP").val(),
                    createdOn: new Date()
                  };
                  Meteor.call('behaviourLogInsert', behaviour);
                  Meteor.call('studentHP', student["_id"], hp);
                });
              }
            }
          }
        }
        swal({
          title: TAPi18n.__('results') + " " +  TAPi18n.__('saved'),
          type: 'success'
        })
      }
      $('.battleModal').fadeOut(500);
      $('.battleParameters').toggleClass('oculto');
      $('.battleResults').css('opacity',0);
      $('html').css('overflow','auto');
    })
  },
  'change .fighter1Select': function(event) {
    event.preventDefault();
    Session.set('opponentId1Battle',$('.fighter1Select').val());
  },
  'change .fighter2Select': function(event) {
    event.preventDefault();
    if (Session.get('opponent2') == 'villain' ) {
      Session.set('villainId',$('.fighter2Select').val());
    }
    if (Session.get('opponent2') == 'student' ) {
      Session.set('opponentId2Battle',$('.fighter2Select').val());
    }
    if (Session.get('opponent2') == 'team' ) {
      Session.set('opponentId2Battle',$('.fighter2Select').val());
    }
  },
  'change .nQuestions': function(event) {
    event.preventDefault();
    Session.set('nQuestions',$('.nQuestions').val());
  },
  'click .considerHP': function(event) {
    if (Session.get('considerHP')) {
      Session.set('considerHP',false);
    } else {
      Session.set('considerHP',true);
      Session.set('errorLoseHP',true);
    }
    //$('.fighterHP').toggleClass('oculto');
  },
  'click .errorLoseHP': function(event) {
    if (Session.get('errorLoseHP')) {
      Session.set('errorLoseHP',false);
      Session.set('considerHP',false);
    } else {
      Session.set('errorLoseHP',true);
    }
    //$('.fighterHP').toggleClass('oculto');
  },
  'change .minCorrectAnswers': function(event) {
    event.preventDefault();
    Session.set('minCorrectAnswers',$('.minCorrectAnswers').val());
  },
  'click #timerBtn': function(event) {
    if (timePassed == 0 && !$('#correctAnswer').hasClass('oculto')) {
      $("#timerBtn").text(formatTime(timeLeft));
      $(".answerText").removeClass('oculto');
      $('.question .photo').addClass('timeRunning')
      $("#timerBtn").css('background-color','green');
      timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = Session.get('answerTime') - timePassed;
        $("#timerBtn").text(formatTime(timeLeft));
        if (timeLeft === 5) {
          $("#timerBtn").css('background-color','red');
        }
        if (timeLeft === 0) {
          clearInterval(timerInterval);
          timeLeft = Session.get('answerTime');
          $("#timerBtn").text(formatTime(timeLeft));
          timePassed = 0;
          $("#timerBtn").css('background-color','navy');
          $('.question .photo').removeClass('timeRunning');
        }
      }, 1000);
    }
  },
  'change .answerTime': function(event) {
    event.preventDefault();
    Session.set('answerTime',$('.answerTime').val());
  }
})
