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
    tipoM=challenges.findOne({_id: Session.get('chalId')}).IoG;
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
  }
});