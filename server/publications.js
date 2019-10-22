Meteor.publish('allUsers', function() {
  return Meteor.users.find({}, {fields: {"services.google": 1, "userType": 1, "classes": 1, "emails": 1,"classesTeacher": 1,"classesParent": 1}});
});

Meteor.publish('mcgParameters', function() {
  return mcgParameters.find();
});

Meteor.publish('classes', function(classId) {
  t=[];
  if(  Meteor.user() ) {
    if (! Meteor.user().classesTeacher){
      classes.find({'teacherId': Meteor.userId()}).forEach( function(c){
        t.push(c._id);
      });
      Meteor.call('classesTeacher',t);
    }
  }  
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
Meteor.publish('students', function(userType,classId) {
  if (classId){
    return students.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return students.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return students.find({"classId": { "$in": c }});
  }
});
Meteor.publish('groups', function(userType,classId) {
  if (classId){
    return groups.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return groups.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return groups.find({"classId": { "$in": c }});
  }
});
Meteor.publish('randomEvents', function(userType,classId) {
  if (classId){
    return randomEvents.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return randomEvents.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return randomEvents.find({"classId": { "$in": c }});
  }
});
Meteor.publish('behaviours', function(userType,classId) {
  if (classId){
    return behaviours.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return behaviours.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return behaviours.find({"classId": { "$in": c }});
  }
});
Meteor.publish('behavioursLog', function(userType,classId) {
  if (classId){
    return behavioursLog.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return behavioursLog.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return behavioursLog.find({"classId": { "$in": c }});
  }
});
Meteor.publish('badges', function(userType,classId) {
  if (classId){
    return badges.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return badges.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return badges.find({"classId": { "$in": c }});
  }
});
Meteor.publish('store', function(userType,classId) {
  if (classId){
    return store.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return store.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return store.find({"classId": { "$in": c }});
  }
});
Meteor.publish('convictions', function(userType,classId) {
  if (classId){
    return convictions.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return convictions.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return convictions.find({"classId": { "$in": c }});
  }
});
Meteor.publish('quotes', function(userType,classId) {
  if (classId){
    return quotes.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return quotes.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return quotes.find({"classId": { "$in": c }});
  }
});
Meteor.publish('levels', function(userType,classId) {
  if (classId){
    return levels.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return levels.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return levels.find({"classId": { "$in": c }});
  }
});
Meteor.publish('challenges', function(userType,classId) {
  if (classId){
    return challenges.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return challenges.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return challenges.find({"classId": { "$in": c }});
  }
});
Meteor.publish('chalMissions', function(userType,classId) {
  if (classId){
    return chalMissions.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return chalMissions.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return chalMissions.find({"classId": { "$in": c }});
  }
});
Meteor.publish('chalPoints', function(userType,classId) {
  if (classId){
    return chalPoints.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return chalPoints.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return chalPoints.find({"classId": { "$in": c }});
  }
});
Meteor.publish('challengesXP', function(userType,classId) {
  if (classId){
    return challengesXP.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return challengesXP.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return challengesXP.find({"classId": { "$in": c }});
  }
});
Meteor.publish('diary', function(userType,classId) {
  if (classId){
    return diary.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return diary.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return diary.find({"classId": { "$in": c }});
  }
});
Meteor.publish('notebook', function(userType,classId) {
  if (classId){
    return notebook.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return notebook.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return notebook.find({"classId": { "$in": c }});
  }
});
Meteor.publish('notebookWork', function(userType,classId) {
  if (classId){
    return notebookWork.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return notebookWork.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return notebookWork.find({"classId": { "$in": c }});
  }
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
Meteor.publish('cards', function(userType,classId) {
  if (classId){
    return cards.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return cards.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return cards.find({"classId": { "$in": c }});
  }
});
Meteor.publish('chromes', function(userType,classId) {
  if (classId){
    return chromes.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return chromes.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return chromes.find({"classId": { "$in": c }});
  }
});
Meteor.publish('chatClass', function(userType,classId) {
  if (classId){
    return chatClass.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return chatClass.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return chatClass.find({"classId": { "$in": c }});
  }
});
Meteor.publish('chatTeachers', function() {
  return chatTeachers.find();
});
Meteor.publish('notifications', function(userType,classId) {
  if (classId){
    return notifications.find({"classId":classId});
  }
  v=[];
  tipos=mcgParameters.findOne().typeClasses;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return notifications.find( { $or: [ { "classId": { "$in": v } } , { "classId": { "$in": tipos } } ] } );
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return notifications.find({"classId": { "$in": c }});
  }
});
