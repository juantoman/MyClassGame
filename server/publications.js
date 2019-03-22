Meteor.publish('allUsers', function() {
  return Meteor.users.find({}, {fields: {"services.google": 1, "userType": 1, "classes": 1, "emails": 1}});
});
Meteor.publish('classes', function(userType) {
  if ( userType == "teacher") {
      return classes.find({"teacherId": Meteor.userId()});
    } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return classes.find({"_id": { "$in": c }});
    }
});
Meteor.publish('students', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return students.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return students.find({"classId": { "$in": c }});
  }
});
Meteor.publish('groups', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return groups.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return groups.find({"classId": { "$in": c }});
  }
});
Meteor.publish('randomEvents', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return randomEvents.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return randomEvents.find({"classId": { "$in": c }});
  }
});
Meteor.publish('behaviours', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return behaviours.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return behaviours.find({"classId": { "$in": c }});
  }
});
Meteor.publish('behavioursLog', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return behavioursLog.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return behavioursLog.find({"classId": { "$in": c }});
  }
});
Meteor.publish('badges', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return badges.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return badges.find({"classId": { "$in": c }});
  }
});
Meteor.publish('store', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return store.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return store.find({"classId": { "$in": c }});
  }
});
Meteor.publish('convictions', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return convictions.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return convictions.find({"classId": { "$in": c }});
  }
});
Meteor.publish('quotes', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return quotes.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return quotes.find({"classId": { "$in": c }});
  }
});
Meteor.publish('levels', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return levels.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return levels.find({"classId": { "$in": c }});
  }
});
Meteor.publish('challenges', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return challenges.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return challenges.find({"classId": { "$in": c }});
  }
});
Meteor.publish('chalMissions', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return chalMissions.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return chalMissions.find({"classId": { "$in": c }});
  }
});
Meteor.publish('chalPoints', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return chalPoints.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return chalPoints.find({"classId": { "$in": c }});
  }
});
Meteor.publish('challengesXP', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return challengesXP.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return challengesXP.find({"classId": { "$in": c }});
  }
});
Meteor.publish('diary', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return diary.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return diary.find({"classId": { "$in": c }});
  }
});
Meteor.publish('notebook', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return notebook.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return notebook.find({"classId": { "$in": c }});
  }
});
Meteor.publish('notebookWork', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return notebookWork.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return notebookWork.find({"classId": { "$in": c }});
  }
});
Meteor.publish('images', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return images.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return images.find({"classId": { "$in": c }});
  }
});
Meteor.publish('cards', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return cards.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return cards.find({"classId": { "$in": c }});
  }
});
Meteor.publish('chatClass', function(userType) {
  v=[];
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
Meteor.publish('notifications', function(userType) {
  v=[];
  if ( userType == "teacher") {
      classes.find({"teacherId": Meteor.userId()},{fields: {'_id':1}}).forEach(function(c){v.push(c._id);});
      return notifications.find({"classId": { "$in": v }});
  } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      return notifications.find({"classId": { "$in": c }});
  }
  return chatClass.find();
});

