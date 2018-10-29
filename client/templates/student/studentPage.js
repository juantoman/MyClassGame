Template.studentPage.helpers({
  student: function() {
    return students.findOne({ _id: Session.get('studentId') } );
  },
  mac: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return challenges.find({classId: Session.get('classId')});
  },
  challenges: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return challenges.find({classId: Session.get('classId'),type:"Reto"});
  },
  missions: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return challenges.find({classId: Session.get('classId'),type:"Misión"});
  },
  badges: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return students.findOne({_id: Session.get('studentId')}).badges;
  },
  CP: function(cId) {
    return chalPoints.findOne({'chalId':cId,'studentId':Session.get('studentId')}).chalCP;
    //return challenges.find({classId: Session.get('classId')});
  },
  image: function(avatar) {
    if ( avatar=="" || !avatar ) {
      if ( classes.findOne({_id: Session.get('classId')}).studentImg ) {
        return classes.findOne({_id: Session.get('classId')}).studentImg;
      } else {
        return "/images/user_128.png";
      }
    } else  {
      return avatar;
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
  diary: function() {
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
    try {
      n=chalPoints.findOne({'chalId':cId,'studentId':Session.get('studentId')}).chalCP;
      nm=notebookWork.find({'mission':cId,'studentId':Session.get('studentId'),validated:true}).count();
      w=0;
      notebookWork.find({'mission':cId,'studentId':Session.get('studentId'),validated:true}).forEach(function(sw){ w+=parseInt(sw.work); });
      nota=(n*w/nm)/100;
      if (isNaN(nota)) { nota=0; }
      notas="( "+ n + " [nota] * " + w + " [puntos de trabajo] / " + nm + " [trabajos realizados] ) / 100";
      return notas + " = " + nota;
    }
    catch(err){
      return "Misión sin calificar";
    }
  },
  notaMediaMisiones: function(){
    nmm=0;
    cm=0;
    notas="";
    challenges.find({classId: Session.get('classId'),type:"Misión"}).forEach(function(m){
      cId=m._id;
      try {
        n=chalPoints.findOne({'chalId':cId,'studentId':Session.get('studentId')}).chalCP;
        nm=notebookWork.find({'mission':cId,'studentId':Session.get('studentId'),validated:true}).count();
        w=0;
        notebookWork.find({'mission':cId,'studentId':Session.get('studentId'),validated:true}).forEach(function(sw){ w+=parseInt(sw.work); });
        nota=(n*w/nm)/100;
        if (isNaN(nota)) { nota=0; }
        if (notas=="") {
          notas=nota;
        } else {
          notas=notas+" + "+nota;
        }
        nmm+=nota;
        cm++;
      }
      catch(err){
        
      }
    });
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
  }
});

Template.studentPage.events({
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
    if ( Session.get('userType')=="teacher") {
      Modal.show('badgeModal');
    }
  },
  'click .btn-store': function(event) {
    event.preventDefault();
    if ($(event.target).closest('div').attr("id")){
      Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    } else {
      Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    }
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
  }
});
