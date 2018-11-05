classes = new Mongo.Collection('classes');

Meteor.methods({
  classInsert: function(classe) {
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
    var classId = classes.insert(classe);
    /*return {
      _id: classId
    };*/
  },
  classDelete: function(classId) {
    var Id = classes.remove({ _id: classId });
  },
  classUpdate: function(classId,className) {
    var Id = classes.update({ _id: classId }, { $set: {className: className} });
  },
  levelXPUpdate: function(classId,levelXP) {
    var Id = classes.update({ _id: classId }, { $set: {levelXP: levelXP} });
  },
  studentImgUpdate: function(classId,studentImg) {
    var Id = classes.update({ _id: classId }, { $set: {studentImg: studentImg} });
  },
  groupImgUpdate: function(classId,groupImg) {
    var Id = classes.update({ _id: classId }, { $set: {groupImg: groupImg} });
  },
  perXPUpdate: function(classId,perXP) {
    var Id = classes.update({ _id: classId }, { $set: {perXP: perXP} });
  },
  perBGUpdate: function(classId,perBG) {
    var Id = classes.update({ _id: classId }, { $set: {perBG: perBG} });
  },
  perMissionsUpdate: function(classId,perMissions) {
    var Id = classes.update({ _id: classId }, { $set: {perMissions: perMissions} });
  },
  perChallengesUpdate: function(classId,perChallenges) {
    var Id = classes.update({ _id: classId }, { $set: {perChallenges: perChallenges} });
  },
  perHPUpdate: function(classId,perHP) {
    var Id = classes.update({ _id: classId }, { $set: {perHP: perHP} });
  },
  xpChangeLevel: function(classId,xpChecked) {
    var Id = classes.update({ _id: classId }, { $set: {xpChangeLevel: xpChecked} });
  },
  iniHPUpdate: function(classId,iniHP) {
    var Id = classes.update({ _id: classId }, { $set: {iniHP: iniHP} });
  },
  changeEvaluation: function(classId,e) {
    var Id = classes.update({ _id: classId }, { $set: {evaluation: e} });
  },
  classStore: function(classId,e) {
    var Id = classes.update({ _id: classId }, { $set: {stored: true} });
  },
  classDuplicate: function(c,cId) {
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
