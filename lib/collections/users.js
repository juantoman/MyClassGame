Meteor.methods({
  userTypeInsert: function(userType) {
    var user = Meteor.user();
    /*var type = _.extend(user.profile, {
      userType: userType
    });*/
    var Id = Meteor.users.update({ _id:Meteor.userId() }, { $set: {userType: userType} });
    //var Id = Meteor.users.insert(type);
  },
  studentClassInsert: function(classId, studentId) {
    var user = Meteor.user();
    /*var type = _.extend(user.profile, {
      userType: userType
    });*/
    reglaClass="^" + classId;
    nc=classes.find({"_id" : {'$regex' : reglaClass }}).count();
    alert(nc);
    // reglaStudent="^" + studentId;
    // ns=students.find({"_id" : {'$regex' : reglaStudent }}).count();
    // sId=students.findOne({"_id" : {'$regex' : reglaStudent }})._id;
    if (nc==1){
      cId=classes.findOne({"_id" : {'$regex' : reglaClass }})._id;
      if(Meteor.user().classes.indexOf(cId)!=-1){
        var Id = Meteor.users.update({ _id:Meteor.userId() }, { $push: {classes: cId} });
      }
    }
    // if (ns==1){
    //   s=students.findOne({"_id" : {'$regex' : reglaStudent }});
    //   if(Meteor.user().classes.indexOf(s.classId)!=-1){
    //     Meteor.users.update({ _id:Meteor.userId() }, { $push: {classes: s.classId} });
    //   }
    //   if (!s.userId) {
    //     students.update({ _id: s._id }, { $set: {userId: Meteor.userId() } });
    //   }
    // }
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
    //Meteor.users.remove({'alive': { $exists: false }});
    //Meteor.users.find({'alive': { $exists: false }},{limit:1000}).forEach( function(u) {
    Meteor.users.find({'alive': false },{limit:1000}).forEach( function(u) {
      Meteor.users.remove({'_id':u._id});
    })
  },
  aliveFalseUsers: function(classId) {
    Meteor.users.update({}, { $set: {'alive': false} } , { multi: true} );
  }
});
