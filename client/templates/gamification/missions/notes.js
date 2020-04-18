Template.notes.helpers({
  students: function() {
    return students.find( { classId: Session.get('classId')  } );
  },
  groups: function() {
    return groups.find( { classId: Session.get('classId')  } );
  },
  studentInGroup: function(studentId) {
    if ( Session.get('groupId') ==  students.findOne({_id: studentId}).groupId ) { return "list-group-item-danger"; }
  },
  /*groupName: function() {
    return groups.findOne( { _id: Session.get('groupId') }).groupName;
  },*/
  groupImg: function() {
    return groups.findOne( { _id: Session.get('groupId') }).groupImg;
  },
  CP: function(sId) {
    return chalPoints.findOne({'chalId':Session.get('chalId'),'studentId':sId}).chalCP;
  },
  mision: function() {
    mId=chalMissions.findOne({_id: Session.get('taskId')}).missionId;
    tipoM=challenges.findOne({_id: mId}).IoG;
    if( tipoM == "Grupal" ) {
     return true;
    } else {
     return false;
    };
  }  ,
  sog: function() {
    tipoM=challenges.findOne({_id: Session.get('chalId')}).IoG;
    if( tipoM == "Grupal" ) {
     return "por equipos";
    } else {
     return "por alumnos";
    };
  },
  activeInput: function(n) {
    per=challengesXP.findOne({'chalId':Session.get('taskId'),'studentId':this._id}).per;
    if (per==n) {
      return "active";
    }
  }
});

