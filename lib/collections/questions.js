questions = new Mongo.Collection('questions');

Meteor.methods({
  questionInsert: function(question) {
    var Id = questions.insert(question);
  },
  questionDelete: function(questionId) {
    var Id = questions.remove({ _id: questionId });
  },
  questionUpdate: function(questionId,question,answers) {
    var Id = questions.update({ _id: questionId }, { $set: { question: question, answers: answers } });
  },
  questionUsed: function(questionId) {
    var Id = questions.update({ _id: questionId }, { $set: { used: true } } );
  },
  questionResetUsed: function() {
    var Id = questions.update({}, { $set: { used: false } } , { multi: true});
  },
  questionsQuizDelete: function(quizId) {
    var Id = questions.remove({ 'quizId': quizId });
  },
  imageQuestionUpdate: function(itemId,imageId) {
    var Id = questions.update({ _id: itemId }, { $set: {questionImage: imageId } });
  }
});
