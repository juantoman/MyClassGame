diary = new Mongo.Collection('diary');

Meteor.methods({
  diaryInsert: function(diaryInput) {
    var diaryId = diary.insert(diaryInput);
  },
  diaryValidation: function(diaryId) {
    var diaryId = diary.update({ _id: diaryId },{$set:{validated:true}});
  }
});
