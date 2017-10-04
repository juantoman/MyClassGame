students = new Mongo.Collection('students');

Meteor.methods({
  studentInsert: function(student) {
    var studentId = students.insert(student);
  },
  studentDelete: function(studentId) {
    var Id = students.remove({ _id: studentId });
  },
  studentXP: function(studentId,xp) {
    var Id =  students.update({ _id: studentId }, { $inc: {XP: xp} });
    var Id =  students.update({ _id: studentId }, { $inc: {coins: xp} });
  },
  studentHP: function(studentId,hp) {
    wc = students.findOne({_id: studentId}).HP;
    if (wc <= hp) {
      var Id =  students.update({ _id: studentId }, { $set: {HP: 1} });
      Modal.show('conviction');
    } else {
      var Id =  students.update({ _id: studentId }, { $inc: {HP: -hp} });
    };
  },
  studentGroup: function(groupId,studentId) {
    var Id =  students.update({ _id: studentId }, { $set: {groupId: groupId}} );
  },
  studentBadge: function(studentId,badgeId) {
    var badge =  {
      badgeId: badgeId,
      createdOn: new Date()
    };
    var Id =  students.update({ _id: studentId }, { $push: {badges: badge}} );
  },
  buyingItem: function(studentId,itemId,price) {
    var item =  {
      itemId: itemId,
      createdOn: new Date()
    };
    var Id =  students.update({ _id: studentId }, { $inc: {coins: -price} });
    var Id =  students.update({ _id: studentId }, { $push: {items: item}} );
  },
});
