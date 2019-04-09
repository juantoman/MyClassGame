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
    var badge =  {
      badgeId: badgeId,
      createdOn: new Date()
    };
    var Id =  students.update({ _id: studentId }, { $push: {badges: badge}} );
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
  studentWaitingCard: function(studentId,cardId) {
    var Id =  students.update({ '_id': studentId , 'cards.cardId': cardId}, { $set: { 'cards.$.waiting': true } } );
  },
  studentUseCard: function(studentId,cardId) {
    var Id =  students.update({ '_id': studentId , 'cards.cardId': cardId}, { $set: { 'cards.$.usabled': true } } );
  },
  studentCardPull: function(studentId,cardId) {
    var Id =  students.update({ _id: studentId }, { $pull: {cards: { cardId: cardId}}} );
  },
  buyingItem: function(studentId,itemId,price) {
    var item =  {
      itemId: itemId,
      createdOn: new Date()
    };
    var Id =  students.update({ _id: studentId }, { $inc: {coins: -price} });
    var Id =  students.update({ _id: studentId }, { $push: {items: item}} );
  },
  usingCard: function(studentId,price) {
    console.log(price);
    var Id =  students.update({ _id: studentId }, { $inc: {coins: -price} });
  },
  studentSelection: function(studentId) {
    if ( parseInt(students.findOne({"_id": studentId}).selected) == 0 ) {
      var Id =  students.update({ _id: studentId }, { $set: {selected: 1} } );  
    } else {
      var Id =  students.update({ _id: studentId }, { $set: {selected: 0} });
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
