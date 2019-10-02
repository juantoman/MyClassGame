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

Template.studentPage.onRendered(function() {
   $.getScript("https://widget.cloudinary.com/v2.0/global/all.js");
   $.getScript("https://media-library.cloudinary.com/global/all.js");
   grafica();
});

Template.studentPage.helpers({
  student: function() {
    return students.findOne({ _id: Session.get('studentId') } );
  },
  students: function() {
    return students.find({ classId: Session.get('classId') } );
  },
  mac: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return challenges.find({classId: Session.get('classId')});
  },
  challengesI: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return challenges.find({classId: Session.get('classId'),type:"Reto"});
  },
  challengesG: function() {
    return challenges.find({classId: Session.get('classId'),type:"Misión"});
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
  missions: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return challenges.find({classId: Session.get('classId'),type:"Misión"});
  },
  badges: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return students.findOne({_id: Session.get('studentId')}).badges;
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
        chalType:this.type,
        createdOn: new Date()
      };
      Meteor.call('chalInsertPoints', chalCP);
    }
    return "( " + cXP + " de " + t + " ): " + g;
  },
  missionsXPTotalI: function() {
    XPTotal=0;
    challenges.find({'classId':Session.get('classId'),'type':"Reto"}).forEach(function(c){
      chalMissions.find({'missionId':c._id}).forEach(function(cxp){
        XPTotal+=parseInt(cxp.chalMissionXP);
      });
    });
    return XPTotal;
  },
  missionsXPTotalG: function() {
    XPTotal=0;
    challenges.find({'classId':Session.get('classId'),'type':"Misión"}).forEach(function(c){
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
          return images.findOne({_id: classes.findOne({_id: Session.get('classId')}).studentImg}).image_url;
        }
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/v1542963357/proves/luke.png";
      }
    } else  {
      if (avatar.substring(0, 4)=="http") {
        return avatar;
      } else {
        return images.findOne({_id: avatar}).image_url;
      }
    }
  },
  inputDisabled: function() {
    if (Session.get('userType')=="teacher") {
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
  badge: function(){
    return badges.findOne({_id: this.badgeId});
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
  levelSelected: function(l){
    if ( students.findOne({_id: Session.get('studentId')}).level == l ) {
      return "selected"
    } else {
      return "";
    }
  },
  selectMissions: function(){
    return challenges.find( { classId: Session.get('classId'), type : "Misión" });
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
    if ( emailStudent.toUpperCase() == emailUser.toUpperCase() || Session.get('userType')=="teacher" ) {
      return "";
    } else {
      return "readonly";
    }
  },
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
            nm=cm;
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
          
          //console.log(nmm);
        /*}
        catch(err){
          console.error(nmm);
        }*/
        //console.log("Dep");
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
    /*nota=100*xp/max;
    Session.set('nXP',nota);
    return "( " + xp + "XP de un máximo de " + max + "XP ) = " + nota;*/
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
    i=images.findOne({ _id: Image } ).image_url;
    return i;
  }
});

Template.studentPage.events({
 
});

Template.deleteStudent.events({
  'submit form': function(event) {
    Meteor.call('studentDelete', Session.get('studentId'));
    Modal.hide('deleteStudent');
    Session.set('studentSelected', false);
    Session.set('groupSelected', false);
  }
});

Template.resetStudent.events({
  'submit form': function(event) {
    Meteor.call('studentReset', Session.get('studentId'));
    Modal.hide('resetStudent');
  }
});