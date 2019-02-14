challenges = new Mongo.Collection('challenges');

Meteor.methods({
  chalInsert: function(chal) {
    var Id = challenges.insert(chal);
  },
  chalDelete: function(chalId) {
    var Id = challenges.remove({ _id: chalId });
  },
  chalUpdateName: function(chalId,chalName) {
    var Id = challenges.update({ _id: chalId }, { $set: { chalName: chalName } });
  },
  chalUpdateDesc: function(chalId,chalDesc) {
    var Id = challenges.update({ _id: chalId }, { $set: { chalDesc: chalDesc } });
  },
  nbDepChange: function(chalId,nbd) {
    var Id = challenges.update({ _id: chalId }, { $set: { notebookDependence: nbd } });
  },
  chalDuplicate: function(chal,cnId,mId) {
    var Id = challenges.insert(chal);
    chalMissions.find({'missionId': mId}).forEach(function(item){
      delete item._id;
      item.classId=cnId;
      item.missionId=Id;
      Meteor.call('chalMissionInsert',item);
    });
  },
  missionDuplicate: function(c,cId) {
    var cnId = classes.insert(c);
    students.find({'classId': cId}).forEach(function(item){
      delete item._id;
      item.classId=cnId;
      item.XP=0;
      item.HP=10;
      item.level=0;
      item.coins=0;
      item.groupId=0,
      item.badges=[];
      item.items=[];
      item.powers=[];
      item.collection=[];
      Meteor.call('studentInsert',item);
    });
    randomEvents.find({'classId': cId}).forEach(function(item){
      delete item._id;
      item.classId=cnId;
      Meteor.call('randomEventInsert',item);
    });
    behaviours.find({'classId': cId}).forEach(function(item){
      delete item._id;
      item.classId=cnId;
      Meteor.call('behaviourInsert',item);
    });
    convictions.find({'classId': cId}).forEach(function(item){
      delete item._id;
      item.classId=cnId;
      Meteor.call('convictionInsert',item);
    });
    badges.find({'classId': cId}).forEach(function(item){
      delete item._id;
      item.classId=cnId;
      Meteor.call('badgeInsert',item);
    });
    store.find({'classId': cId}).forEach(function(item){
      delete item._id;
      item.classId=cnId;
      Meteor.call('itemInsert',item);
    });
    levels.find({'classId': cId}).forEach(function(item){
      delete item._id;
      item.classId=cnId;
      Meteor.call('levelInsert',item);
    });
    quotes.find({'classId': cId}).forEach(function(item){
      delete item._id;
      item.classId=cnId;
      Meteor.call('quoteInsert',item);
    });
    //Session.set('classId', cId);
    //students.find({'classId': Session.get('classId'});
  }
});
