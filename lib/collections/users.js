Meteor.methods({
  userTypeInsert: function(userType) {
    var user = Meteor.user();
    /*var type = _.extend(user.profile, {
      userType: userType
    });*/
    var Id = Meteor.users.update({ _id:Meteor.userId() }, { $set: {userType: userType} });
    //var Id = Meteor.users.insert(type);
  },
  studentClassInsert: function(classId) {
    var user = Meteor.user();
    /*var type = _.extend(user.profile, {
      userType: userType
    });*/
    var Id = Meteor.users.update({ _id:Meteor.userId() }, { $push: {classes: classId} });
    //var Id = Meteor.users.insert(type);
  }
});
