quizzes = new Mongo.Collection('quizzes');

Meteor.methods({
  quizInsert: function(quiz) {
    var Id = quizzes.insert(quiz);
  },
  quizDelete: function(quizId) {
    q=quizzes.findOne({ _id: quizId });
    var Id = quizzes.remove({ _id: quizId });
    var Id = quizzes.update({ classId: q.classId, order: { $gt: q.order } }, { $inc: { order: -1 } }, { multi: true} );
  },
  quizUpdate: function(quizId,quiz) {
    var Id = quizzes.update({ _id: quizId }, { $set: quiz });
  },
  quizVisibleToggle: function(quizId) {
    v=quizzes.findOne({ _id: quizId }).visible;
    var Id = quizzes.update({ _id: quizId }, { $set: {visible: !v } });
  },
  quizOrder: function(quizId,order) {
    var Id = quizzes.update({ _id: quizId }, { $set: { order: order } });
  },
  quizzesUpdateUser: function(classId) {
    var Id = quizzes.update({ classId: classId }, { $set: { userId: Meteor.userId() } }, { multi: true} );
  },
  quizDuplicate: function(quiz,cnId,qId) {
    var qnId = quizzes.insert(quiz);
    questions.find({'quizId': qId}).forEach(function(item){
      delete item._id;
      item.classId=cnId;
      item.quizId=qnId;
      if (!item.questionImage.includes('http')) {
        i=images.findOne({'_id': item.questionImage});
        delete i._id;
        i.classId=cnId;
        var idn = images.insert(i);
        item.questionImage=idn;
      }
      Meteor.call('questionInsert',item);
    });
  },
});
