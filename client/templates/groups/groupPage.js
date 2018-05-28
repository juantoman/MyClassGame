Template.groupPage.helpers({
  students: function() {
    return students.find( { $or: [ { groupId: Session.get('groupId') }, { $and: [ { groupId: 0 } , { classId: Session.get('classId')  } ] } ] } );
  },
  studentInGroup: function(studentId) {
    if ( Session.get('groupId') ==  students.findOne({_id: studentId}).groupId ) { return "list-group-item-danger"; }
  },
  group: function() {
    return groups.findOne({ _id: Session.get('groupId') } );
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
  'click .btn-default': function(event) {
    event.preventDefault();
    //Modal.hide('groupModal');
    Session.set('groupSelected', false);
  }
});

/*Template.groupPage.events({
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
  'submit .diario': function(event) {
    event.preventDefault();
  },
  'click .btn-default': function() {
    Session.set('groupSelected', false);
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
  }
});
*/