//import "../application/drive.js";
// The Browser API key obtained from the Google Developers Console.
// Replace with your own Browser API key, or your own key.
var developerKey = "AIzaSyBqyxpnFhDv1nOkTszttyDSXn2HPpznhZI";

// The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
var clientId = "422269930750-src3psqemmt1p6m8alujf9nvmook5c0d.apps.googleusercontent.com"

// Replace with your own App ID. (Its the first number in your Client ID)
var appId = "yB6YafY8yJqC2fr1vPVg6HTw";

// Scope to use to access user's Drive items.
var scope = ['https://www.googleapis.com/auth/drive'];

var pickerApiLoaded = false;
var oauthToken;

// Use the Google API Loader script to load the google.picker script.
function loadPicker() {
  gapi.load('auth', {'callback': onAuthApiLoad});
  gapi.load('picker', {'callback': onPickerApiLoad});
}

function onAuthApiLoad() {
  window.gapi.auth.authorize(
      {
        'client_id': clientId,
        'scope': scope,
        'immediate': false
      },
      handleAuthResult);
}

function onPickerApiLoad() {
  pickerApiLoaded = true;
  createPicker();
}

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    oauthToken = authResult.access_token;
    createPicker();
  }
}

// Create and render a Picker object for searching images.
function createPicker() {
  if (pickerApiLoaded && oauthToken) {
    var view = new google.picker.DocsView().setIncludeFolders(true).setOwnedByMe(true);
    //view.setMimeTypes("image/png,image/jpeg,image/jpg");
    var picker = new google.picker.PickerBuilder()
        .enableFeature(google.picker.Feature.NAV_HIDDEN)
        .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
        .setAppId(appId)
        .setLocale('es')
        .setOAuthToken(oauthToken)
        .addView(view)
        .addView(new google.picker.DocsUploadView())
        .setDeveloperKey(developerKey)
        .setCallback(pickerCallback)
        .build();
     picker.setVisible(true);
  }
}

// A simple callback implementation.
function pickerCallback(data) {
  if (data.action == google.picker.Action.PICKED) {
    var fileId = data.docs[0].id;
    //alert('The user selected: ' + fileId);
    //window.open('https://drive.google.com/open?id='+fileId,'_blank');
    Meteor.call('chalUpdateDrive', Session.get("taskId"), 'https://drive.google.com/open?id='+fileId);
  }
}

Template.missions.helpers({
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

Template.missions.events({
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
    Session.set('missionId',event.target.name)
    Modal.show('deleteMission');
    //Meteor.call('chalDelete',event.target.name);
  },
  'click #saveAdventure': function(event) {
    event.preventDefault();
    Meteor.call('saveAdventure', Session.get('classId'), $("#adventureName").val(), $("#adventureDesc").val(), $("#adventureWeb").val());
    $('#sn').html(classes.findOne({ _id: Session.get('classId') } ).adventureDesc);
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
  },
  'change .descTask': function(event) {
    event.preventDefault();
    Meteor.call('chalUpdateDescTask', this._id, event.currentTarget.value);
  },
  'click .duplicarMision': function(event) {
    event.preventDefault();
    Session.set('chalId',event.target.name);
    cId=Session.get('classId');
    var c = challenges.findOne({'_id': Session.get('chalId')});
    mId=c._id;
    delete c._id;
    missionName=c.chalName;
    c.chalName="Copia de " + missionName;
    Meteor.call('chalDuplicate',c,cId,mId);
  },
  'click .drive': function(event) {
    Session.set("taskId",this._id);
    loadPicker();
  },
});

Template.deleteMission.events({
  'submit form': function(event) {
    Meteor.call('chalDelete',Session.get('missionId'));
    Modal.hide('deleteMission');
  }
});
