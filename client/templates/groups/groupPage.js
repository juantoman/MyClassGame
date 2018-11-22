Template.groupPage.helpers({
  students: function() {
    return students.find( { $or: [ { groupId: Session.get('groupId') }, { $and: [ { groupId: 0 } , { classId: Session.get('classId')  } ] } ] } );
  },
  studentsIn: function() {
    return students.find( { groupId: Session.get('groupId') } );
  },
  studentInGroup: function(studentId) {
    if ( Session.get('groupId') ==  students.findOne({_id: studentId}).groupId ) { return "list-group-item-danger"; }
  },
  group: function() {
    return groups.findOne({ _id: Session.get('groupId') } );
  },
  notebook: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return notebook.find({groupId: Session.get('groupId')});
  },
  works: function(nbId) {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return notebookWork.find({notebookId: nbId});
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
  gImage: function(image) {
    if (image) {
     return image;
    } else {
      if (classes.findOne({_id: Session.get('classId')}).groupImg) {
        return classes.findOne({_id: Session.get('classId')}).groupImg;
      } else {
        return "/images/user_group_128.png";
      }
    }
  },
  gXP: function(idG) {
    xp=0;
    n=students.find( { groupId:idG } ).count();
    students.find( { groupId:idG } ).forEach(function(s){ xp+=s.XP; });
    r=parseInt(xp/n);
    return r;
  },
  selectMissions: function(){
    return challenges.find( { classId: Session.get('classId'), type : "Misión" , notebookDependence : true});
  },
  missionSelected: function(m){
    if ( groups.findOne({_id: Session.get('groupId')}).mission == m ) {
      return "selected"
    } else {
      return "";
    }
  },
  mision: function(){
    return challenges.findOne({_id: this.mission});
  },
  sn: function(sn){
    return students.findOne({_id: sn}).studentName;
  },
  sa: function(sa){
    return students.findOne({_id: sa}).alias;
  },
  studentInNotebook: function() {
    inNote=false;
    students.find( { groupId: Session.get('groupId') } ).forEach( function(u) {
        i=u._id;
        try {
          emailUser=Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address;
        }
        catch(err) {
          emailUser=Meteor.users.findOne({_id: Meteor.userId()}).services.google.email;
        }
        emailStudent=u.email;
        if ( emailStudent.toUpperCase() == emailUser.toUpperCase() || Session.get('userType')=="teacher" ) {
          inNote=true;
        }
    });
    return inNote;
  },
  myGroupEnabled: function() {
    inNote="readonly";
    students.find( { groupId: Session.get('groupId') } ).forEach( function(u) {
        i=u._id;
        try {
          emailUser=Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address;
        }
        catch(err) {
          emailUser=Meteor.users.findOne({_id: Meteor.userId()}).services.google.email;
        }
        emailStudent=u.email;
        if ( emailStudent.toUpperCase() == emailUser.toUpperCase() || Session.get('userType')=="teacher" ) {
          inNote="";
        }
    });
    return inNote;
  },
  parent: function() {
    if (Session.get('userType')=="parent") {
     return true;
    } else {
     return false;
    };
  }
});

