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
  },
  studentUserClassInsert: function(classId,userId) {
    var Id = Meteor.users.update({ _id:userId }, { $push: {classes: classId} });
  },
  parentClassInsert: function(classId) {
    var user = Meteor.user();
    /*var type = _.extend(user.profile, {
      userType: userType
    });*/
    regla="^" + classId;
    n=classes.find({"_id" : {'$regex' : regla }}).count();
    cId=classes.findOne({"_id" : {'$regex' : regla }})._id;
    if (n==1){
      var Id = Meteor.users.update({ _id:Meteor.userId() }, { $push: {classesParent: cId} });
    }
    //var Id = Meteor.users.insert(type);
  },
  classesTeacher: function(t) {
    Meteor.users.update({ '_id':Meteor.userId() }, { $set: {'classesTeacher': t} } );
  },
  teacherInClass: function(classId) {
    Meteor.users.update({ '_id':Meteor.userId() }, { $push: {'classesTeacher': classId} } );
  },
  teacherAccepted: function(classId,teacherId) {
    Meteor.users.update({ '_id':teacherId }, { $push: {'classesTeacher': classId} } );
  },
  teacherRemoved: function(classId,teacherId) {
    Meteor.users.update({ '_id':teacherId }, { $pull: {'classesTeacher': classId} } );
  },
  teacherOutClass: function(classId) {
    Meteor.users.update({}, { $pull: {'classesTeacher': classId} }, { multi: true} );
  },
  userAvatarUpdate: function(imageId) {
    Meteor.users.update({ '_id':Meteor.userId() }, { $set: {'userAvatar': imageId} } );
  },
  userAlive: function(imageId) {
    Meteor.users.update({ _id:Meteor.userId() }, { $set: {'alive': true} });
  },
  deleteUsers: function() {
    Meteor.users.remove({'alive': { $exists: false }});
  }
});
