Meteor.publish('classes', function() {
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      return classes.find({"teacherId": Meteor.userId()});
    } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return classes.find({"_id": { "$in": c }});
    }
});
Meteor.publish('students', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return students.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return students.find({"classId": { "$in": c }});
  }
});
Meteor.publish('groups', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return groups.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return groups.find({"classId": { "$in": c }});
  }
});
Meteor.publish('randomEvents', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return randomEvents.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return randomEvents.find({"classId": { "$in": c }});
  }
});
Meteor.publish('behaviours', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return behaviours.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return behaviours.find({"classId": { "$in": c }});
  }
});
Meteor.publish('behavioursLog', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return behavioursLog.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return behavioursLog.find({"classId": { "$in": c }});
  }
});
Meteor.publish('allUsers', function() {
  return Meteor.users.find({}, {fields: {"services.google": 1, "userType": 1, "classes": 1, "emails": 1}});
});
Meteor.publish('badges', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return badges.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return badges.find({"classId": { "$in": c }});
  }
});
Meteor.publish('store', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return store.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return store.find({"classId": { "$in": c }});
  }
});
Meteor.publish('convictions', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return convictions.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return convictions.find({"classId": { "$in": c }});
  }
});
Meteor.publish('quotes', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return quotes.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return quotes.find({"classId": { "$in": c }});
  }
});
Meteor.publish('levels', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return levels.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return levels.find({"classId": { "$in": c }});
  }
});
Meteor.publish('challenges', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return challenges.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return challenges.find({"classId": { "$in": c }});
  }
});
Meteor.publish('chalMissions', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return chalMissions.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return chalMissions.find({"classId": { "$in": c }});
  }
});
Meteor.publish('chalPoints', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return chalPoints.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return chalPoints.find({"classId": { "$in": c }});
  }
});
Meteor.publish('challengesXP', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return challengesXP.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return challengesXP.find({"classId": { "$in": c }});
  }
});
Meteor.publish('diary', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return diary.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return diary.find({"classId": { "$in": c }});
  }
});
Meteor.publish('notebook', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return notebook.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return notebook.find({"classId": { "$in": c }});
  }
});
Meteor.publish('notebookWork', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return notebookWork.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return notebookWork.find({"classId": { "$in": c }});
  }
});
Meteor.publish('images', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return images.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return images.find({"classId": { "$in": c }});
  }
});
Meteor.publish('cards', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return cards.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return cards.find({"classId": { "$in": c }});
  }
});
Meteor.publish('chatClass', function() {
  v=[];
  var userType=Meteor.users.findOne({_id:Meteor.userId()}).userType;
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return chatClass.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return chatClass.find({"classId": { "$in": c }});
  }
  return chatClass.find();
});
Meteor.publish('chatTeachers', function() {
  return chatTeachers.find();
});

