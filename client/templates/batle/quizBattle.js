Template.quizBattle.helpers({
  student1Battle: function() {
    return students.findOne({'_id': Session.get('studentId1Battle')});
  },
  student2Battle: function() {
    return students.findOne({'_id': Session.get('studentId2Battle')});
  },
  image: function(avatar) {
    avatarVisible=classes.findOne({ _id: Session.get('classId') }).avatarVisible;
    if ( avatar=="" || !avatar || (  Session.get('userType') != "teacher"  &&  !avatarVisible ) ) {
      if ( classes.findOne({_id: Session.get('classId')}).studentImg ) {
        if (classes.findOne({_id: Session.get('classId')}).studentImg.substring(0, 4)=="http") {
          return classes.findOne({_id: Session.get('classId')}).studentImg;
        } else {
          return images.findOne({_id: classes.findOne({_id: Session.get('classId')}).studentImg}).image_url;
        }
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/v1542963357/proves/luke.png";
      }
    } else  {
      if (avatar.substring(0, 4)=="http") {
        return avatar;
      } else {
        return images.findOne({_id: avatar}).image_url;
      }
    }
  }
});

Template.quizBattle.events({
  'click .question .photo': function(event) {
    $('.question .photo').removeClass('answerSelected')
    $(event.currentTarget).toggleClass('answerSelected');
  },
  'click .question .photo2': function(event) {
    $('.question .photo2').removeClass('answerSelected')
    $(event.currentTarget).toggleClass('answerSelected');
  }
})
