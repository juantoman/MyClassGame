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

Template.studentProfile.onRendered(function() {
   $.getScript("https://widget.cloudinary.com/v2.0/global/all.js");
   $.getScript("https://media-library.cloudinary.com/global/all.js");
   grafica();
});

Template.studentProfile.helpers({
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
  },
  grupo: function() {
    if (this.groupId) {
      return groups.findOne({_id: this.groupId});
    } else {
      var group = {
        groupName:"Sin asignar"
      };
      return group;
    }
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
  'click .btn-store': function(event) {
    event.preventDefault();
    if ($(event.target).closest('div').attr("id")){
      Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    } else {
      Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    }
    Session.set('studentId',this._id);
    if ( Session.get('userType')=="teacher") {
      Modal.show('storeModal');
    }
  },
  'change #mission': function(event) {
    event.preventDefault();
    missionId=$(event.target).val();
    Meteor.call('studentMission',Session.get('studentId'),missionId);
  },
  'click .borrar': function(event) {
    event.preventDefault();
    log=behavioursLog.findOne({_id: event.target.name});
    student=log.student;
    bType=log.behaviourType;
    bId=log.behavior;
    beh=behaviours.findOne({_id: log.behavior});
    p=beh.points;
    if (log.behaviourType=="XP") {
      Meteor.call('studentXP', student, -p);
    }
    if (log.behaviourType=="HP") {
      Meteor.call('studentHP', student, -p);
    }
    if (log.behaviourType=="BG") {
      beh=badges.findOne({_id: log.behavior});
      p=beh.points;
      Meteor.call('studentXP', student, -p);
    }
    //alert(event.target.parentElement.parentElement.childElementCount);
    Meteor.call('behaviourLogDelete',event.target.name);
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

    cloudinary.openMediaLibrary({
      cloud_name: 'myclassgame',
      api_key: '614497274192783',
      multiple: true,
      max_files: 8,
      }, {
           /*insertHandler: function (data) {
             data.assets.forEach(asset => { console.log("Inserted asset:", 
               JSON.stringify(asset, null, 2)) })
           }*/
         }
      )
  },
  'change #Diary': function(event) {
    event.preventDefault();
    Meteor.call('studentDiary',Session.get('studentId'),$(event.target).val());
  },
  'change #Portfolio': function(event) {
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
    XP=parseInt(per*cXP/100);
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
        chalXP: XP,
        createdOn: new Date()
      };
      Meteor.call('chalInsertXP', chalXP);
      //Meteor.call('addStar', Session.get('studentId'), stars[per]);
    } else {
      aXP=challengesXP.findOne({'studentId': Session.get('studentId'), 'chalId': this._id} ).chalXP;
      Meteor.call('studentXP', Session.get('studentId'), -aXP);
      var behaviour = {
        classId: Session.get('classId'),
        student: Session.get('studentId'),
        behavior: "",
        behaviourType: 'XP',
        comment: "Cambio XP Tarea: '" + this.chalMissionDesc + "' ( " + -aXP + " XP )",
        evaluation: Session.get('evaluation'),
        createdOn: new Date()
      };
      Meteor.call('behaviourLogInsert', behaviour);
      //Meteor.call('removeStar', Session.get('studentId'), stars[aper]);
      Meteor.call('chalUpdateXP', Session.get('studentId'), this._id, per, XP);
      //Meteor.call('addStar', Session.get('studentId'), stars[per]);
    }
    Meteor.call('studentXP', Session.get('studentId'), XP);
    var behaviour = {
      classId: Session.get('classId'),
      student: Session.get('studentId'),
      behavior: "",
      behaviourType: 'XP',
      comment: "Tarea: '" + this.chalMissionDesc + "' ( " + XP + " XP )",
      evaluation: Session.get('evaluation'),
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
    $("#myChart").toggleClass("visible");
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
  'click .waitingCard': function(event) {
    event.preventDefault();
    Meteor.call('studentWaitingCard', Session.get('studentId'), this.cardId);
    Meteor.call('notificationInsert', Session.get('classId'), Session.get('studentId'), this.cardId);
  },
  'click .useCard': function(event) {
    event.preventDefault();
    if (students.findOne({'_id':Session.get('studentId')}).coins >= event.currentTarget.title){
      Meteor.call('studentCardPull', Session.get('studentId'), this.cardId);
      Meteor.call('usingCard', Session.get('studentId'), event.currentTarget.title);
    } else {
      swal({
        title: "¡No tienes bastantes monedas!",
        text: "¡Esfuérzate para conseguirlas y así poder comprar!",
        icon: "warning",
      });
    }
  },
  'click .btn-delete-student': function(event) {
    event.preventDefault();
    Modal.show('deleteStudent');
  },
  'click .btn-reset-student': function(event) {
    event.preventDefault();
    Modal.show('resetStudent');
  },
 'click .eImage': function(event) {
    event.preventDefault();
    Session.set('imageType','avatar');
    Session.set('idElementImage',this._id);
    if (Session.get('userType')=="teacher") {
      Modal.show('imagesTemplate');
    }
  }
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