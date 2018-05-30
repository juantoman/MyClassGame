Template.studentPage.helpers({
  student: function() {
    return students.findOne({ _id: Session.get('studentId') } );
  },
  challenge: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return challenges.find({classId: Session.get('classId')});
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
    emailUser=Meteor.users.findOne({_id: Meteor.userId()}).services.google.email;
    emailStudent=$('#sEmail').val();
    if ( emailStudent == emailUser ) {
      return true;
    } else {
      return false;
    }
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
    if ( Meteor.call('chalUpdatePoints', studentId, chalId, chalCP) )
    {
      return;
    } else {
      var chalCP = {
        studentId: studentId,
        chalId: chalId,
        chalCP: chalCP,
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
    n=diary.find({'studentId': Session.get('studentId')},{createdOn: {$gte: f}}).count();
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
  }
});
