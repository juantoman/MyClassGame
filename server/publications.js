Meteor.publish('allUsers', function() {
  return Meteor.users.find({}, {fields: {"services.google": 1, "userType": 1, "studentId": 1, "classes": 1, "emails": 1,"classesTeacher": 1,"classesParent": 1}});
});

Meteor.publish('mcgParameters', function() {
  return mcgParameters.find();
});

Meteor.publish('classes', function(classId) {
  /*t=[];
  if(  Meteor.user() ) {
    if (! Meteor.user().classesTeacher){
      classes.find({'teacherId': Meteor.userId()}).forEach( function(c){
        t.push(c._id);
      });
      Meteor.call('classesTeacher',t);
    }
  }  */
  if (classId){
    return classes.find({"_id":classId});
  } else {
    return classes.find({},{fields:{'_id':1,'teacherId':1,'className':1,'studentImg':1,'groupImg':1}})
  }
  /*
    tipos=mcgParameters.findOne().typeClasses;
    //teacherClasses=Meteor.user().classesTeacher;
    studentClasses=Meteor.user().classes;
    parentClasses=Meteor.user().classesParent;
    c=t.concat(tipos,studentClasses,parentClasses);
    c=_.uniq(c);
    //console.log(c);
    return classes.find({"_id": { "$in": c }});
  }
  /*if (classId){
    return classes.find({"_id":classId});
  } else {
    return classes.find({},{'_id':1,'teacherId':1})
  }*/
  /*
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      return classes.find( { $or: [ { "teacherId": Meteor.userId() } , { "_id": { "$in": tipos } } ] } );
    } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return classes.find({"_id": { "$in": c }});
    }*/
});
Meteor.publish('students', function(type,classId) {
  if (classId){
    return students.find({"classId":classId});
  } else {
    return students.find();
  }
  /*
  if (classId){
    return students.find({"classId":classId});
  } else {
    return students.find();
  }

  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( type == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return students.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return students.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('groups', function(type,classId) {
  if (classId){
    return groups.find({"classId":classId});
  } else {
    return groups.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return groups.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return groups.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('randomEvents', function(type,classId) {
  if (classId){
    return randomEvents.find({"classId":classId});
  } else {
    return randomEvents.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return randomEvents.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return randomEvents.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('behaviours', function(type,classId) {
  if (classId){
    return behaviours.find({"classId":classId});
  } else {
    return behaviours.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return behaviours.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return behaviours.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('behavioursLog', function(type,classId) {
  if (classId){
    return behavioursLog.find({"classId":classId});
  } else {
    return behavioursLog.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return behavioursLog.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return behavioursLog.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('badges', function(type,classId) {
  if (classId){
    return badges.find({"classId":classId});
  } else {
    return badges.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return badges.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return badges.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('store', function(type,classId) {
  if (classId){
    return store.find({"classId":classId});
  } else {
    return store.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return store.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return store.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('convictions', function(type,classId) {
  if (classId){
    return convictions.find({"classId":classId});
  } else {
    return convictions.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return convictions.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return convictions.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('quotes', function(type,classId) {
  if (classId){
    return quotes.find({"classId":classId});
  } else {
    return quotes.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return quotes.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return quotes.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('levels', function(type,classId) {
  if (classId){
    return levels.find({"classId":classId});
  } else {
    return levels.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return levels.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return levels.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('challenges', function(type,classId) {
  if (classId){
    return challenges.find({"classId":classId});
  } else {
    return challenges.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return challenges.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return challenges.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('chalMissions', function(type,classId) {
  if (classId){
    return chalMissions.find({"classId":classId});
  } else {
    return chalMissions.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return chalMissions.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return chalMissions.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('chalPoints', function(type,classId) {
  if (classId){
    return chalPoints.find({"classId":classId});
  } else {
    return chalPoints.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return chalPoints.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return chalPoints.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('challengesXP', function(type,classId) {
  if (classId){
    return challengesXP.find({"classId":classId});
  } else {
    return challengesXP.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return challengesXP.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return challengesXP.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('diary', function(type,classId) {
  if (classId){
    return diary.find({"classId":classId});
  } else {
    return diary.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return diary.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return diary.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('notebook', function(type,classId) {
  if (classId){
    return notebook.find({"classId":classId});
  } else {
    return notebook.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return notebook.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return notebook.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('notebookWork', function(type,classId) {
  if (classId){
    return notebookWork.find({"classId":classId});
  } else {
    return notebookWork.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return notebookWork.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return notebookWork.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('images', function() {
  /*v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return images.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return images.find({"classId": { "$in": c }});
  }*/
  return images.find();
});
Meteor.publish('cards', function(type,classId) {
  if (classId){
    return cards.find({"classId":classId});
  } else {
    return cards.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return cards.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return cards.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('chromes', function(type,classId) {
  if (classId){
    return chromes.find({"classId":classId});
  } else {
    return chromes.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return chromes.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return chromes.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('chatClass', function(type,classId) {
  if (classId){
    return chatClass.find({"classId":classId});
  } else {
    return chatClass.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return chatClass.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return chatClass.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('chatStudentTeacher', function(type,classId) {
  if (classId){
    return chatStudentTeacher.find({"classId":classId});
  } else {
    return chatStudentTeacher.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return chatClass.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return chatClass.find({"classId": { "$in": c }});
  }*/
});

Meteor.publish('chatTeachers', function() {
  return chatTeachers.find();
});
Meteor.publish('notifications', function(type,classId) {
  if (classId){
    return notifications.find({"classId":classId});
  } else {
    return notifications.find();
  }
  /*
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return notifications.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return notifications.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('questions', function(type,classId) {
  if (classId){
    return questions.find({"classId":classId});
  } else {
    return questions.find();
  }
  /*
  if (classId){
    return students.find({"classId":classId});
  } else {
    return students.find();
  }

  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( type == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return students.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return students.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('quizzes', function(type,classId) {
  if (classId){
    return quizzes.find({"classId":classId});
  } else {
    return quizzes.find();
  }
  /*
  if (classId){
    return students.find({"classId":classId});
  } else {
    return students.find();
  }

  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( type == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return students.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return students.find({"classId": { "$in": c }});
  }*/
});
Meteor.publish('villains', function(type,classId) {
  if (classId){
    return villains.find({"classId":classId});
  } else {
    return villains.find();
  }
  /*
  if (classId){
    return students.find({"classId":classId});
  } else {
    return students.find();
  }

  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( type == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return students.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return students.find({"classId": { "$in": c }});
  }*/
});
