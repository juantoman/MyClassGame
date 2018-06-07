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
  inputDisabled: function() {
    if (Session.get('userType')=="teacher") {
     return "";
    } else {
     return "disabled";
    };
  },
  selectMissions: function(){
    return challenges.find( { classId: Session.get('classId'), type : "Misión" });
  },
  missionSelected: function(m){
    if ( groups.findOne({_id: Session.get('groupId')}).mission == m ) {
      return "selected"
    } else {
      return "";
    }
  },
  studentInNotebook: function() {
    inNote=false;
    students.find( { groupId: Session.get('groupId') } ).forEach( function(u) {
        i=u._id;
        emailUser=Meteor.users.findOne({_id: Meteor.userId()}).services.google.email;
        emailStudent=u.email;
        if ( emailStudent.toUpperCase() == emailUser.toUpperCase()) {
          inNote=true;
        }
    });
    return inNote;
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
      var trabajos=[];
      $('.puntos').find(".selectStudent").each( function() {
        i=this.id;
        v=this.value;
        var workStudent={
          studentId:i,
          work:v
        };
        trabajos.push(workStudent);
      });
      var notebookInput = {
        groupId:Session.get('groupId'),
        mission:$('#missionG').val(),
        done:$(event.target).find('[name=hecho]').val(),
        assesment:$('#assessment').val(),
        observations:$(event.target).find('[name=observaciones]').val(),
        works: trabajos,
        validated:false,
        createdOn: new Date()
      };
      //console.log(notebookInput);
      Meteor.call('notebookInsert',notebookInput);
    } else {
      alert("Ya has introducido una entrada hoy en tu diario!!!")
    }
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    //Modal.hide('groupModal');
    console.log(notebook.findOne( { "_id" : "ubeHXBtpXajsjxqbW", "works.studentId" : "CxJwSbRSG3FDQMWDo" } , { fields: { _id:0} } ).works);
    //Meteor.call('notebookProva');
    //notebook.update( { "_id" : "ubeHXBtpXajsjxqbW", "works.studentId" : "CxJwSbRSG3FDQMWDo" } , { $set: { 'works.$.work' : "29" } } );
    //Session.set('groupSelected', false);
  },
  'change #missionG': function(event) {
    event.preventDefault();
    missionId=$(event.target).val();
    Meteor.call('groupMission',Session.get('groupId'),missionId);
  }
});
