import Chart from 'chart.js';

function grafica() {
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
  });
}

function ami(){
    try {
      emailUser=Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address;
    }
    catch(err) {
      emailUser=Meteor.users.findOne({_id: Meteor.userId()}).services.google.email;
    }
    emailStudent=$('#sEmail').val();
    if (emailUser.substring(0,6)==Session.get('studentId').substring(0,6)) {
      return true;
    }
    if ( emailStudent.toUpperCase() == emailUser.toUpperCase() || Session.get('userType')=="teacher" ) {
      return true;
    } else {
      return false;
    }
}

Template.studentProfile.onRendered(function() {
   $.getScript("https://widget.cloudinary.com/v2.0/global/all.js");
   $.getScript("https://media-library.cloudinary.com/global/all.js");
   if ( classes.findOne({_id: Session.get("classId")}).backImg ) {
    $(".studentProfile").css('background-image','url("'+images.findOne({_id: classes.findOne({_id: Session.get("classId")}).backImg}).image_url+'")');
    $(".opacityDiv").addClass('opacityProfile');
   }
   $('[data-toggle="tooltip"]').tooltip();
   //grafica();
});

Template.studentProfile.helpers({
  student: function() {
    return students.findOne({ _id: Session.get('studentId') } );
  },
  students: function() {
    return students.find({ classId: Session.get('classId') } );
  },
  studentId: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return this._id.substring(0,6);
  },
  mac: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return challenges.find({classId: Session.get('classId')});
  },
  challengesI: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    // if (Session.get('userType')=="teacher") {
       return challenges.find({classId: Session.get('classId'), IoG:"Individual"}, {sort: {order: 1}});
    // } else {if
    //   return challenges.find({classId: Session.get('classId'),missionVisible:true, IoG:"Individual"}, {sort: {order: 1}});
    // }
    //return challenges.find({classId: Session.get('classId'),IoG:"Individual"});
  },
  challengesG: function() {
    // if (Session.get('userType')=="teacher") {
       return challenges.find({classId: Session.get('classId'), IoG:"Grupal"}, {sort: {order: 1}});
    // } else {
    //   return challenges.find({classId: Session.get('classId'),missionVisible:true, IoG:"Grupal"}, {sort: {order: 1}});
    // }
    //return challenges.find({classId: Session.get('classId'),IoG:"Grupal"});
  },
  chalMissions: function(id) {
    return chalMissions.find({classId: Session.get('classId'), missionId: id}, {sort: {order: 1}});
  },
  disTeacher: function() {
    if (Session.get('userType')!="teacher") {
     return "disabled";
    };
  },
  disableDiv: function() {
    if (Session.get('userType')!="teacher") {
     return "disableDiv";
    };
  },
  /*
  missions: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return challenges.find({classId: Session.get('classId'),type:"Misión"});
  },
  */
  badges: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return students.findOne({_id: Session.get('studentId')}).badges;
  },
  badge: function(){
    return badges.findOne({_id: this.badgeId});
  },
  allBadges: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return badges.find( { classId : Session.get('classId') } , { sort : { level : 1 } } );
  },
  allChromes: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return chromes.find( { classId : Session.get('classId') } , { sort : { chromeLevel : 1 } } );
    // groups.find({'classId': cId}).forEach(function(item){
    //   ida=item._id;
    //   delete item._id;
    //   item.classId=cnId;
    //   var idn = groups.insert(item);
    //   students.update({'classId': cnId, 'groupId': ida}, {$set: {'groupId': idn}}, { multi: true} );
    // });
  },
  allItems: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return store.find( { classId : Session.get('classId') } , { sort : { itemLevel : 1 } } );
  },
  allCards: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return cards.find( { classId : Session.get('classId') } , { sort : { cardLevel : 1 } } );
  },
  studentBadgeStock: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    // n=students.find({'_id':Session.get('studentId'), 'badges.badgeId': this._id}).count();
    // if ( n == 0 ) {
    //   return 0;
    // }
    // s=students.findOne({'_id':Session.get('studentId'), 'badges.badgeId': this._id}).badges.find( badge => badge.badgeId == this._id).stock;
    // if ( s ) {
    //   return s;
    // } else {
    //   return 1;
    // }
    s=students.findOne({'_id':Session.get('studentId'), 'badges.badgeId': this._id});
    if ( ! s ) {
      return 0;
    } else if ( s.badges.find( badge => badge.badgeId == this._id).stock  ) {
      return s.badges.find( badge => badge.badgeId == this._id).stock;
    } else {
      return 1;
    }
    // if (students.find({'_id':Session.get('studentId'), 'badges.badgeId': this._id}).count()!=0) {
    //   return true;
    // } else {
    //   return false;
    // }
  },
  onlyStudentStock: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    if ( Session.get("allVisible") ) {
      return true;
    } else {
      return false;
      // n=students.find({'_id':Session.get('studentId'), 'badges.badgeId': this._id}).count();
      // if ( n == 0 ) {
      //   return false;
      // } else {
      //   return true;
      // }
    }
  },
  studentChromeStock: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    // n=students.find({'_id':Session.get('studentId'), 'chromes.chromeId': this._id}).count();
    // if ( n == 0 ) {
    //   return 0;
    // }
    s=students.findOne({'_id':Session.get('studentId'), 'chromes.chromeId': this._id});
    if ( ! s ) {
      return 0;
    } else if ( s.chromes.find( chrome => chrome.chromeId == this._id).stock  ) {
      return s.chromes.find( chrome => chrome.chromeId == this._id).stock;
    } else {
      return 1;
    }
    // n=Session.get('myChromes').find( chrome => chrome.chromeId == this._id);
    // if ( ! n ) {
    //   return 0;
    // } else if ( n.stock ) {
    //   return n.stock;
    // } else {
    //   return 1;
    // }
    // if (students.find({'_id':Session.get('studentId'), 'badges.badgeId': this._id}).count()!=0) {
    //   return true;
    // } else {
    //   return false;
    // }
  },
  studentItemStock: function() {
    s=students.findOne({'_id':Session.get('studentId'), 'items.itemId': this._id});
    if (!s) {
      return 0;
    } else {
      return s.items.find( item => item.itemId == this._id).stock;
    }
  },
  studentCardStock: function() {
    s=students.findOne({'_id':Session.get('studentId'), 'cards.cardId': this._id});
    if (!s) {
      return 0;
    } else {
      return 1;
    }
  },
  studentItemUsabled: function() {
    s=students.findOne({'_id':Session.get('studentId'), 'items.itemId': this._id});
    return s.items.find( item => item.itemId == this._id).usabled;
  },
  studentItemWaiting: function() {
    s=students.findOne({'_id':Session.get('studentId'), 'items.itemId': this._id});
    return s.items.find( item => item.itemId == this._id).waiting;
  },
  studentCardUsabled: function() {
    s=students.findOne({'_id':Session.get('studentId'), 'cards.cardId': this._id});
    return s.cards.find( card => card.cardId == this._id).usabled;
  },
  studentCardWaiting: function() {
    s=students.findOne({'_id':Session.get('studentId'), 'cards.cardId': this._id});
    return s.cards.find( card => card.cardId == this._id).waiting;
  },
  cards: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return students.findOne({_id: Session.get('studentId')}).cards;
  },
  cardTypeDesc: function(t) {
    type="";
    classes.findOne({'_id': Session.get('classId')}).cardTypes.forEach(function(tipo){
      if (t==tipo._id) {
        type=tipo.cardTypeDesc;
      }
    });
    return type;
    //return _.findWhere(classes.findOne({'_id': Session.get('classId')}).cardTypes, {'_id': t}).cardTypeDesc;
  },
  chromes: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return students.findOne({_id: Session.get('studentId')}).chromes;
  },
  items: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return students.findOne({_id: Session.get('studentId')}).items;
  },
  CP: function(cId) {
    return chalPoints.findOne({'chalId':cId,'studentId':Session.get('studentId')}).chalCP;
    //return challenges.find({classId: Session.get('classId')});
  },
  studentChalXP: function() {
    xp=challengesXP.findOne({'chalId':this._id,'studentId':Session.get('studentId')}).chalXP;
    return xp;
  },
  missionGrade: function() {
    cXP=0;
    t=0;
    chalMissions.find({'missionId':this._id}).forEach(function(c){
      t+=parseInt(c.chalMissionXP);
    });
    challengesXP.find({'missionId':this._id,'studentId':Session.get('studentId')}).forEach(function(c){
      cXP+=parseInt(c.chalXP);
    });
    g=parseInt(100*cXP/t);
    studentId=Session.get('studentId');
    chalId=this._id;
    chalCP=g;
    /*
    n=chalPoints.find({'studentId':Session.get('studentId'),chalId:chalId}).count();
    if ( n==1 ) {
      Meteor.call('chalUpdatePoints', studentId, chalId, chalCP);
    } else {
      var chalCP = {
        classId: Session.get('classId'),
        studentId: studentId,
        chalId: chalId,
        chalCP: chalCP,
        chalType:this.type,
        createdOn: new Date()
      };
      Meteor.call('chalInsertPoints', chalCP);
    }
    */
    return "( " + cXP + " de " + t + " ): " + g;
  },
  missionsXPTotalI: function() {
    XPTotal=0;
    challenges.find({'classId':Session.get('classId'),'IoG':"Individual"}).forEach(function(c){
      chalMissions.find({'missionId':c._id}).forEach(function(cxp){
        XPTotal+=parseInt(cxp.chalMissionXP);
      });
    });
    return XPTotal;
  },
  missionsXPTotalG: function() {
    XPTotal=0;
    challenges.find({'classId':Session.get('classId'),'IoG':"Grupal"}).forEach(function(c){
      chalMissions.find({'missionId':c._id}).forEach(function(cxp){
        XPTotal+=parseInt(cxp.chalMissionXP);
      });
    });
    return XPTotal;
  },
  activeInput: function(n) {
    per=challengesXP.findOne({'chalId':this._id,'studentId':Session.get('studentId')}).per;
    if (per==n) {
      return "active";
    }
  },
  image: function(avatar) {
    avatarVisible=classes.findOne({ _id: Session.get('classId') }).avatarVisible;
    if ( avatar=="" || !avatar || (  Session.get('userType') != "teacher"  &&  !avatarVisible ) ) {
      if ( classes.findOne({_id: Session.get('classId')}).studentImg ) {
        if (classes.findOne({_id: Session.get('classId')}).studentImg.substring(0, 4)=="http") {
          return classes.findOne({_id: Session.get('classId')}).studentImg;
        } else {
          cloudinary_url=images.findOne({_id: classes.findOne({_id: Session.get('classId')}).studentImg}).image_url;
          cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
          return cloudinary_url;
        }
      } else {
        return "https://avatars.dicebear.com/v2/avataaars/"+this._id+".svg";
      }
    } else  {
      if (avatar.substring(0, 4)=="http") {
        return avatar;
      } else {
        cloudinary_url=images.findOne({_id: avatar}).image_url;
        cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
        return cloudinary_url;
      }
    }
  },
  backImage: function(avatar) {
    cloudinary_url=images.findOne({_id: classes.findOne({_id: Session.get('classId')}).backImg}).image_url;
    cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
    return cloudinary_url;
  },
  inputDisabled: function() {
    if (Session.get('userType')=="teacher") {
     return "";
    } else {
     return "readonly";
    };
  },
  levelDisabled: function() {
    if (!classes.findOne({_id: Session.get('classId')}).xpChangeLevel) {
     return "";
    } else {
     return "disabled";
    };
  },
  /*roMission: function(type) {
    if (type == "Reto") {
     return "";
    } else {
     return "readonly";
    };
  }*/
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
  },
  moc: function(type) {
    if (type == "Reto")
    {
      return "has-error";
    } else {
      return "has-success"
    }
  },
  card: function(){
    return cards.findOne({_id: this.cardId});
  },
  chrome: function(){
    return chromes.findOne({_id: this.chromeId});
  },
  item: function(){
    return store.findOne({_id: this.itemId});
  },
  statistics: function() {
    return behavioursLog.find({classId: Session.get('classId'),student:Session.get('studentId')});
    //return behavioursLog.find({classId: Session.get('classId')},{sort: {student: -1}});
  },
  behaviour: function(){
    return behaviours.findOne({_id: this.behavior});
  },
  createdOnFormatted: function (date) {
    return moment(date).format('LLLL');
  },
  levelAutomatic: function(id) {
    xpChecked=classes.findOne({_id: Session.get('classId')}).xpChangeLevel;
    if (xpChecked) {
      levelXP=classes.findOne({_id: Session.get('classId')}).levelXP;
      XP=students.findOne({_id: id}).XP;
      n=parseInt(XP/levelXP);
    } else {
      n=students.findOne({_id: id}).level;
    }
    return n;
  },
  levelDesc: function(id) {
    xpChecked=classes.findOne({_id: Session.get('classId')}).xpChangeLevel;
    if (xpChecked) {
      levelXP=classes.findOne({_id: Session.get('classId')}).levelXP;
      XP=students.findOne({_id: id}).XP;
      n=String(parseInt(XP/levelXP));
    } else {
      n=String(students.findOne({_id: id}).level);
    }
    desc=levels.findOne({classId: Session.get('classId'),level: n }).levelDescription;
    return desc;
  },
  selectLevels: function(){
    return levels.find({classId: Session.get('classId')});
  },
  levelSelected: function(l,xp){
    if (classes.findOne({_id: Session.get('classId')}).xpChangeLevel ) {
      levelXP=classes.findOne({_id: Session.get('classId')}).levelXP;
      n=parseInt(xp/levelXP);
      if ( n == l ) {
        return "selected"
      } else {
        return "";
      }
    } else {
      if ( students.findOne({_id: Session.get('studentId')}).level == l ) {
        return "selected"
      } else {
        return "";
      }
    }
  },
  selectMissions: function(){
    //return challenges.find( { classId: Session.get('classId'), type : "Misión" });
    return challenges.find( { classId: Session.get('classId') } );
  },
  missionSelected: function(m){
    if ( students.findOne({_id: Session.get('studentId')}).mission == m ) {
      return "selected"
    } else {
      return "";
    }
  },
  mydiary: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return diary.find({studentId: Session.get('studentId')});
  },
  mision: function(){
    return challenges.findOne({_id: this.mission});
  },
  myuser: function() {
    try {
      emailUser=Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address;
    }
    catch(err) {
      emailUser=Meteor.users.findOne({_id: Meteor.userId()}).services.google.email;
    }
    emailStudent=$('#sEmail').val();
    if (emailUser.substring(0,6)==Session.get('studentId').substring(0,6)) {
      return true;
    }
    if (!emailStudent) {emailStudent=""}
    if ( emailStudent.toUpperCase() == emailUser.toUpperCase() || Session.get('userType')=="teacher" ) {
      return true;
    } else {
      return false;
    }
  },
  myuserEnabled: function() {
    try {
      emailUser=Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address;
    }
    catch(err) {
      emailUser=Meteor.users.findOne({_id: Meteor.userId()}).services.google.email;
    }
    emailStudent=$('#sEmail').val();
    if (emailUser.substring(0,6)==Session.get('studentId').substring(0,6)) {
      return "";
    }
    if ( emailStudent.toUpperCase() == emailUser.toUpperCase() || Session.get('userType')=="teacher" ) {
      return "";
    } else {
      return "readonly";
    }
  },
  /*
  notaXP: function(xp){
    max=students.findOne({classId: Session.get('classId')}, {sort: {XP: -1,_id: 1}}).XP;
    nota=100*xp/max;
    if (isNaN(nota)) { nota=0; }
    Session.set('nXP',nota);
    return "( " + xp + "XP de un máximo de " + max + "XP ) = " + nota;
  },
  notaBadges: function(nb){
    max=0;
    students.find({classId: Session.get('classId')}).forEach(function(bg){
      if ( bg.badges.length > max ) { max=bg.badges.length; }
    });
    nota=100*nb/max;
    if (isNaN(nota)) { nota=0; }
    Session.set('nBg',nota);
    return "( " + nb + " Badges de un máximo de " + max + " Badges ) = " + nota;
  },
  notaMision: function(cId){
    if ( ! challenges.findOne({'_id':cId}).notebookDependence ) {
      if (chalPoints.find({'chalId':cId,'studentId':Session.get('studentId')}).count() != 0) {
        n=chalPoints.findOne({'chalId':cId,'studentId':Session.get('studentId')}).chalCP;
        return n;
      }else {
        return "Misión sin calificar";
      }
    } else {
      if (chalPoints.find({'chalId':cId,'studentId':Session.get('studentId')}).count() != 0) {
        n=chalPoints.findOne({'chalId':cId,'studentId':Session.get('studentId')}).chalCP;
        //nm=notebookWork.find({'mission':cId,'studentId':Session.get('studentId'),validated:true}).count();
        //màxim registrats per tots els grups
        nm=0;
        notebookWork.find({'mission':cId}).forEach(function(sw){
          st=sw.studentId;
          cm=notebookWork.find({'mission':cId,'studentId':st}).count();
          if (nm<cm) {
            nm=cm;badges
          }
        });
        //registrats per usuari
        nm=notebookWork.find({'mission':cId,'studentId':Session.get('studentId')}).count();
        w=0;
        notebookWork.find({'mission':cId,'studentId':Session.get('studentId'),validated:true}).forEach(function(sw){ w+=parseInt(sw.work); });
        nota=(n*w/nm)/100;
        if (isNaN(nota)) { nota=0; }
        notas="( "+ n + " [nota] * " + w + " [puntos de trabajos validados] / " + nm + " [entradas cuaderno] ) / 100";
        return notas + " = " + nota;
      } else {
        return "Misión sin calificar";
      }
    }
  },
  notaMediaMisiones: function(){
    nmm=0;
    cm=0;
    notas="";
    challenges.find({classId: Session.get('classId'),type:"Misión"}).forEach(function(m){
      cId=m._id;
      //console.log(cId);
      if ( ! challenges.findOne({'_id':cId}).notebookDependence ) {
        //console.log(chalPoints.find({'chalId':cId,'studentId':Session.get('studentId')}).count());
        //console.log(chalPoints.find({'chalId':cId,'studentId':Session.get('studentId')}).count());
        if (chalPoints.find({'chalId':cId,'studentId':Session.get('studentId')}).count() != 0) {
          nota=parseInt(chalPoints.findOne({'chalId':cId,'studentId':Session.get('studentId')}).chalCP);
          if (isNaN(nota)) {
            nota=0;
          } else {
            if (notas=="") {
              notas=nota;
            } else {
              notas=notas+" + "+nota;
            }
            nmm+=nota;
            cm++;
            //console.log("pp");
          }
        }
      } else {
        //cId=m._id;
        //try {
          //console.log(chalPoints.find({'chalId':cId,'studentId':Session.get('studentId')}).count());
          if (chalPoints.find({'chalId':cId,'studentId':Session.get('studentId')}).count() != 0) {
            n=parseInt(chalPoints.findOne({'chalId':cId,'studentId':Session.get('studentId')}).chalCP);
            nm=0;
            //nm=notebookWork.find({'mission':cId,'studentId':Session.get('studentId'),validated:true}).count();
            //màxim registrats per tots els grups
            notebookWork.find({'mission':cId}).forEach(function(sw){
              st=sw.studentId;
              cnm=notebookWork.find({'mission':cId,'studentId':st}).count();
              if (nm<cnm) {
                nm=cnm;
              }
            });
            w=0;
            //registrats per usuari
            nm=notebookWork.find({'mission':cId,'studentId':Session.get('studentId')}).count();
            notebookWork.find({'mission':cId,'studentId':Session.get('studentId'),validated:true}).forEach(function(sw){ w+=parseInt(sw.work); });
            nota=(n*w/nm)/100;
            if (isNaN(nota)) {
              nota=0;
            } else {
              if (notas=="") {
                notas=nota;
              } else {
                notas=notas+" + "+nota;
              }
              nmm+=nota;
              cm++;
              //console.log(cm);
            }
          }
      }
    });
    //console.log(nmm);
    nota=nmm/cm;
    if (isNaN(nota)) { nota=0; }
    notas="( "+notas+" ) / "+cm;
    Session.set('nMM',nota);
    return notas + " = " + nota;
  },
  notaRetos: function(xp){
    nota=0;
    notas="";
    n=chalPoints.find({'studentId':Session.get('studentId'),chalType:"Reto"}).count();
    chalPoints.find({'studentId':Session.get('studentId'),chalType:"Reto"}).forEach(function(nc){
      nota+=parseInt(nc.chalCP);
      if (notas=="") {
        notas=nc.chalCP;
      } else {
        notas=notas+" + "+nc.chalCP;
      }
    });
    nota=nota/n;
    if (isNaN(nota)) { nota=0; }
    Session.set('nR',nota);
    notas="( "+notas+" ) / "+n;
    return  notas + " = " + nota;
  },
  notaHP: function(){
    //nHP=behavioursLog.aggregate({$group: {_id: '', nHP: { $sum: '$evaluation' }}},{$project: {_id: 0, nHP: '$evaluation'}});
    n=0;
    behavioursLog.find({classId: Session.get('classId'),student:Session.get('studentId'),behaviourType: 'HP'}).forEach(function(b){
      n+=parseInt(behaviours.findOne({_id: b.behavior}).points);
    });
    perHP=classes.findOne({_id: Session.get('classId')}).perHP;
    nota=perHP*n;
    if (isNaN(nota)) { nota=0; }
    Session.set('nHP',nota);
    notas=perHP + " * " + n + " HP "
    return notas + " = " + nota;
  },
  notaFinal: function(){
    perXP=classes.findOne({_id: Session.get('classId')}).perXP;
    perBG=classes.findOne({_id: Session.get('classId')}).perBG;
    perMissions=classes.findOne({_id: Session.get('classId')}).perMissions;
    perChallenges=classes.findOne({_id: Session.get('classId')}).perChallenges;
    perHP=classes.findOne({_id: Session.get('classId')}).perHP;
    nota=Session.get('nXP')*perXP/100+Session.get('nBg')*perBG/100+Session.get('nMM')*perMissions/100+Session.get('nR')*perChallenges/100-Session.get('nHP');
    if (isNaN(nota)) { nota=0; }
    notas="{ " + Session.get('nXP')*perXP/100 + " [ " + perXP + " % XP ] + " + Session.get('nBg')*perBG/100 + " [ " + perBG + " % BG ] + " + Session.get('nMM')*perMissions/100 + " [ " + perMissions + " % Misiones ] + " + Session.get('nR')*perChallenges/100 + " [ " + perChallenges + " % Retos ] } - " + Session.get('nHP') + " [ " + perHP + " * HP ]";
    return notas + " = " + nota;
  },
  */
  parent: function() {
    if (Session.get('userType')!="teacher") {
     return true;
    } else {
     return false;
    };
  },
  activeTask: function(task) {
    at=students.findOne({ _id: Session.get('studentId') } ).activeTask;
    if ( task == at ) {
     return "activeTask";
    }
  },
  image_url: function(Image) {
    cloudinary_url=images.findOne({ _id: Image } ).image_url;
    cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_150,f_auto,dpr_auto/')
    return cloudinary_url;
  },
  grupo: function() {
    if (this.groupId) {
      return groups.findOne({_id: this.groupId});
    } else {
      var group = {
        groupName:"NA"
      };
      return group;
    }
  },
  chatVisible: function() {
    if (classes.findOne({"_id": Session.get('classId')}).chatVisible) {
     return true;
    } else {
     return false;
    };
  },
  TeacherOrMissionVisible: function() {
    if (Session.get('userType')=="teacher" || this.missionVisible) {
      return true;
    } else {
      return false;
    };
  },
  TeacherOrTaskVisible: function() {
    if (Session.get('userType')=="teacher" || this.visible) {
      return true;
    } else {
      return false;
    };
  }
});