Template.notes.events({
  'click #notesSubmit': function(event) {
    event.preventDefault();
    /*$('.modal').find(".list-group-item").each( function() {
      i=this.id;
      Meteor.call('studentGroup', 0, i);
    });
    $('.modal').find(".list-group-item-danger").each( function() {
      i=this.id;
      Meteor.call('studentGroup', Session.get('groupId'), i);
    });
    gName=$("#gName").val();
    gImage=$("#gImage").val();
    Meteor.call('groupModify', Session.get('groupId'), gName, gImage);*/
    Modal.hide('notes');
  },
  'change .nota_g': function(event) {
    event.preventDefault();
    groupId=event.target.name;
    chalId=Session.get('chalId');
    chalCP=$(event.target).val();
    //alert("cambio" + studentId + " " + chalId + " " + chalCP);
    //console.log(chalPoints.findOne({ chalId: chalId, studentId: Session.get('studentId')}).chalCP);
    n=chalPoints.find({'studentId':groupId,chalId:chalId}).count();
    if ( n==1 ) {
      Meteor.call('chalUpdatePoints', groupId, chalId, chalCP);
    } else {
      var chalCP = {
        classId: Session.get('classId'),
        studentId: groupId,
        chalId: chalId,
        chalCP: chalCP,
        chalType:"Misión",
        createdOn: new Date()
      };
      Meteor.call('chalInsertPoints', chalCP);
    }
    nota=$(event.target).val();
    students.find( { groupId: groupId } ).forEach(function (item){
      n=chalPoints.find({'studentId':item._id,chalId:chalId}).count();
      if ( n==1 ) {
        Meteor.call('chalUpdatePoints', item._id, chalId, nota);
      } else {
        var chalCP = {
          classId: Session.get('classId'),
          studentId: item._id,
          chalId: chalId,
          chalCP: nota,
          chalType:"Misión",
          createdOn: new Date()
        };
        Meteor.call('chalInsertPoints', chalCP);
      }
    });
  },
  'change .nota_s': function(event) {
    event.preventDefault();
    studentId=event.target.name;
    chalId=Session.get('chalId');
    chalCP=$(event.target).val();
    //alert("cambio" + studentId + " " + chalId + " " + chalCP);
    //console.log(chalPoints.findOne({ chalId: chalId, studentId: Session.get('studentId')}).chalCP);
    n=chalPoints.find({'studentId':studentId,chalId:chalId}).count();
    if ( n==1 ) {
      Meteor.call('chalUpdatePoints', studentId, chalId, chalCP);
    } else {
      var chalCP = {
        classId: Session.get('classId'),
        studentId: studentId,
        chalId: chalId,
        chalCP: chalCP,
        chalType:"Reto",
        createdOn: new Date()
      };
      Meteor.call('chalInsertPoints', chalCP);
    }
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('notes');
  },
  'click .btn-emoticon': function(event) {
    event.preventDefault();
    //alert($(event.target).closest('div').attr("id"));
    var stars = {0:"rs", 20:"os", 40:"ys", 60:"ws", 80:"bs", 100:"gs"};
    per=$(event.currentTarget).find("input").val();
    task=chalMissions.findOne({'_id':Session.get('taskId')});
    XP=parseInt(per*task.chalMissionXP/100);
    mId=task.missionId;
    max=task.chalMissionXP;
    tipoM=challenges.findOne({_id: mId}).IoG;
    if( tipoM == "Grupal" ) {
      n=challengesXP.find({'studentId':this._id,chalId:Session.get('taskId')}).count();
      if ( n==1 ) {
        Meteor.call('chalUpdateXP', this._id, Session.get('taskId'), XP);
      } else {
        var chalXP = {
          classId: Session.get('classId'),
          studentId: this._id,
          missionId:mId,
          chalId: Session.get('taskId'),
          per: per,
          chalXP: XP,
          createdOn: new Date()
        };
        Meteor.call('chalInsertXP', chalXP);
      }
      students.find({'classId': Session.get('classId'), 'groupId': this._id}).forEach( function(u) {
        n=challengesXP.find({'studentId': u._id, 'chalId': Session.get('taskId')} ).count();
        if ( n==0 ) {
          var chalXP = {
            classId: Session.get('classId'),
            studentId: u._id,
            missionId:mId,
            chalId: Session.get('taskId'),
            per: per,
            chalXP: XP,
            createdOn: new Date()
          };
          Meteor.call('chalInsertXP', chalXP);
          //Meteor.call('addStar', Session.get('studentId'), stars[per]);
        } else {
          aXP=challengesXP.findOne({'studentId': u._id, 'chalId': Session.get('taskId')} ).chalXP;
          Meteor.call('studentXP', u._id, -aXP);
          var behaviour = {
            classId: Session.get('classId'),
            student: u._id,
            behavior: "",
            behaviourType: 'XP',
            comment: "Cambio XP Tarea: '" + task.chalMissionDesc + "' ( " + -aXP + " XP )",
            evaluation: Session.get('evaluation'),
            createdOn: new Date()
          };
          Meteor.call('behaviourLogInsert', behaviour);
          //Meteor.call('removeStar', Session.get('studentId'), stars[aper]);
          Meteor.call('chalUpdateXP', u._id, Session.get('taskId'), per, XP);
          //Meteor.call('addStar', Session.get('studentId'), stars[per]);
        }
        Meteor.call('studentXP',  u._id, XP);
        var behaviour = {
          classId: Session.get('classId'),
          student:  u._id,
          behavior: "",
          behaviourType: 'XP',
          comment: "Tarea: '" + task.chalMissionDesc + "' ( " + XP + " XP )",
          evaluation: Session.get('evaluation'),
          createdOn: new Date()
        };
        Meteor.call('behaviourLogInsert', behaviour);
        nrs=challengesXP.find({'studentId': u._id, 'per': '0'} ).count();
        Meteor.call('updateStar', u._id, stars[0], nrs);
        nos=challengesXP.find({'studentId': u._id, 'per': '20'} ).count();
        Meteor.call('updateStar', u._id, stars[20], nos);
        nys=challengesXP.find({'studentId': u._id, 'per': '40'} ).count();
        Meteor.call('updateStar', u._id, stars[40], nys);
        nws=challengesXP.find({'studentId': u._id, 'per': '60'} ).count();
        Meteor.call('updateStar', u._id, stars[60], nws);
        nbs=challengesXP.find({'studentId': u._id, 'per': '80'} ).count();
        Meteor.call('updateStar', u._id, stars[80], nbs);
        ngs=challengesXP.find({'studentId': u._id, 'per': '100'} ).count();
        Meteor.call('updateStar', u._id, stars[100], ngs);
      });
    } else {
      n=challengesXP.find({'studentId': this._id, 'chalId': Session.get('taskId')} ).count();
      if ( n==0 ) {
        var chalXP = {
          classId: Session.get('classId'),
          studentId: this._id,
          missionId:mId,
          chalId: Session.get('taskId'),
          per: per,
          chalXP: XP,
          createdOn: new Date()
        };
        Meteor.call('chalInsertXP', chalXP);
        //Meteor.call('addStar', Session.get('studentId'), stars[per]);
      } else {
        aXP=challengesXP.findOne({'studentId': this._id, 'chalId': Session.get('taskId')} ).chalXP;
        Meteor.call('studentXP', this._id, -aXP);
        var behaviour = {
          classId: Session.get('classId'),
          student: this._id,
          behavior: "",
          behaviourType: 'XP',
          comment: "Cambio XP Tarea: '" + task.chalMissionDesc + "' ( " + -aXP + " XP )",
          evaluation: Session.get('evaluation'),
          createdOn: new Date()
        };
        Meteor.call('behaviourLogInsert', behaviour);
        //Meteor.call('removeStar', Session.get('studentId'), stars[aper]);
        Meteor.call('chalUpdateXP', this._id, Session.get('taskId'), per, XP);
        //Meteor.call('addStar', Session.get('studentId'), stars[per]);
      }
      Meteor.call('studentXP',  this._id, XP);
      var behaviour = {
        classId: Session.get('classId'),
        student:  this._id,
        behavior: "",
        behaviourType: 'XP',
        comment: "Tarea: '" + task.chalMissionDesc + "' ( " + XP + " XP )",
        evaluation: Session.get('evaluation'),
        createdOn: new Date()
      };
      Meteor.call('behaviourLogInsert', behaviour);
      nrs=challengesXP.find({'studentId': this._id, 'per': '0'} ).count();
      Meteor.call('updateStar', this._id, stars[0], nrs);
      nos=challengesXP.find({'studentId': this._id, 'per': '20'} ).count();
      Meteor.call('updateStar', this._id, stars[20], nos);
      nys=challengesXP.find({'studentId': this._id, 'per': '40'} ).count();
      Meteor.call('updateStar', this._id, stars[40], nys);
      nws=challengesXP.find({'studentId': this._id, 'per': '60'} ).count();
      Meteor.call('updateStar', this._id, stars[60], nws);
      nbs=challengesXP.find({'studentId': this._id, 'per': '80'} ).count();
      Meteor.call('updateStar', this._id, stars[80], nbs);
      ngs=challengesXP.find({'studentId': this._id, 'per': '100'} ).count();
      Meteor.call('updateStar', this._id, stars[100], ngs);
    };
  },
});