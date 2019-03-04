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
  backImgUpdate: function(classId,backImg) {
    var Id = classes.update({ _id: classId }, { $set: {backImg: backImg} });
  },
  perXPUpdate: function(classId,perXP) {
    var Id = classes.update({ _id: classId }, { $set: {perXP: perXP} });
  },
  avatarVisibleChange: function(classId,avatarChecked) {
    var Id = classes.update({ _id: classId }, { $set: {avatarVisible: avatarChecked} });
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
  hourXPUpdate: function(classId,hourXP) {
    var Id = classes.update({ _id: classId }, { $set: {hourXP: hourXP} });
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
  classStore: function(classId) {
    if ( classes.findOne({ _id: classId }).stored ) {
      var Id = classes.update({ _id: classId }, { $set: {stored: false} });
    } else {
      var Id = classes.update({ _id: classId }, { $set: {stored: true} });
    }
  },
  saveAdventure: function(classId,adventureName,adventureDesc,adventureWeb) {
    var Id = classes.update({ _id: classId }, { $set: {adventureName: adventureName, adventureDesc: adventureDesc, adventureWeb: adventureWeb} });
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
    challenges.find({'classId': cId}).forEach(function(item){
      mId=item._id;
      delete item._id;
      item.classId=cnId;
      Meteor.call('chalDuplicate',item,cnId,mId);
    });
    //Session.set('classId', cId);
    //students.find({'classId': Session.get('classId'});
  },
  storyUpdate: function(classId,story) {
    var Id = classes.update({ _id: classId }, { $set: story });
  },
  dinamicsUpdate: function(classId,dinamics) {
    var Id = classes.update({ _id: classId }, { $set: dinamics });
  },
  mechanicsUpdate: function(classId,mechanics) {
    var Id = classes.update({ _id: classId }, { $set: mechanics });
  },
  componentsUpdate: function(classId,components) {
    var Id = classes.update({ _id: classId }, { $set: components });
  },
  resetClass: function(classId) {
    var iniHP = parseInt(classes.findOne({_id: classId}).iniHP);
    reset={
      XP: 0,
      HP: iniHP,
      level: 0,
      coins: 0,
      rs: 0,
      os: 0,
      ys: 0,
      ws: 0,
      bs: 0,
      gs: 0,
      badges: [],
      items: [],
      powers: [],
      collection: []
    }
    var Id = students.update({ classId: classId }, { $set: reset }, {multi: true});
  }
});
