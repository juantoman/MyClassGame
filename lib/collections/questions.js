questions = new Mongo.Collection('questions');

Meteor.methods({
  questionInsert: function(question) {
    var Id = questions.insert(question);
  },
  questionDelete: function(questionId) {
    q=questions.findOne({ _id: questionId });
    var Id = questions.remove({ _id: questionId });
    var Id = questions.update({ quizId: q.quizId, order: { $gt: q.order } }, { $inc: { order: -1 } }, { multi: true} );
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
  },
  questionVisibleToggle: function(questionId) {
    v=questions.findOne({ _id: questionId }).visible;
    var Id = questions.update({ _id: questionId }, { $set: {visible: !v } });
  },
  questionOrder: function(questionId,order) {
    var Id = questions.update({ _id: questionId }, { $set: { order: order } });
  },
  questionsUpdateUser: function(classId) {
    var Id = questions.update({ classId: classId }, { $set: { userId: Meteor.userId() } }, { multi: true} );
  }
});
