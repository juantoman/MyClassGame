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
    Session.set("classId",classId);
    /*return {
      _id: classId
    };*/
  },
  classDelete: function(classId) {
    var Id = classes.remove({ _id: classId });
    var Id = students.remove({ classId: classId });
    var Id = randomEvents.remove({ _id: classId });
    var Id = behaviours.remove({ classId: classId });
    var Id = convictions.remove({ classId: classId });
    var Id = badges.remove({ classId: classId });
    var Id = cards.remove({ classId: classId });
    var Id = store.remove({ classId: classId });
    var Id = levels.remove({ classId: classId });
    var Id = quotes.remove({ classId: classId });
    var Id = challenges.remove({ classId: classId });
    var Id = images.remove({ classId: classId });
    Meteor.call('teacherOutClass',classId);
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
  onlyMyStudentChange: function(classId,onlyMyStudentChecked) {
    var Id = classes.update({ _id: classId }, { $set: {onlyMyStudent: onlyMyStudentChecked} });
  },
  CoinXPChange: function(classId,coinXPChecked) {
    var Id = classes.update({ _id: classId }, { $set: {CoinXP: coinXPChecked} });
  },
  chatVisibleChange: function(classId,chatVisible) {
    var Id = classes.update({ _id: classId }, { $set: {chatVisible: chatVisible} });
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
  /*saveAdventure: function(classId,adventureName,adventureDesc,adventureWeb) {
    var Id = classes.update({ _id: classId }, { $set: {adventureName: adventureName, adventureDesc: adventureDesc, adventureWeb: adventureWeb} });
  },*/
  saveAdventure: function(classId,adventureData) {
    var Id = classes.update({ _id: classId }, { $set: adventureData });
  },
  classDuplicate: function(c,cId) {
    var cnId = classes.insert(c);
    Meteor.call('teacherInClass',cnId);
    students.find({'classId': cId}).forEach(function(item){
      delete item._id;
      item.classId=cnId;
      item.XP=0;
      item.HP=10;
      item.energy=0,
      item.level=0;
      item.coins=0;
      item.present=1;
      item.rs=0;
      item.os=0;
      item.ys=0;
      item.ws=0;
      item.bs=0;
      item.gs=0;
      item.badges=[];
      item.items=[];
      item.powers=[];
      item.cards=[];
      item.collection=[];
      Meteor.call('studentInsert',item);
    });
    groups.find({'classId': cId}).forEach(function(item){
      ida=item._id;
      delete item._id;
      item.classId=cnId;
      var idn = groups.insert(item);
      students.update({'classId': cnId, 'groupId': ida}, {$set: {'groupId': idn}}, { multi: true} );
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
    cards.find({'classId': cId}).forEach(function(item){
      delete item._id;
      item.classId=cnId;
      Meteor.call('cardInsert',item);
    });
    chromes.find({'classId': cId}).forEach(function(item){
      delete item._id;
      item.classId=cnId;
      Meteor.call('chromeInsert',item);
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
    villains.find({'classId': cId}).forEach(function(item){
      delete item._id;
      item.classId=cnId;
      Meteor.call('villainInsert',item);
    });
    images.find({'classId': cId}).forEach(function(item){
      ida=item._id;
      delete item._id;
      item.classId=cnId;
      var idn = images.insert(item);
      badges.update({'classId': cnId, 'badgeImage': ida}, {$set: {'badgeImage': idn}}, { multi: true} );
      cards.update({'classId': cnId, 'cardImage': ida}, {$set: {'cardImage': idn}}, { multi: true} );
      chromes.update({'classId': cnId, 'chromeImage': ida}, {$set: {'chromeImage': idn}}, { multi: true} );
      randomEvents.update({'classId': cnId, 'eventImage': ida}, {$set: {'eventImage': idn}}, { multi: true} );
      store.update({'classId': cnId, 'itemImage': ida}, {$set: {'itemImage': idn}}, { multi: true} );
      students.update({'classId': cnId, 'avatar': ida}, {$set: {'avatar': idn}}, { multi: true} );
      groups.update({'classId': cnId, 'groupImg': ida}, {$set: {'groupImg': idn}}, { multi: true} );
      classes.update({'_id': cnId, 'groupImg': ida}, {$set: {'groupImg': idn}}, { multi: true} );
      classes.update({'_id': cnId, 'studentImg': ida}, {$set: {'studentImg': idn}}, { multi: true} );
      villains.update({'classId': cnId, 'villainImage': ida}, {$set: {'villainImage': idn}}, { multi: true} );
    });
    //Session.set('classId', cnId);
    //Router.go('myNav');
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
      energy: 0,
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
      cards: [],
      powers: [],
      chromes: [],
      collection: [],
    }
    var Id = students.update({ classId: classId }, { $set: reset }, {multi: true});
  },
  resetXPHP: function(classId) {
    var iniHP = parseInt(classes.findOne({_id: classId}).iniHP);
    reset={
      XP: 0,
      HP: iniHP
    }
    var Id = students.update({ classId: classId }, { $set: reset }, {multi: true});
  },
  addCardType: function(classId,cardTypeDesc) {
    var cardType =  {
      _id: new Meteor.Collection.ObjectID()._str,
      cardTypeDesc: cardTypeDesc
    };
    var Id =  classes.update({ _id: classId }, { $push: {cardTypes: cardType}} );
  },
  delCardType: function(classId,cardTypeId) {
    var Id =  classes.update({ _id: classId }, { $pull: {cardTypes: {_id: cardTypeId}}} );
  },
  delTeacherWaiting: function(classId,teacherId) {
    var Id =  classes.update({ '_id': classId }, { $pull: {'teachersWaiting': {'teacherId': teacherId}}} );
  },
  otherTeacherInsert: function(classId) {
    regla="^" + classId;
    n=classes.find({"_id" : {'$regex' : regla }}).count();
    cId=classes.findOne({"_id" : {'$regex' : regla }})._id;
    var teacher =  {
      teacherId: Meteor.userId()
    };
    if (n==1){
      var Id = classes.update({ '_id' : cId }, { $push: { 'teachersWaiting' : teacher } });
    }
  },
  addTeacherInClass: function(classId,teacherId) {
    var teacher =  {
      teacherId: teacherId
    };
    Meteor.classes.update({ '_id':classId }, { $push: {'teachers': teacher} } );
  },
});
