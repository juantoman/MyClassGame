import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';

//Provar gmail-node

Meteor.startup(() => {

  API_SendGrid=mcgParameters.findOne({'_id':1}).API_SendGrid;
  process.env.MAIL_URL = 'smtp://apikey:'+API_SendGrid+'@smtp.sendgrid.net:587';

  //process.env.MAIL_URL = 'smtp://apikey:'+process.env.API_SendGrid+'@smtp.sendgrid.net:587';
  //Escribir en fichero local
  //fs = Npm.require('fs');
});
/*
Accounts.config({
    loginExpirationInDays: 0.02
})
*/
Accounts.emailTemplates.siteName = '@MyClassGame';

Accounts.emailTemplates.from = '@MyClassGame Admin <myclassgame@gmail.com>';

Accounts.emailTemplates.enrollAccount.subject = (user) => {
  return `Welcome to @MyClassGame, ${user.profile.name}`;
};

Accounts.emailTemplates.enrollAccount.text = (user, url) => {
  return 'You have been selected to participate in building a better future!'
    + ' To activate your account, simply click the link below:\n\n'
    + url;
};

Accounts.emailTemplates.resetPassword.from = () => {
  // Overrides the value set in `Accounts.emailTemplates.from` when resetting
  // passwords.
  return '@MyClassGame Admin <myclassgame@gmail.com>';
};
Accounts.emailTemplates.verifyEmail = {
   subject() {
      return "Activate your account now!";
   },
   text(user, url) {
      return `Hey ${user}! Verify your e-mail by following this link: ${url}`;
   }
};

