notifications = new Mongo.Collection('notifications');

Meteor.methods({
  notificationInsert: function(classId,studentId,elementId,elementType) {
    var notification =  {
      classId: classId,
      studentId: studentId,
      elementType: elementType,
      elementId: elementId,
      used:false,
      createdOn: new Date()
    };
    var Id = notifications.insert(notification);
  },
  usedCard: function(notificationId) {
    var Id = notifications.update({ _id: notificationId }, { $set: {'used': true}});
  },
  usedItem: function(notificationId) {
    var Id = notifications.update({ _id: notificationId }, { $set: {'used': true}});
  },
  notificationRemove: function(notificationId) {
    var Id = notifications.remove({ _id: notificationId });
  }
});
