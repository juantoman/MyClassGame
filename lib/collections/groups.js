groups = new Mongo.Collection('groups');

Meteor.methods({
  groupInsert: function(group) {
    /*check(Meteor.userId(), String);
    check(classAttributes, {
      nom: String,
      url: String
    });
    var postWithSameLink = alumnes.findOne({url: alumneAttributes.url});
    if (postWithSameLink) {
      return {
        alumneExists: true,
          id: postWithSameLink._id
        }
    }
    var user = Meteor.user();
    var alumne = _.extend(alumneAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });*/
    //console.log(classe.className);
    var groupId = groups.insert(group);
    /*return {
      _id: classId
    };*/
  },
  groupDelete: function(groupId) {
    var Id = groups.remove({ _id: groupId });
  },
  groupXP: function(groupId,xp) {
    //var Id =  groups.update({ _id: groupId }, { $inc: {XP: xp} });
  },
  groupHP: function(groupId,hp) {
    //var Id =  groups.update({ _id: groupId }, { $inc: {HP: -hp} });
  },
  groupModify: function(groupId, gName, gImg) {
    var Id = groups.update({ _id: groupId }, { $set: {groupName: gName} });
  },
  groupMission: function(groupId,missionId) {
    var Id =  groups.update({ _id: groupId }, { $set: {mission: missionId} } );
  },
  groupDiary: function(groupId,diary) {
    var Id =  groups.update({ _id: groupId }, { $set: {diary: diary} } );
  },
  groupPortfolio: function(groupId,portfolio) {
    var Id =  groups.update({ _id: groupId }, { $set: {portfolio: portfolio} } );
  },
  groupImageUpdate: function(itemId,imageId) {
    var Id = groups.update({ _id: itemId }, { $set: {groupImg: imageId } });
  }
});
