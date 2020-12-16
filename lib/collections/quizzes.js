quizzes = new Mongo.Collection('quizzes');

Meteor.methods({
  quizInsert: function(quiz) {
    var Id = quizzes.insert(quiz);
  },
  quizDelete: function(quizId) {
    var Id = quizzes.remove({ _id: quizId });
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
  }
});