Template.groupPage.events({
  /*'submit form#add_student_form': function(event) {
    event.preventDefault();
    var user = Meteor.user();
    var student = {
      classId: Session.get('classId'),
      studentName: $(event.target).find('[name=student-name]').val(),
      groupId: 0,
      createdOn: new Date()
    };
    Meteor.call('studentInsert', student);
    $('#add_student_modal').modal('hide');
  },
  'submit form#add_group_form': function(event) {
    event.preventDefault();
    var user = Meteor.user();
    var group = {
      classId: Session.get('classId'),
      groupName: $(event.target).find('[name=group-name]').val(),
      createdOn: new Date()
    };
    Meteor.call('groupInsert', group);
    $('#add_group_modal').modal('hide');
  },*/
  'click button.list-group-item': function(event) {
    if (Session.get('userType')=="teacher") {
      event.preventDefault();
      if ($(event.currentTarget).hasClass("list-group-item-danger")){
        $(event.currentTarget).removeClass("list-group-item-danger");
      } else {
        $(event.currentTarget).addClass("list-group-item-danger");
      }
    }
  },
  'click .btn-xp2': function(event) {
    event.preventDefault();
    //Session.setPersistent('groupId', event.target.name);
    if (Session.get('userType')=="teacher") {
      Modal.show('groupXPModal');
    }
  },
  'click .btn-hp2': function(event) {
    event.preventDefault();
    //Session.setPersistent('groupId', event.target.name);
    if (Session.get('userType')=="teacher") {
      Modal.show('groupHPModal');
    }
  },
  /*'click #hpModalSubmit': function(event) {
    event.preventDefault();
    $('#hp_modal').find(".list-group-item-danger").each( function() {
      i=this.id;
      p=parseInt($(this).find(".badge").text());
      var user = Meteor.user();
      var behaviour = {
        classId: Session.get('classId'),
        student: Session.get('studentId'),
        behavior: i,
        comment: $("#commentHP").val(),
        createdOn: new Date()
      };
      Meteor.call('behaviourLogInsert', behaviour);
      Meteor.call('studentHP', Session.get('studentId'), p);
    });
    $('#hp_modal').modal('hide');
  },
  'click #xpModalSubmit': function(event) {
    event.preventDefault();
    $('#xp_modal').find(".list-group-item-danger").each( function() {
      i=this.id;
      p=parseInt($(this).find(".badge").text());
      var user = Meteor.user();
      var behaviour = {
        classId: Session.get('classId'),
        student: Session.get('studentId'),
        behavior: i,
        behaviourType: 'XP',
        evaluation: Session.get('evaluation'),
        comment: $("#commentXPGroup").val(),
        comment: $("#commentXP").val(),
        createdOn: new Date()
      };
      Meteor.call('behaviourLogInsert', behaviour);
      Meteor.call('studentXP', Session.get('studentId'), p);
    });
    $('#xp_modal').modal('hide');
  },*/
  'submit form.dataStudent': function(event) {
    event.preventDefault();
    $('.list-group').find(".list-group-item").each( function() {
      i=this.id;
      Meteor.call('studentGroup', 0, i);
    });
    $('.list-group').find(".list-group-item-danger").each( function() {
      i=this.id;
      Meteor.call('studentGroup', Session.get('groupId'), i);
    });
    gName=$("#gName").val();
    gImage=$("#gImage").val();
    Meteor.call('groupModify', Session.get('groupId'), gName, gImage);
    //Modal.hide('groupModal');
  },
  'submit form.notebook': function(event) {
    event.preventDefault();
    var f = new Date();
    d=f.getDate();
    m=f.getMonth()+1;
    y=f.getFullYear();
    hoy=m+"/"+d+"/"+y;
    n=notebook.find({'groupId': Session.get('groupId'),'createdOn': {$gt: new Date(hoy)}}).count();
    if ( n == 0 )
    {
      //var trabajos=[];
      var notebookInput = {
        classId: Session.get('classId'),
        groupId:Session.get('groupId'),
        mission:$('#missionG').val(),
        done:$(event.target).find('[name=hecho]').val(),
        assesment:$('#assessment').val(),
        observations:$(event.target).find('[name=observaciones]').val(),
        //works: trabajos,
        validated:false,
        seen:false,
        createdOn: new Date()
      };
      //console.log(notebookInput);
      nid=Meteor.call('notebookInsert',notebookInput);
      $('.puntos').find(".selectStudent").each( function() {
        i=this.id;
        v=this.value;
        var workStudent={
          classId: Session.get('classId'),
          notebookId: Session.get("nid"),
          mission:$('#missionG').val(),
          studentId:i,
          work:v
        };
        Meteor.call('notebookWorkInsert',workStudent);
        //trabajos.push(workStudent);
      });
    } else {
      alert("Ya has introducido una entrada hoy en tu diario!!!")
    }
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    //Modal.hide('groupModal');
    //console.log(notebook.findOne( { "_id" : "ubeHXBtpXajsjxqbW", "works.studentId" : "CxJwSbRSG3FDQMWDo" } , { fields: { _id:0} } ).works);
    //Meteor.call('notebookProva');
    //notebook.update( { "_id" : "ubeHXBtpXajsjxqbW", "works.studentId" : "CxJwSbRSG3FDQMWDo" } , { $set: { 'works.$.work' : "29" } } );
    Session.set('groupSelected', false);
  },
  'change #missionG': function(event) {
    event.preventDefault();
    missionId=$(event.target).val();
    Meteor.call('groupMission',Session.get('groupId'),missionId);
  },
  'change .seen': function(event) {
    event.preventDefault();
    Meteor.call('seenChange', event.currentTarget.value, event.currentTarget.checked);
  },
  'change .validated': function(event) {
    event.preventDefault();
    Meteor.call('seenChange', event.currentTarget.value, true);
    Meteor.call('validatedChange', event.currentTarget.value, event.currentTarget.checked);
    Meteor.call('validatedWork', event.currentTarget.value, event.currentTarget.checked);
  },
  'change #Diary': function(event) {
    event.preventDefault();
    Meteor.call('groupDiary',Session.get('groupId'),$(event.target).val());
  },
  'change #Portfolio': function(event) {
    event.preventDefault();
    Meteor.call('groupPortfolio',Session.get('groupId'),$(event.target).val());
  }
});
