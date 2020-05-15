students = new Mongo.Collection('students');

Meteor.methods({
  studentInsert: function(student) {
    //alert(student.classId);
    var studentId = students.insert(student);
  },
  studentModify: function(studentId,studentName,level, alias,avatar,email) {
    var studentId = students.update({ _id: studentId }, { $set: {studentName: studentName, level: level, alias: alias, email: email} });
  },
  studentDelete: function(studentId) {
    var Id = students.remove({ _id: studentId });
  },
  studentReset: function(studentId) {
    var studentId = students.update({ _id: studentId }, { $set: {XP: 0, coins: 0, HP: 0} });
  },
  studentXP: function(studentId,xp) {
    var Id =  students.update({ _id: studentId }, { $inc: {XP: xp} });
    classId=students.findOne({ '_id': studentId }).classId;
    if (classes.findOne({ '_id': classId}).CoinXP ) {
      var Id =  students.update({ '_id': studentId }, { $inc: {coins: xp} });
    }
  },
  studentHP: function(studentId,hp) {
    wc = parseInt(students.findOne({_id: studentId}).HP);
    if (wc <= hp) {
      var Id =  students.update({ _id: studentId }, { $set: {HP: 1} });
    } else {
      wc = parseInt(students.findOne({_id: studentId}).HP);
      nHP=parseInt(wc-hp);
      var Id =  students.update({ _id: studentId }, { $set: {HP: nHP} });
      //var Id =  students.update({ _id: studentId }, { $inc: {HP: -hp} });
    };
  },
  studentGroup: function(groupId,studentId) {
    var Id =  students.update({ _id: studentId }, { $set: {groupId: groupId}} );
  },
  studentBadge: function(studentId,badgeId) {
    n=students.find({ '_id': studentId, 'badges.badgeId': badgeId }).count();
    b=students.findOne({ '_id': studentId}).badges;
    var ns = _.where(b, {'badgeId': badgeId,'stock':undefined}).length;
    if (ns>0) {
      students.update({ _id: studentId }, { $pull: {badges: { badgeId: badgeId}}} );
      var badge =  {
        badgeId: badgeId,
        stock:ns+1,
        createdOn: new Date()
      };
      students.update({ _id: studentId }, { $push: {badges: badge}} );
    } else {
      if (n==0) {
        var badge =  {
          badgeId: badgeId,
          //stock:1,
          createdOn: new Date()
        };
        students.update({ _id: studentId }, { $push: {badges: badge}} );
      } else {
        students.update({ '_id': studentId, 'badges.badgeId': badgeId },{ $inc: { 'badges.$.stock': 1 } });
      }
    }
    /*
    n=students.find({ '_id': studentId, 'items.itemId': itemId }).count();
    if (n==0) {
      var item =  {
        itemId: itemId,
        stock:1,
        createdOn: new Date()
      };
      students.update({ _id: studentId }, { $push: {items: item}} );
    } else {
      students.update({ '_id': studentId, 'items.itemId': itemId },{ $inc: { 'items.$.stock': 1 } });
    }
    students.update({ _id: studentId }, { $inc: {coins: -price} });*/
  },
  studentBadgePull: function(studentId,badgeId) {
    b=students.findOne({ '_id': studentId}).badges;
    var s = _.findWhere(b, {'badgeId': badgeId}).stock;
    var ns = _.where(b, {'badgeId': badgeId,'stock':undefined}).length;
    if (ns>0) {
      students.update({ _id: studentId }, { $pull: {badges: { badgeId: badgeId}}} );
      if (ns>1) {
        var badge =  {
          badgeId: badgeId,
          stock:ns-1,
          createdOn: new Date()
        };
        students.update({ _id: studentId }, { $push: {badges: badge}} );
      }
    } else {
      if (s>1) {
        students.update({ '_id': studentId, 'badges.badgeId': badgeId}, { $inc: {'badges.$.stock':-1}} );
      } else {
        var Id =  students.update({ _id: studentId }, { $pull: {badges: { badgeId: badgeId}}} );
      }
    }
  },
  studentCard: function(studentId,cardId) {
    var card =  {
      cardId: cardId,
      usabled: false,
      waiting:false,
      createdOn: new Date()
    };
    var Id =  students.update({ _id: studentId }, { $push: {cards: card}} );
  },
  studentCardPull: function(studentId,cardId) {
    var Id =  students.update({ _id: studentId }, { $pull: {cards: { cardId: cardId}}} );
  },
  studentChrome: function(studentId,chromeId) {
    var chrome =  {
      chromeId: chromeId,
      createdOn: new Date()
    };
    var Id =  students.update({ _id: studentId }, { $push: {chromes: chrome}} );
  },
  studentChromePull: function(studentId,chromeId) {
    var Id =  students.update({ _id: studentId }, { $pull: {chromes: { chromeId: chromeId}}} );
  },
  studentWaitingCard: function(studentId,cardId) {
    var Id =  students.update({ '_id': studentId , 'cards.cardId': cardId}, { $set: { 'cards.$.waiting': true } } );
  },
  studentUseCard: function(studentId,cardId) {
    var Id =  students.update({ '_id': studentId , 'cards.cardId': cardId}, { $set: { 'cards.$.usabled': true } } );
  },
  studentUseItem: function(studentId,itemId) {
    var Id =  students.update({ '_id': studentId , 'items.itemId': itemId}, { $set: { 'items.$.usabled': true } } );
  },
  studentItemUse: function(studentId,itemId) {
    var Id =  students.update({ '_id': studentId, 'items.itemId': itemId}, { $inc: {'items.$.stock':-1}} );
    var Id =  students.update({ '_id': studentId, 'items.itemId': itemId}, { $set: { 'items.$.usabled': false }} );
    var Id =  students.update({ '_id': studentId, 'items.itemId': itemId}, { $set: { 'items.$.waiting': false }} );
  },
  usingCard: function(studentId,price) {
    var Id =  students.update({ _id: studentId }, { $inc: {coins: -price} });
  },
  studentWaitingItem: function(studentId,itemId) {
    var Id =  students.update({ '_id': studentId , 'items.itemId': itemId}, { $set: { 'items.$.waiting': true } } );
  },
  buyingItem: function(studentId,itemId,price) {
    //var n=students.findOne({ '_id': studentId, 'items.itemId': itemId },{ fields: { 'items.$.stock': 1 } }).items[0].stock;
    //console.log(n);
    n=students.find({ '_id': studentId, 'items.itemId': itemId }).count();
    if (n==0) {
      var item =  {
        itemId: itemId,
        stock:1,
        createdOn: new Date()
      };
      students.update({ _id: studentId }, { $push: {items: item}} );
    } else {
      students.update({ '_id': studentId, 'items.itemId': itemId },{ $inc: { 'items.$.stock': 1 } });
    }
    students.update({ _id: studentId }, { $inc: {coins: -price} });
  },
  incCoins: function(studentId,price) {
    var Id =  students.update({ _id: studentId }, { $inc: {coins: price} });
  },
  studentSelection: function(studentId) {
    if ( students.find( {"_id": studentId, "selected" : { $exists: false} } ).count() == 1 ) {
      var Id =  students.update({ _id: studentId }, { $set: {selected: 1} } );
    } else if ( parseInt(students.findOne({"_id": studentId}).selected) == 0 ) {
      var Id =  students.update({ _id: studentId }, { $set: {selected: 1} } );
      } else {
        var Id =  students.update({ _id: studentId }, { $set: {selected: 0} });
      }
  },
  studentPresent: function(studentId) {
    if ( students.find( {"_id": studentId, "present" : { $exists: false} } ).count() == 1 ) {
      var Id =  students.update({ _id: studentId }, { $set: {present: 1} } );
    } else if ( parseInt(students.findOne({"_id": studentId}).present) == 0 ) {
      var Id =  students.update({ _id: studentId }, { $set: {present: 1} } );
      } else {
        var Id =  students.update({ _id: studentId }, { $set: {present: 0} });
      }
  },
  studentMission: function(studentId,missionId) {
    var Id =  students.update({ _id: studentId }, { $set: {mission: missionId} } );
  },
  studentDiary: function(studentId,diary) {
    var Id =  students.update({ _id: studentId }, { $set: {diary: diary} } );
  },
  studentPortfolio: function(studentId,portfolio) {
    var Id =  students.update({ _id: studentId }, { $set: {portfolio: portfolio} } );
  },
  activeTask: function(studentId,activeTask) {
    var Id =  students.update({ _id: studentId }, { $set: { activeTask: activeTask } } );
  },
  /*addStar: function(studentId,star) {
    var incStar = {};
    incStar[star]=1;
    var Id =  students.update({ _id: studentId }, { $inc: incStar } );
  },
  removeStar: function(studentId,star) {
    var incStar = {};
    incStar[star]=-1;
    var Id =  students.update({ _id: studentId }, { $inc: incStar } );
  },*/
  updateStar: function(studentId,star,num) {
    var stars = {};
    stars[star]=num;
    var Id =  students.update({ _id: studentId }, { $set: stars } );
  },
  avatarUpdate: function(itemId,imageId) {
    var Id = students.update({ _id: itemId }, { $set: {avatar: imageId } });
  },
  noRandomStudent: function(rId) {
    var Id = students.update({ '_id': rId }, { $set: {'random': false } });
  },
  allRandomStudents: function(classId) {
    var Id = students.update({'classId': classId}, { $set: {'random': true } }, { multi: true});
  },
  allStudentsAbsents: function(classId) {
    var Id = students.update({'classId': classId}, { $set: {'present': 0 } }, { multi: true});
  },
  allStudentsPresents: function(classId) {
    var Id = students.update({'classId': classId}, { $set: {'present': 1 } }, { multi: true});
  }
  /*,
  chalChange: function(studentId,chalCP) {
    chals=students.findOne({_id:studentId}).challenges.findOne({chalId:cCP.chalId}).chalCP;
    alert(chals);
    console.log(chals.find());
    if ( true ) {
     //alert ("hola");
    } else {
      var Id =  students.update({ _id: studentId }, { $push: { challenges: chalCP } } );
      var Id =  students.update({ _id: studentId }, { $push: { challenges: chalCP } } );
    //}
  }*/
});