Template.studentProfile.events({
  'change .cp': function(event) {
    event.preventDefault();
    studentId=Session.get('studentId');
    chalId=event.target.id;
    chalCP=$(event.target).val();
    //alert("cambio" + studentId + " " + chalId + " " + chalCP);
    //console.log(chalPoints.findOne({ chalId: chalId, studentId: Session.get('studentId')}).chalCP);
    n=chalPoints.find({'studentId':Session.get('studentId'),chalId:chalId}).count();
    if ( n==1 ) {
      Meteor.call('chalUpdatePoints', studentId, chalId, chalCP);
    } else {
      var chalCP = {
        classId: Session.get('classId'),
        studentId: studentId,
        chalId: chalId,
        chalCP: chalCP,
        chalType:event.target.name,
        createdOn: new Date()
      };
      Meteor.call('chalInsertPoints', chalCP);
    }
  },
  'submit form.dataStudent': function(event) {
    event.preventDefault();
    var user = Meteor.user();
    studentId=Session.get('studentId');
    studentName=$(event.target).find('[name=sName]').val();
    level=$(event.target).find('[name=sLevel]').val();
    alias=$(event.target).find('[name=sAlias]').val();
    avatar=$(event.target).find('[name=sAvatar]').val();
    email=$(event.target).find('[name=sEmail]').val();
    Meteor.call('studentModify',studentId,studentName,level,alias,avatar,email);
  },
  'submit form.diario': function(event) {
    event.preventDefault();
    var f = new Date();
    d=f.getDate();
    m=f.getMonth()+1;
    y=f.getFullYear();
    hoy=m+"/"+d+"/"+y;
    n=diary.find({'studentId': Session.get('studentId'),'createdOn': {$gt: new Date(hoy)}}).count();
    if ( n == 0 )
    {
      var diaryInput = {
        classId: Session.get('classId'),
        studentId:Session.get('studentId'),
        mission:$('#mission').val(),
        what:$(event.target).find('[name=que]').val(),
        how:$(event.target).find('[name=como]').val(),
        understood:$(event.target).find('[name=entendido]').val(),
        notunderstood:$(event.target).find('[name=noentendido]').val(),
        validated:false,
        createdOn: new Date()
      };
      /*var start = moment("2018-05-29");
      var end = moment(d);
      end.diff(start, "days")
      alert(end.diff(start, "days"));*/

      Meteor.call('diaryInsert',diaryInput);
    } else {
      alert("Ya has introducido una entrada hoy en tu diario!!!")
    }

  },
  'click .btn-default': function() {
    Session.set('studentSelected', false);
  },
  'click .btn-xp': function(event) {
    event.preventDefault();
    if ($(event.target).closest('div').attr("id")){
      Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    } else {
      Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    }
    Session.set('studentId',this._id);
    if ( Session.get('userType')=="teacher") {
      Modal.show('xpModal');
    }
  },
  'click .btn-hp': function(event) {
    event.preventDefault();
    if ($(event.target).closest('div').attr("id")){
      Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    } else {
      Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    }
    Session.set('studentId',this._id);
    if ( Session.get('userType')=="teacher") {
      Modal.show('hpModal');
    }
  },
  'click .btn-badge': function(event) {
    event.preventDefault();
    if ($(event.target).closest('div').attr("id")){
      Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    } else {
      Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    }
    Session.set('studentId',this._id);
    if ( Session.get('userType')=="teacher") {
      Modal.show('badgeModal');
    }
  },
  'click .btn-cards': function(event) {
    event.preventDefault();
    if ($(event.target).closest('div').attr("id")){
      Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    } else {
      Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    }
    Session.set('studentId',this._id);
    if ( Session.get('userType')=="teacher") {
      Modal.show('cardsModal');
    }
  },
  'click .btn-chromes': function(event) {
    event.preventDefault();
    if ($(event.target).closest('div').attr("id")){
      Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    } else {
      Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    }
    Session.set('studentId',this._id);
    if ( Session.get('userType')=="teacher") {
      Modal.show('chromesModal');
    }
  },
  'click .btn-store': function(event) {
    event.preventDefault();
    if ($(event.target).closest('div').attr("id")){
      Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    } else {
      Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    }
    Session.set('studentId',this._id);
    if ( Session.get('userType')=="teacher" || $(event.currentTarget).hasClass("addBtn") ) {
        Modal.show('storeModal');
    }
  },
  'click .btn-coins': function(event) {
    event.preventDefault();
    if ($(event.target).closest('div').attr("id")){
      Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    } else {
      Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    }
    Session.set('studentId',this._id);
    if ( Session.get('userType')=="teacher" || $(event.currentTarget).hasClass("addBtn") ) {
        Modal.show('coinsModal');
    }
  },
  'change #mission': function(event) {
    event.preventDefault();
    missionId=$(event.target).val();
    Meteor.call('studentMission',Session.get('studentId'),missionId);
  },
  'click .borrar': function(event) {
    // event.preventDefault();
    // log=behavioursLog.findOne({_id: event.target.name});
    // student=log.student;
    // bType=log.behaviourType;
    // bId=log.behavior;
    // beh=behaviours.findOne({_id: log.behavior});
    // p=beh.points;
    // if (log.behaviourType=="XP") {
    //   Meteor.call('studentXP', student, -p);
    // }
    // if (log.behaviourType=="HP") {
    //   Meteor.call('studentHP', student, -p);
    // }
    // if (log.behaviourType=="BG") {
    //   beh=badges.findOne({_id: log.behavior});
    //   p=beh.points;
    //   Meteor.call('studentXP', student, -p);
    // }
    // //alert(event.target.parentElement.parentElement.childElementCount);
    // Meteor.call('behaviourLogDelete',event.target.name);
    event.preventDefault();
    if (this.behaviourType=="XP") {
      beh=behaviours.findOne({_id: this.behavior});
      p=beh.points;
      Meteor.call('studentXP', this.student, -p);
    }
    if (this.behaviourType=="teacherXP") {
      Meteor.call('studentXP', this.student, -parseInt(this.XP));
    }
    if (this.behaviourType=="Task") {
      Meteor.call('chalDeleteXP', this.student, this.behavior);
      Meteor.call('studentXP', this.student, -parseInt(this.XP));
    }
    if (this.behaviourType=="HP") {
      beh=behaviours.findOne({_id: this.behavior});
      p=beh.points;
      Meteor.call('studentHP',  this.student, -p);
    }
    if (this.behaviourType=="teacherHP") {
      Meteor.call('studentHP', this.student, parseInt(this.HP));
    }
    if (this.behaviourType=="BG") {
      beh=badges.findOne({_id: this.behavior});
      p=beh.points;
      Meteor.call('studentXP',  this.student, -p);
    }
    //alert(event.target.parentElement.parentElement.childElementCount);
    Meteor.call('behaviourLogDelete',this._id);
  },
  /*
  'click .avatarCloudinary': function(event) {
    event.preventDefault();
    if (Session.get('userType')=="teacher") {
      cloudinary.openUploadWidget({ cloudName: 'myclassgame', uploadPreset: 'myclassgame',  googleApiKey: 'AIzaSyBqyxpnFhDv1nOkTszttyDSXn2HPpznhZI'}, function(error, result){
        //console.log(result);
        if (result.event=="success"){
          $("#sAvatar").val(result.info.url);
        }
      });
    }
  },*/
  'click #cloudinaryList': function(event) {
    event.preventDefault();
    //cloudinary.image("sample", {"crop":"fill","gravity":"faces","width":300,"height":200,"format":"jpg"});
    /*
    cloudinary.openMediaLibrary({
      cloud_name: 'myclassgame',
      api_key: '614497274192783',
      multiple: true,
      max_files: 8,
      }, {
           insertHandler: function (data) {
             data.assets.forEach(asset => { console.log("Inserted asset:",
               JSON.stringify(asset, null, 2)) })

         }
      )}*/
  },
  'change .Diary': function(event) {
    event.preventDefault();
    Meteor.call('studentDiary',Session.get('studentId'),$(event.target).val());
  },
  'change .Portfolio': function(event) {
    event.preventDefault();
    Meteor.call('studentPortfolio',Session.get('studentId'),$(event.target).val());
  },
  'click .student_button': function(event) {
    event.preventDefault();
    Session.setPersistent('studentId',event.target.id);
    Session.set('studentSelected', true);
  },
  'click .all_button': function(event) {
    event.preventDefault();
    Session.set('studentSelected', false);
  },
  'click .ocultable': function(event) {
    event.preventDefault();
    if ($(event.target).next("table").hasClass("oculto")) {
      $(event.target).next("table").removeClass("oculto");
    } else {
      $(event.target).next("table").addClass("oculto");
    }
  },
  'click .btn-emoticon': function(event) {
    event.preventDefault();
    //alert($(event.target).closest('div').attr("id"));
    var stars = {0:"rs", 20:"os", 40:"ys", 60:"ws", 80:"bs", 100:"gs"};
    per=$(event.currentTarget).find("input").val();
    cXP=this.chalMissionXP;
    nXP=parseInt(per*cXP/100);
    mId=$(event.currentTarget).closest(".panel-info").attr("id");
    max=this.chalMissionXP;
    n=challengesXP.find({'studentId': Session.get('studentId'), 'chalId': this._id} ).count();
    if ( n==0 ) {
      var chalXP = {
        classId: Session.get('classId'),
        studentId: Session.get('studentId'),
        missionId:mId,
        chalId: this._id,
        per: per,
        chalXP: nXP,
        createdOn: new Date()
      };
      Meteor.call('chalInsertXP', chalXP);
      //Meteor.call('addStar', Session.get('studentId'), stars[per]);
    } else {
      aXP=challengesXP.findOne({'studentId': Session.get('studentId'), 'chalId': this._id} ).chalXP;
      Meteor.call('studentXP', Session.get('studentId'), -aXP);
      // var behaviour = {
      //   classId: Session.get('classId'),
      //   student: Session.get('studentId'),
      //   behavior: "",
      //   behaviourType: 'XP',
      //   comment: "Cambio XP Tarea: '" + this.chalMissionDesc + "' ( " + -aXP + " XP )",
      //   evaluation: Session.get('evaluation'),
      //   createdOn: new Date()
      // };
      Meteor.call('deleteLogTask', Session.get('studentId'), this._id);
      //Meteor.call('behaviourLogInsert', behaviour);
      //Meteor.call('removeStar', Session.get('studentId'), stars[aper]);
      Meteor.call('chalUpdateXP', Session.get('studentId'), this._id, per, nXP);
      //Meteor.call('addStar', Session.get('studentId'), stars[per]);
    }
    Meteor.call('studentXP', Session.get('studentId'), nXP);
    // var behaviour = {
    //   classId: Session.get('classId'),
    //   student: Session.get('studentId'),
    //   behavior: "",
    //   behaviourType: 'XP',
    //   comment: "Tarea: '" + this.chalMissionDesc + "' ( " + XP + " XP )",
    //   evaluation: Session.get('evaluation'),
    //   createdOn: new Date()
    // };
    var behaviour = {
      classId: Session.get('classId'),
      student: Session.get('studentId'),
      behavior: this._id,
      behaviourType: 'Task',
      'XP': nXP,
      'HP': 0,
      Coins: 0,
      Energy:0,
      evaluation: Session.get('evaluation'),
      comment: "Tarea: '" + this.chalMissionDesc + "' ( " + nXP + " XP )",
      createdOn: new Date()
    };
    Meteor.call('behaviourLogInsert', behaviour);
    nrs=challengesXP.find({'studentId': Session.get('studentId'), 'per': '0'} ).count();
    Meteor.call('updateStar', Session.get('studentId'), stars[0], nrs);
    nos=challengesXP.find({'studentId': Session.get('studentId'), 'per': '20'} ).count();
    Meteor.call('updateStar', Session.get('studentId'), stars[20], nos);
    nys=challengesXP.find({'studentId': Session.get('studentId'), 'per': '40'} ).count();
    Meteor.call('updateStar', Session.get('studentId'), stars[40], nys);
    nws=challengesXP.find({'studentId': Session.get('studentId'), 'per': '60'} ).count();
    Meteor.call('updateStar', Session.get('studentId'), stars[60], nws);
    nbs=challengesXP.find({'studentId': Session.get('studentId'), 'per': '80'} ).count();
    Meteor.call('updateStar', Session.get('studentId'), stars[80], nbs);
    ngs=challengesXP.find({'studentId': Session.get('studentId'), 'per': '100'} ).count();
    Meteor.call('updateStar', Session.get('studentId'), stars[100], ngs);
  },
  'click #graphBtn': function(event) {
    event.preventDefault();
    $("#myChart").toggleClass("oculto");
  },
  'click .challengeText': function(event) {
    Meteor.call('activeTask', Session.get('studentId'), this._id,);
  },
  'click .rubricaBtn': function(event) {
    event.preventDefault();
    $("#rubricaStudent"+this._id).toggleClass("oculto");
  },
  'click .demandCard': function(event) {
    event.preventDefault();
    if (students.findOne({'_id':Session.get('studentId')}).coins >= event.currentTarget.title){
      swal({
        title: TAPi18n.__('use') + " " + TAPi18n.__('power'),
        text: TAPi18n.__('areYouSure'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: TAPi18n.__('yes'),
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          Meteor.call('studentWaitingCard', Session.get('studentId'), this._id);
          Meteor.call('notificationInsert', Session.get('classId'), Session.get('studentId'), this._id,"card");
          swal({
            title: TAPi18n.__('solicitated') + " " +  TAPi18n.__('power'),
            type: 'success'
          })
        // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
        }
      })
    } else {
      swal({
        title: TAPi18n.__('noMoney'),
        text: TAPi18n.__('workHard'),
        icon: "warning",
      });
    }
    event.stopPropagation();
    /*
    swal({
      title: "¿Estás seguro de querer solicitar el uso de esta carta?",
      buttons: {
        NO: "No",
        SÍ: true,
      },
      icon: "warning"
    })
    .then((value) => {
      switch (value) {
        case "SÍ":
          Meteor.call('studentWaitingCard', Session.get('studentId'), this.cardId);
          Meteor.call('notificationInsert', Session.get('classId'), Session.get('studentId'), this.cardId,"card");
          break;
      }
    })*/
  },
  'click .useCard': function(event) {
    event.preventDefault();
    if (students.findOne({'_id':Session.get('studentId')}).coins >= event.currentTarget.title){
      swal({
        title: TAPi18n.__('use') + " " + TAPi18n.__('power'),
        text: TAPi18n.__('areYouSure'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: TAPi18n.__('yes'),
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          //Meteor.call('studentCardPull', Session.get('studentId'), this._id);
          Meteor.call('studentDemandCard', Session.get('studentId'), this._id);
          Meteor.call('usingCard', Session.get('studentId'), event.currentTarget.title);
          swal({
            title: TAPi18n.__('power') + " " +  TAPi18n.__('used'),
            type: 'success'
          })
        // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
        }
      })
      /*
      swal({
        title: "¿Estás seguro de querer utilizar esta carta?",
        buttons: {
          NO: "No",
          SÍ: true,
        },
        icon: "warning"
      })
      .then((value) => {
        switch (value) {
          case "SÍ":
            Meteor.call('studentCardPull', Session.get('studentId'), this.cardId);
            Meteor.call('usingCard', Session.get('studentId'), event.currentTarget.title);
            break;
        }
      })*/
    } else {
      swal({
        title: TAPi18n.__('noMoney'),
        text: TAPi18n.__('workHard'),
        icon: "warning",
      });
    }
    event.stopPropagation();
  },
  'click .demandItem': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('use') + " " +  TAPi18n.__('item'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('studentWaitingItem', Session.get('studentId'), this._id);
        Meteor.call('notificationInsert', Session.get('classId'), Session.get('studentId'), this._id,"item");
        swal({
          title: TAPi18n.__('solicitated') + " " +  TAPi18n.__('item'),
          type: 'success'
        })
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
    event.stopPropagation();
    /*
    swal({
      title: "¿Estás seguro de querer solicitar el uso de este artículo?",
      buttons: {
        NO: "No",
        SÍ: true,
      },
      icon: "warning"
    })
    .then((value) => {
      switch (value) {
        case "SÍ":
          Meteor.call('studentWaitingItem', Session.get('studentId'), this.itemId);
          Meteor.call('notificationInsert', Session.get('classId'), Session.get('studentId'), this.itemId,"item");
          break;
      }
    })*/
  },
  'click .useItem': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('use') + " " +  TAPi18n.__('item'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('studentItemUse', Session.get('studentId'), this._id);
        swal({
          title: TAPi18n.__('item') + " " +  TAPi18n.__('used'),
          type: 'success'
        })
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
    event.stopPropagation();
    /*
    swal({
      title: "¿Estás seguro de querer utilizar este artículo?",
      buttons: {
        NO: "No",
        SÍ: true,
      },
      icon: "warning"
    })
    .then((value) => {
      switch (value) {
        case "SÍ":
          Meteor.call('studentItemUse', Session.get('studentId'), this.itemId);
          break;
      }
    });*/
  },
  'click .btn-delete-student': function(event) {
    event.preventDefault();
    Modal.show('deleteStudent');
  },
  'click .btn-reset-student': function(event) {
    event.preventDefault();
    Modal.show('resetStudent');
  },
  'click .btn-create-student': function(event) {
    event.preventDefault();
    if ( ! this.userCreated || this.userCreated == null) {
      if (this.alias.split(" ").length -1 != 0) {
        swal({
          title: TAPi18n.__('cantCreateStudentAccount'),
          text: TAPi18n.__('noSpaces'),
          type: 'warning',
          confirmButtonText: 'Ok'
        })
      } else {
        Meteor.call('createStudentUser', Session.get('studentId'), this.alias, Session.get('classId'));
      }
    } else {
      Meteor.call('deleteStudentUser', this.userId, Session.get('studentId'));
    }
  },
 'click .eImage': function(event) {
    event.preventDefault();
    Session.set('imageType','avatar');
    Session.set('idElementImage',this._id);
    if (Session.get('userType')=="teacher") {
      Modal.show('imagesTemplate');
    }
  },
  'click .removeBtn': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('delete') + " " +  TAPi18n.__('collectionable'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('studentChromePull', Session.get('studentId'), this.chromeId);
        swal({
          title: TAPi18n.__('collectionable') + " " +  TAPi18n.__('deleted'),
          type: 'success'
        })
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
    /*
    swal({
      title: "¿Estás seguro de querer eliminar este cromo?",
      buttons: {
        NO: "No",
        SÍ: true,
      },
      icon: "warning"
    })
    .then((value) => {
      switch (value) {
        case "SÍ":
          Meteor.call('studentChromePull', Session.get('studentId'), this.chromeId);
          break;
      }
    });*/
  },
  'click .removeCardBtn': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('delete') + " " +  TAPi18n.__('power'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('studentCardPull', Session.get('studentId'), this.cardId);
        swal({
          title: TAPi18n.__('power') + " " +  TAPi18n.__('deleted'),
          type: 'success'
        })
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
    /*
    swal({
      title: "¿Estás seguro de querer eliminar este cromo?",
      buttons: {
        NO: "No",
        SÍ: true,
      },
      icon: "warning"
    })
    .then((value) => {
      switch (value) {
        case "SÍ":
          Meteor.call('studentChromePull', Session.get('studentId'), this.chromeId);
          break;
      }
    });*/
  },
  'click .removeBadgeBtn': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('delete') + " " +  TAPi18n.__('badge'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        p=$(event.currentTarget).data('points');
        Meteor.call('studentBadgePull', Session.get('studentId'), this.badgeId);
        Meteor.call('studentXP', Session.get('studentId'), -p);
        swal({
          title: TAPi18n.__('badge') + " " +  TAPi18n.__('fdeleted'),
          type: 'success'
        })
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
    /*
    swal({
      title: "¿Estás seguro de querer eliminar este cromo?",
      buttons: {
        NO: "No",
        SÍ: true,
      },
      icon: "warning"
    })
    .then((value) => {
      switch (value) {
        case "SÍ":
          Meteor.call('studentChromePull', Session.get('studentId'), this.chromeId);
          break;
      }
    });*/
  },
  'shown.bs.tab #STChat': function(e) {
    event.preventDefault();
    cont = document.getElementById("messageContainer");
    var elmnt = document.getElementsByClassName("messageNotRead")[0];
    if (elmnt) {
      elmnt.scrollIntoView(false);
      cont.scrollTop += 50;
    } else {
      cont.scrollTop = cont.scrollHeight;
    }
    /*
     e.target // newly activated tab
     e.relatedTarget // previous active tab
    */
  },
  'click .copyCodeBtn': function(event) {
    event.preventDefault();
    var copied =$(event.currentTarget).attr('value');
    const el = document.createElement('textarea');
    el.value = copied;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  },
  'click .flip-card': function(event) {
    event.preventDefault();
    $('.flip-card-inner').removeClass('flip-card-inner-rotated');
    $(event.target).closest('.flip-card-inner').toggleClass('flip-card-inner-rotated');
  },
  'click .flip-card-turn': function(event) {
    event.preventDefault();
    $('.flip-card-inner').removeClass('flip-card-inner-rotated');
    event.stopPropagation();
  },
  'click .flip-card-back': function(event) {
    event.preventDefault();
    //alert($(event.currentTarget).find(".flip-card-name").text());
    swal({
      title: $(event.currentTarget).find(".flip-card-name").text(),
      text: $(event.currentTarget).find(".flip-card-desc").text(),
      imageUrl: $(event.currentTarget).find(".flip-card-back-img").attr("src"),
      imageWidth: 200,
      imageAlt: $(event.currentTarget).find(".flip-card-name").text(),
      width: '300px'
    })
    event.stopPropagation();
  },
  'click .flip-card-badge-add': function(event) {
    event.preventDefault();
    l=0;
    xpChecked=classes.findOne({_id: Session.get('classId')}).xpChangeLevel;
    if (xpChecked) {
      levelXP=classes.findOne({_id: Session.get('classId')}).levelXP;
      XP=students.findOne({_id: Session.get('studentId')}).XP;
      l=parseInt(XP/levelXP);
    } else {
      l=parseInt(students.findOne({_id: Session.get('studentId')}).level);
    }
    if (this.level > l ) {
      swal({
        title: "Nivel del usuario inferior al de la insignia",
        type: 'warning'
      })
    } else {
      swal({
        title: TAPi18n.__('add') + " " +  TAPi18n.__('badge'),
        text: TAPi18n.__('areYouSure'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: TAPi18n.__('yes'),
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          Meteor.call('studentBadge', Session.get('studentId'), this._id);
          Meteor.call('studentXP', Session.get('studentId'), parseInt(this.points));
          swal({
            title: TAPi18n.__('badge') + " " +  TAPi18n.__('fadded'),
            type: 'success'
          })
        // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
        }
      })
    }
    event.stopPropagation();
  },
  'click .flip-card-badge-remove': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('delete') + " " +  TAPi18n.__('badge'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        p=$(event.currentTarget).data('points');
        Meteor.call('studentBadgePull', Session.get('studentId'), this._id);
        Meteor.call('studentXP', Session.get('studentId'), parseInt(-this.points));
        swal({
          title: TAPi18n.__('badge') + " " +  TAPi18n.__('fdeleted'),
          type: 'success'
        })
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
    event.stopPropagation();
  },
  'click .flip-card-chrome-add': function(event) {
    event.preventDefault();
    l=0;
    xpChecked=classes.findOne({_id: Session.get('classId')}).xpChangeLevel;
    if (xpChecked) {
      levelXP=classes.findOne({_id: Session.get('classId')}).levelXP;
      XP=students.findOne({_id: Session.get('studentId')}).XP;
      l=parseInt(XP/levelXP);
    } else {
      l=parseInt(students.findOne({_id: Session.get('studentId')}).level);
    }
    coins=students.findOne({_id: Session.get('studentId')}).coins;
    if (this.chromeLevel > l ) {
      swal({
        title: TAPi18n.__('lowLevel'),
        type: 'warning'
      })
    } else if (this.chromePrice > coins ) {
      swal({
        title: TAPi18n.__('noMoney'),
        type: 'warning'
      })
    } else {
      swal({
        title: TAPi18n.__('add') + " " +  TAPi18n.__('collectionable'),
        text: TAPi18n.__('areYouSure'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: TAPi18n.__('yes'),
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
            Meteor.call('studentChrome', Session.get('studentId'), this._id);
            Meteor.call('incCoins', Session.get('studentId'), -parseInt(this.chromePrice));
            // Meteor.call('studentBadge', Session.get('studentId'), this._id);
            // Meteor.call('studentXP', Session.get('studentId'), parseInt(this.points));
          swal({
            title: TAPi18n.__('collectionable') + " " +  TAPi18n.__('added'),
            type: 'success'
          })
        // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
        }
      })
    }
    event.stopPropagation();
  },
  'click .flip-card-chrome-remove': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('delete') + " " +  TAPi18n.__('collectionable'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        p=$(event.currentTarget).data('points');
        Meteor.call('studentChromePull', Session.get('studentId'), this._id);
        Meteor.call('incCoins', Session.get('studentId'), parseInt(this.chromePrice));
        // Meteor.call('studentBadgePull', Session.get('studentId'), this._id);
        // Meteor.call('studentXP', Session.get('studentId'), parseInt(-this.points));
        swal({
          title: TAPi18n.__('collectionable') + " " +  TAPi18n.__('deleted'),
          type: 'success'
        })
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
    event.stopPropagation();
  },
  'click .flip-card-item-add': function(event) {
    event.preventDefault();
    l=0;
    xpChecked=classes.findOne({_id: Session.get('classId')}).xpChangeLevel;
    if (xpChecked) {
      levelXP=classes.findOne({_id: Session.get('classId')}).levelXP;
      XP=students.findOne({_id: Session.get('studentId')}).XP;
      l=parseInt(XP/levelXP);
    } else {
      l=parseInt(students.findOne({_id: Session.get('studentId')}).level);
    }
    coins=students.findOne({_id: Session.get('studentId')}).coins;
    if (this.itemLevel > l ) {
      swal({
        title: TAPi18n.__('lowLevel'),
        type: 'warning'
      })
    } else if (this.price > coins ) {
      swal({
        title: TAPi18n.__('noMoney'),
        type: 'warning'
      })
    } else {
      swal({
        title: TAPi18n.__('add') + " " +  TAPi18n.__('item'),
        text: TAPi18n.__('areYouSure'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: TAPi18n.__('yes'),
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
            Meteor.call('buyingItem', Session.get('studentId'), this._id, this.price);
            //Meteor.call('incCoins', Session.get('studentId'), parseInt(this.price));
            // Meteor.call('studentBadge', Session.get('studentId'), this._id);
            // Meteor.call('studentXP', Session.get('studentId'), parseInt(this.points));
          swal({
            title: TAPi18n.__('item') + " " +  TAPi18n.__('added'),
            type: 'success'
          })
        // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
        }
      })
    }
    event.stopPropagation();
  },
  'click .flip-card-item-remove': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('delete') + " " +  TAPi18n.__('item'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        //p=$(event.currentTarget).data('points');
        Meteor.call('studentItemUse', Session.get('studentId'), this._id);
        Meteor.call('incCoins', Session.get('studentId'), parseInt(this.price));
        // Meteor.call('studentBadgePull', Session.get('studentId'), this._id);
        // Meteor.call('studentXP', Session.get('studentId'), parseInt(-this.points));
        swal({
          title: TAPi18n.__('item') + " " +  TAPi18n.__('deleted'),
          type: 'success'
        })
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
    event.stopPropagation();
  },
  'click .flip-card-card-add': function(event) {
    event.preventDefault();
    s=students.findOne({'_id':Session.get('studentId'), 'cards.cardId': this._id});
    if (!s) {
      l=0;
      xpChecked=classes.findOne({_id: Session.get('classId')}).xpChangeLevel;
      if (xpChecked) {
        levelXP=classes.findOne({_id: Session.get('classId')}).levelXP;
        XP=students.findOne({_id: Session.get('studentId')}).XP;
        l=parseInt(XP/levelXP);
      } else {
        l=parseInt(students.findOne({_id: Session.get('studentId')}).level);
      }
      coins=students.findOne({_id: Session.get('studentId')}).coins;
      if (this.cardLevel > l ) {
        swal({
          title: TAPi18n.__('lowLevel'),
          type: 'warning'
        })
      /*} else if (this.cardPrice > coins ) {
        swal({
          title: TAPi18n.__('noMoney'),
          type: 'warning'
        })*/
      } else {
        swal({
          title: TAPi18n.__('add') + " " +  TAPi18n.__('power'),
          text: TAPi18n.__('areYouSure'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: TAPi18n.__('yes'),
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {
              Meteor.call('studentCard', Session.get('studentId'), this._id);
              //Meteor.call('incCoins', Session.get('studentId'), -parseInt(this.cardPrice));
              // Meteor.call('studentBadge', Session.get('studentId'), this._id);
              // Meteor.call('studentXP', Session.get('studentId'), parseInt(this.points));
            swal({
              title: TAPi18n.__('power') + " " +  TAPi18n.__('added'),
              type: 'success'
            })
          // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
          }
        })
      }
    }
    event.stopPropagation();
  },
  'click .flip-card-card-remove': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('delete') + " " +  TAPi18n.__('power'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        //p=$(event.currentTarget).data('points');
        Meteor.call('studentCardPull', Session.get('studentId'), this._id);
        //Meteor.call('incCoins', Session.get('studentId'), parseInt(this.cardPrice));
        // Meteor.call('studentBadgePull', Session.get('studentId'), this._id);
        // Meteor.call('studentXP', Session.get('studentId'), parseInt(-this.points));
        swal({
          title: TAPi18n.__('item') + " " +  TAPi18n.__('deleted'),
          type: 'success'
        })
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
    event.stopPropagation();
  },
  'click .allVisible': function(event) {
    event.preventDefault();
    Session.set("allVisible",true);
  },
  'click .stockVisible': function(event) {
    event.preventDefault();
    Session.set("allVisible",false);
  },
  'click .seeDiary': function(event) {
    event.preventDefault();
    $('.diario').fadeIn();
  },
  'click .studentHistory': function(event) {
    event.preventDefault();
    Meteor.subscribe('behavioursLog',"class",Session.get('classId'));
    //Router.go('statisticsPage',{_id:Session.get('classId')});
  }
});
