Template.challenges.onRendered(function() {
  $('#adventureDesc').summernote();
});

Template.challenges.helpers({
  challenge: function() {
    return challenges.find({classId: Session.get('classId')});
  },
  chalMissions: function(id) {
    return chalMissions.find({classId: Session.get('classId'), missionId: id}, {sort: {order: 1}});
  },
  class: function() {
    return classes.findOne({ _id: Session.get('classId') } );
  },
  teacher: function() {
    if (Session.get('userType')!="teacher") {
     return "readonly";
    };
  },
  disTeacher: function() {
    if (Session.get('userType')!="teacher") {
     return "disabled";
    };
  },
  isTeacher: function() {
    if (Session.get('userType')=="teacher") {
      return true;
    } else {
      return false;
    };
  }  
});

Template.challenges.events({
  'submit form': function(event) {
    event.preventDefault();
    //alert($(event.target).find('[name=MoC]').val())
    //alert($(event.target).find('[id=notebookCheck]').prop('checked'));
    if ($(event.target).find('[name=IoG]').val() == "Grupal"){
      MoC="Misión";
    } else {
      MoC="Reto";
    };
    n=challenges.find({classId: Session.get('classId')}).count()+1;
    var chal = {
      classId: Session.get('classId'),
      type: MoC,
      IoG: $(event.target).find('[name=IoG]').val(),
      chalName: $(event.target).find('[name=chalName]').val(),
      chalDesc: $(event.target).find('[name=chalDesc]').val(),
      order: n,
      notebookDependence: $(event.target).find('[name=notebookCheck]').prop('checked'),
      createdOn: new Date()
    };
    Meteor.call('chalInsert', chal);
  },
  'click .notas': function(event) {
    event.preventDefault();
    Session.set('chalId',event.target.name)
    Modal.show('notes');
  },
  'change #chalName': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      Meteor.call('chalUpdateName', event.target.name, event.currentTarget.value);
    } else {
      Meteor.call('chalDelete',event.target.name);
    }
  },
  'change #chalDesc': function(event) {
    event.preventDefault();
    Meteor.call('chalUpdateDesc', event.target.name, event.currentTarget.value);
  },
  'click #chalDel': function(event) {
    event.preventDefault();
    Meteor.call('chalDelete',event.target.name);
  },
  'click #saveAdventure': function(event) {
    event.preventDefault();
    Meteor.call('saveAdventure', Session.get('classId'), $("#adventureName").val(), $("#adventureDesc").val(), $("#adventureWeb").val());
  },
  'click #embebido': function(event) {
    event.preventDefault();
    if ($("#iframeWeb").css("display")=="table"){
      $("#iframeWeb").css("display","none");
      event.currentTarget.value="Ver";
    } else {  
      $("#iframeWeb").css("display","table");
      event.currentTarget.value="Ocultar";
    }
    
  },
  /*'change #selectMoC': function(event) {
    event.preventDefault();
    if (event.currentTarget.value == "Misión"){
      $("#selectIoG").val("Grupal");
    } else {
      $("#selectIoG").val("Individual");
    };
  },
  'change #selectIoG': function(event) {
    event.preventDefault();
    if (event.currentTarget.value == "Grupal"){
      $("#selectMoC").val("Misión");
    } else {
      $("#selectMoC").val("Reto");
    };
  },*/
  'change #nbDepCheck': function(event) {
    event.preventDefault();
    //alert(event.currentTarget.checked);
    Meteor.call('nbDepChange', event.target.name, event.currentTarget.checked);
  },
  'click .chalSave': function(event) {
    event.preventDefault();
    id=event.currentTarget.id;
    n=chalMissions.find({missionId: id}).count()+1;
    //alert($(event.target).find('[name=MoC]').val())
    //alert($(event.target).find('[id=notebookCheck]').prop('checked')); 
    var chal = {
      classId: Session.get('classId'),
      missionId: id,
      order: n,
      chalMissionDesc: $("#chalMissionDesc"+id).val(),
      chalMissionXP: $("#chalMissionXP"+id).val(),
      r1: "",
      r2: "",
      r3: "",
      r4: "",
      r5: "",
      r6: "",
      createdOn: new Date()
    };
    Meteor.call('chalMissionInsert', chal);
  },
  'click .chalMissionDel': function(event) {
    event.preventDefault();
    missionId=$(event.currentTarget).closest('table').attr("id");
    //o=chalMissions.findOne({_id: id}).order;
    //o=this.order;
    //alert($(event.target).find('[name=MoC]').val())
    //alert($(event.target).find('[id=notebookCheck]').prop('checked')); 
    Meteor.call('chalMissionDelete', this._id, missionId, this.order);
  },
  'click .chalMissionUp': function(event) {
    event.preventDefault
    missionId=$(event.currentTarget).closest('.panel').attr("id");
    o=chalMissions.findOne({_id: this._id}).order;
    //Meteor.call('chalMissionOrder', this._id, 0);
    a=chalMissions.findOne({missionId: missionId, order: o-1})._id;
    Meteor.call('chalMissionOrder', a, o);
    Meteor.call('chalMissionOrder', this._id, o-1);
    //o=this.order;
    //alert($(event.target).find('[name=MoC]').val())
    //alert($(event.target).find('[id=notebookCheck]').prop('checked')); 
    //Meteor.call('chalMissionDelete', this._id, missionId, this.order);
  },
  'click .chalMissionDown': function(event) {
    event.preventDefault();
    missionId=$(event.currentTarget).closest('.panel').attr("id");
    o=chalMissions.findOne({_id: this._id}).order;
    //Meteor.call('chalMissionOrder', this._id, 0);
    s=chalMissions.findOne({missionId: missionId, order: o+1})._id;
    Meteor.call('chalMissionOrder', s, o);
    Meteor.call('chalMissionOrder', this._id, o+1);
    //o=this.order;
    //alert($(event.target).find('[name=MoC]').val())
    //alert($(event.target).find('[id=notebookCheck]').prop('checked')); 
    //Meteor.call('chalMissionDelete', this._id, missionId, this.order);
  },
  'click .chalMissionUpdate': function(event) {
    event.preventDefault();
    desc=$("#cmd"+this._id).val();
    xp=$("#cmxp"+this._id).val();
    Meteor.call('chalMissionUpdateData', this._id, desc, xp);
    //o=this.order;
    //alert($(event.target).find('[name=MoC]').val())
    //alert($(event.target).find('[id=notebookCheck]').prop('checked')); 
    //Meteor.call('chalMissionDelete', this._id, missionId, this.order);
  },
  'click #adventureBtn': function(event) {
    event.preventDefault();
    Modal.show('adventureTemplate');
  },
  'click .chalMissionRub': function(event) {
    event.preventDefault();
    $("#rubrica"+this._id).toggleClass("oculto");
  },
  'change .r1': function(event) {
    event.preventDefault();
    Meteor.call('chalUpdateR1', this._id, event.currentTarget.value);
  },
  'change .r2': function(event) {
    event.preventDefault();
    Meteor.call('chalUpdateR2', this._id, event.currentTarget.value);
  },
  'change .r3': function(event) {
    event.preventDefault();
    Meteor.call('chalUpdateR3', this._id, event.currentTarget.value);
  },
  'change .r4': function(event) {
    event.preventDefault();
    Meteor.call('chalUpdateR4', this._id, event.currentTarget.value);
  },
  'change .r5': function(event) {
    event.preventDefault();
    Meteor.call('chalUpdateR5', this._id, event.currentTarget.value);
  },
  'change .r6': function(event) {
    event.preventDefault();
    Meteor.call('chalUpdateR6', this._id, event.currentTarget.value);
  }
});
