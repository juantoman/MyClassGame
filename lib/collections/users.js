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
    regla="^" + classId;
    n=classes.find({"_id" : {'$regex' : regla }}).count();
    cId=classes.findOne({"_id" : {'$regex' : regla }})._id;
    if (n==1){
      var Id = Meteor.users.update({ _id:Meteor.userId() }, { $push: {classes: cId} });
    }
    //var Id = Meteor.users.insert(type);
  }
});
