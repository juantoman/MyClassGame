quizzes = new Mongo.Collection('quizzes');

Meteor.methods({
  quizInsert: function(quiz) {
    var Id = quizzes.insert(quiz);
  },
  quizDelete: function(quizId) {
    var Id = quizzes.remove({ _id: quizId });
  },
  quizUpdate: function(quizId,quizName) {
    var Id = quizzes.update({ _id: quizId }, { $set: { quizName: quizName} });
  }
});
