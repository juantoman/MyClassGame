notifications = new Mongo.Collection('notifications');

Meteor.methods({
  notificationInsert: function(classId,studentId,cardId) {
    var notification =  {
      classId: classId,
      studentId: studentId,
      cardId: cardId,
      used:false,
      createdOn: new Date()
    };
    var Id = notifications.insert(notification);
  },
  usedCard: function(notificationId) {
    var Id = notifications.update({ _id: notificationId }, { $set: {'used': true}});
  }
});