Meteor.methods({
  mcgLog: function(texto) {
    //Log fichero local
    /*
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    fs.appendFile(process.env["PWD"] + '/myclassgame.log', dateTime + ' : ' + texto + '\n',
        function (err) {
            if (err) throw err;
              console.log('Done!');
        }
    );*/
  },
  createStudentUser: function(studentId,password,classId) {
    if ( ! students.findOne({ _id: studentId }).userCreated ) {
      var u=Accounts.createUser({email: studentId.substring(0,6)+'@myclassgame.tk',password: password});
      Meteor.users.update({ _id: u }, { $set: {userType: 'student', studentId: studentId} });
      Meteor.call('studentUserClassInsert', classId, u);
      var Id =  students.update({ _id: studentId }, { $set: {userCreated: true, userId:u} });
    }
  },
  deleteStudentUser: function(userId,studentId) {
    Meteor.users.remove({'_id':userId});
    var Id =  students.update({ _id: studentId }, { $set: {userCreated: false, userId:""} });
  },
  createParentUser: function(studentId,classId) {
    var u=Accounts.createUser({email: studentId.substring(0,6)+'@myclassgame.tk',password: studentId.substring(0,6)});
    Meteor.users.update({ _id: u }, { $set: {userType: 'student'} });
    Meteor.call('studentUserClassInsert', classId, u);
    var Id =  students.update({ _id: studentId }, { $set: {userCreated: true, userId:u} });
  },
  deleteParentUser: function(userId,studentId) {
    Meteor.users.remove({'_id':userId});
    var Id =  students.update({ _id: studentId }, { $set: {userCreated: false, userId:""} });
  },
  adminClass: function(hash) {
    return classes.findOne({"_id" : {'$regex' : hash }});
  },
  studentClassInsert: function(classId, studentId) {
    /*var user = Meteor.user();
    var type = _.extend(user.profile, {
      userType: userType
    });*/
    reglaClass="^" + classId;
    nc=classes.find({"_id" : {'$regex' : reglaClass }}).count();

    reglaStudent="^" + studentId;
    ns=students.find({"_id" : {'$regex' : reglaStudent }}).count();

    if (nc==1){
      cId=classes.findOne({"_id" : {'$regex' : reglaClass }})._id;
      if(Meteor.user().classes) {
        if (Meteor.user().classes.indexOf(cId)==-1){;
          Meteor.users.update({ _id:Meteor.userId() }, { $push: {classes: cId} });
        }
      } else {
        Meteor.users.update({ _id:Meteor.userId() }, { $push: {classes: cId} });
      }
    }
    if (ns==1){
      s=students.findOne({"_id" : {'$regex' : reglaStudent }});
      if(Meteor.user().classes) {
        if(Meteor.user().classes.indexOf(s.classId)==-1){
          Meteor.users.update({ _id:Meteor.userId() }, { $push: {classes: s.classId} });
        }
      } else {
        Meteor.users.update({ _id:Meteor.userId() }, { $push: {classes: s.classId} });
      }
      if (!s.userId) {
        students.update({ _id: s._id }, { $set: {userId: Meteor.userId() } });
      }
    }
  },
  importFromClassId: function(coId,cnId,elements) {
    reglaClass="^" + coId;
    cId="";
    if (classes.find({"_id" : {'$regex' : reglaClass }}).count()!=0){
      cId=classes.findOne({"_id" : {'$regex' : reglaClass }})._id;
    }
    if (cId!="") {
      if (elements.includes('fancy-checkbox-students')) {
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
          if (item.avatar) {
            if (!item.avatar.includes('http')) {
              i=images.findOne({'_id': item.avatar});
              delete i._id;
              i.classId=cnId;
              var idn = images.insert(i);
              item.avatar=idn;
            }
          }
          Meteor.call('studentInsert',item);
        });
      }
      if (elements.includes('fancy-checkbox-teams')) {
        groups.find({'classId': cId}).forEach(function(item){
          ida=item._id;
          delete item._id;
          item.classId=cnId;
          if (item.groupImg) {
            if (!item.groupImg.includes('http')) {
              i=images.findOne({'_id': item.groupImg});
              delete i._id;
              i.classId=cnId;
              var idn = images.insert(i);
              item.groupImg=idn;
            }
          }
          var idn = groups.insert(item);
          students.update({'classId': cnId, 'groupId': ida}, {$set: {'groupId': idn}}, { multi: true} );
        });
      }
      if (elements.includes('fancy-checkbox-events')) {
        randomEvents.find({'classId': cId}).forEach(function(item){
          delete item._id;
          item.classId=cnId;
          if (item.eventImage) {
            if (!item.eventImage.includes('http')) {
              i=images.findOne({'_id': item.eventImage});
              delete i._id;
              i.classId=cnId;
              var idn = images.insert(i);
              item.eventImage=idn;
            }
          }
          Meteor.call('randomEventInsert',item);
        });
      }
      if (elements.includes('fancy-checkbox-behaviours')) {
        behaviours.find({'classId': cId}).forEach(function(item){
          delete item._id;
          item.classId=cnId;
          if (item.behaviourImage) {
            if (!item.behaviourImage.includes('http')) {
              i=images.findOne({'_id': item.behaviourImage});
              delete i._id;
              i.classId=cnId;
              var idn = images.insert(i);
              item.behaviourImage=idn;
            }
          }
          Meteor.call('behaviourInsert',item);
        });
      }
      if (elements.includes('fancy-checkbox-convictions')) {
        convictions.find({'classId': cId}).forEach(function(item){
          delete item._id;
          item.classId=cnId;
          Meteor.call('convictionInsert',item);
        });
      }
      if (elements.includes('fancy-checkbox-badges')) {
        badges.find({'classId': cId}).forEach(function(item){
          delete item._id;
          item.classId=cnId;
          if (item.badgeImage) {
            if (!item.badgeImage.includes('http')) {
              i=images.findOne({'_id': item.badgeImage});
              delete i._id;
              i.classId=cnId;
              var idn = images.insert(i);
              item.badgeImage=idn;
            }
          }
          Meteor.call('badgeInsert',item);
        });
      }
      if (elements.includes('fancy-checkbox-powers')) {
        cards.find({'classId': cId}).forEach(function(item){
          delete item._id;
          item.classId=cnId;
          if (item.cardImage) {
            if (!item.cardImage.includes('http')) {
              i=images.findOne({'_id': item.cardImage});
              delete i._id;
              i.classId=cnId;
              var idn = images.insert(i);
              item.cardImage=idn;
            }
          }
          Meteor.call('cardInsert',item);
        });
      }
      if (elements.includes('fancy-checkbox-collections')) {
        chromes.find({'classId': cId}).forEach(function(item){
          delete item._id;
          item.classId=cnId;
          if (item.chromeImage) {
            if (!item.chromeImage.includes('http')) {
              i=images.findOne({'_id': item.chromeImage});
              delete i._id;
              i.classId=cnId;
              var idn = images.insert(i);
              item.chromeImage=idn;
            }
          }
          Meteor.call('chromeInsert',item);
        });
      }
      if (elements.includes('fancy-checkbox-store')) {
        store.find({'classId': cId}).forEach(function(item){
          delete item._id;
          item.classId=cnId;
          if (item.itemImage) {
            if (!item.itemImage.includes('http')) {
              i=images.findOne({'_id': item.itemImage});
              delete i._id;
              i.classId=cnId;
              var idn = images.insert(i);
              item.itemImage=idn;
            }
          }
          Meteor.call('itemInsert',item);
        });
      }
      if (elements.includes('fancy-checkbox-levels')) {
        levels.find({'classId': cId}).forEach(function(item){
          delete item._id;
          item.classId=cnId;
          Meteor.call('levelInsert',item);
        });
      }
      if (elements.includes('fancy-checkbox-quotes')) {
        quotes.find({'classId': cId}).forEach(function(item){
          delete item._id;
          item.classId=cnId;
          Meteor.call('quoteInsert',item);
        });
      }
      if (elements.includes('fancy-checkbox-missions')) {
        challenges.find({'classId': cId}).forEach(function(item){
          mId=item._id;
          delete item._id;
          item.classId=cnId;
          if (item.missionImg) {
            if (!item.missionImg.includes('http')) {
              i=images.findOne({'_id': item.missionImg});
              delete i._id;
              i.classId=cnId;
              var idn = images.insert(i);
              item.missionImg=idn;
            }
          }
          Meteor.call('chalDuplicate',item,cnId,mId);
        });
      }
      if (elements.includes('fancy-checkbox-quizzes')) {
        quizzes.find({'classId': cId}).forEach(function(item){
          qId=item._id;
          delete item._id;
          item.classId=cnId;
          Meteor.call('quizDuplicate',item,cnId,qId);
        });
      }
      if (elements.includes('fancy-checkbox-villains')) {
        villains.find({'classId': cId}).forEach(function(item){
          delete item._id;
          item.classId=cnId;
          if (item.villainImage) {
            if (!item.villainImage.includes('http')) {
              i=images.findOne({'_id': item.villainImage});
              delete i._id;
              i.classId=cnId;
              var idn = images.insert(i);
              item.villainImage=idn;
            }
          }
          Meteor.call('villainInsert',item);
        });
      }
      return true;
    } else {
      return false;
    }
  },
  'badgeAPI': function (res) {
    e=res.elementType;
    eId=res.elementId;
    sId=res.studentId;
    //console.log(e + " " + eId + " " +sId);
    regla="^"+sId;
    student=students.findOne({'_id':{$regex: regla}});
    if (e=="badge") {
      badge=badges.findOne({'_id':eId});
      s=students.findOne({'_id':student._id, 'badges.badgeId': eId});
      if ( ! s || s.badges.find( badge => badge.badgeId == eId).stock == 0) {
        Meteor.call('studentBadge', student._id, eId);
        var behaviour = {
          classId: student.classId,
          student: student._id,
          behavior: badge._id,
          behaviourType: 'Badge',
          'XP': parseInt(badge.points),
          'HP': 0,
          Coins: 0,
          Energy:0,
          evaluation: 1,
          comment: 'Insignia Externa ('+parseInt(badge.points)+'XP)',
          createdOn: new Date()
        };
        Meteor.call('behaviourLogInsert', behaviour);
        Meteor.call('studentXP', student._id, parseInt(badge.points));
        img=images.findOne({'_id':badge.badgeImage}).image_url;
        return "<h5>" + student.studentName + " ha conseguido:</h5><img src='" + img + "' width='100px' /><h4>" + badge.badgeName + "</h4>";
      } else {
        return student.studentName + ' ya tiene esa insignia';
      }
    }
  },
  'powerAPI': function (res) {
    e=res.elementType;
    eId=res.elementId;
    sId=res.studentId;
    //console.log(e + " " + eId + " " +sId);
    regla="^"+sId;
    student=students.findOne({'_id':{$regex: regla}});
    if (e=="power") {
      card=cards.findOne({'_id':eId});
      s=students.findOne({'_id':student._id, 'cards.cardId': eId});
      if ( ! s ) {
        Meteor.call('studentCard', student._id, eId);
        img=images.findOne({'_id':card.cardImage}).image_url;
        return "<h5>" + student.studentName + " ha conseguido:</h5><img src='" + img + "' width='100px' /><h4>" + card.cardName + "</h4>";
      } else {
        return student.studentName + ' ya tiene ese poder';
      }
    }
  },
  'collectionableAPI': function (res) {
    e=res.elementType;
    eId=res.elementId;
    sId=res.studentId;
    //console.log(e + " " + eId + " " +sId);
    regla="^"+sId;
    student=students.findOne({'_id':{$regex: regla}});
    if (e=="collectionable") {
      chrome=chromes.findOne({'_id':eId});
      s=students.findOne({'_id':student._id, 'chromes.chromeId': eId});
      if ( ! s || s.chromes.find( chrome => chrome.chromeId == eId).stock == 0) {
        Meteor.call('studentChrome', student._id, eId);
        img=images.findOne({'_id':chrome.chromeImage}).image_url;
        return "<h5>" + student.studentName + " ha conseguido:</h5><img src='" + img + "' width='100px' /><h4>" + chrome.chromeName + "</h4>";
      } else {
        return student.studentName + ' ya tiene ese coleccionable';
      }
    }
  },
  'itemAPI': function (res) {
    e=res.elementType;
    eId=res.elementId;
    sId=res.studentId;
    //console.log(e + " " + eId + " " +sId);
    regla="^"+sId;
    student=students.findOne({'_id':{$regex: regla}});
    if (e=="item") {
      item=store.findOne({'_id':eId});
      s=students.findOne({'_id':student._id, 'items.itemId': eId});
      if ( ! s || s.items.find( item => item.itemId == eId).stock == 0) {
        Meteor.call('buyingItem', student._id, eId, 0);
        img=images.findOne({'_id':item.itemImage}).image_url;
        return "<h5>" + student.studentName + " ha conseguido:</h5><img src='" + img + "' width='100px' /><h4>" + item.itemName + "</h4>";
      } else {
        return student.studentName + ' ya tiene ese artículo';
      }
    }
  }
});

// WebApp.connectHandlers.use('/studentXP', (req, res, next) => {
//   res.writeHead(200);
//   //student="^"+req.url.substring(1);
//   // studentId=students.findOne({'_id':{$regex: student}})._id;
//   console.log(req.query);
//   //Meteor.call('studentXP', studentId, 100);
//   //res.end(studentId + ' +100XP!!!');
//   res.end("Hola");
// });

Meteor.method("add-numbers", function (a, b) {
  return a + b;
}, {
  url: "add-numbers",
  getArgsFromRequest: function (request) {
    // Let's say we want this function to accept a form-encoded request with
    // fields named `a` and `b`.
    var content = request.body;

    // Since form enconding doesn't distinguish numbers and strings, we need
    // to parse it manually
    return [ parseInt(content.a, 10), parseInt(content.b, 10) ];
  }
})
