students = new Mongo.Collection('students');

Meteor.methods({
  studentInsert: function(student) {
    /*check(Meteor.userId(), String);
    check(classAttributes, {
      nom: String,
      url: String
    });
    var postWithSameLink = alumnes.findOne({url: alumneAttributes.url});
    if (postWithSameLink) {
      return {
        alumneExists: true,
          id: postWithSameLink._id
        }
    }
    var user = Meteor.user();
    var alumne = _.extend(alumneAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });*/
    //console.log(classe.className);
    var studentId = students.insert(student);
    /*return {
      _id: classId
    };*/
  },
  studentDelete: function(studentId) {
    var Id = students.remove({ _id: studentId });
  },
  studentXP: function(studentId,xp) {
    var Id =  students.update({ _id: studentId }, { $inc: {XP: xp} });
  },
  studentHP: function(studentId,hp) {
    var Id =  students.update({ _id: studentId }, { $inc: {HP: -hp} });
  },
  studentGroup: function(groupId,studentId) {
    var Id =  students.update({ _id: studentId }, { $set: {groupId: groupId}} );
  }
});
