challenges = new Mongo.Collection('challenges');

Meteor.methods({
  chalInsert: function(chal) {
    var Id = challenges.insert(chal);
  },
  chalDelete: function(chalId,classId) {
    o=challenges.findOne({ _id: chalId }).order;
    var Id = challenges.remove({ _id: chalId });
    var Id = challenges.update({ classId: classId, order: { $gt: o } }, { $inc: { order: -1 } }, { multi: true} );
    chalMissions.remove({'missionId': chalId});
  },
  chalUpdate: function(chalId,chal) {
    var Id = challenges.update({ _id: chalId }, { $set:chal });
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
  missionOrder: function(mId,order) {
    var Id = challenges.update({ _id: mId }, { $set: { order: order } });
    /*
    if (type=="up") {
      if (order != 1) {
        beforenext=n-1;
        challenges.update({ '_id': mId }, { $set: { 'order': 0 } } );
        challenges.update({ 'classId': classId, 'order': beforenext }, { $inc: { 'order': 1 } });
        challenges.update({ '_id': mId }, { $set: {'order': beforenext } } );
      }
    } else {
      challenges.update({ '_id': mId }, { $inc: { 'order': 0 } });
      challenges.update({ 'classId': classId, 'order': order+1 }, { $inc: { 'order': -1 } });
      challenges.update({ '_id': mId }, { $set: {'order': order+1 } } );
    }
    */
  },
  missionColorChange: function(chalId,color) {
    var Id = challenges.update({ _id: chalId }, { $set: { missionColor: color } });
  }
    //Session.set('classId', cId);
    //students.find({'classId': Session.get('classId'});
});
