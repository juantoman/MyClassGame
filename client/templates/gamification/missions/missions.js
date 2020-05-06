// The Browser API key obtained from the Google Developers Console.
// Replace with your own Browser API key, or your own key.
var developerKey;


// The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
var clientId;

// Replace with your own App ID. (Its the first number in your Client ID)
var appId;

// Scope to use to access user's Drive items.
var scope = ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/drive.file'];

var pickerApiLoaded = false;
var oauthToken;

// Use the Google API Loader script to load the google.picker script.
function loadPicker() {
  developerKey = mcgParameters.findOne().apiKey;
  clientId = mcgParameters.findOne().clientId;
  appId = mcgParameters.findOne().appId;
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
    //var upload = new google.picker.DocsUploadView().setIncludeFolders(true);
    //view.setMimeTypes("image/png,image/jpeg,image/jpg");
    var uploadView = new google.picker.DocsUploadView();

    var picker = new google.picker.PickerBuilder().
        addView(view).
        addView(uploadView).
        setLocale('es').
        setAppId(appId).
        setOAuthToken(oauthToken).
        setCallback(pickerCallback).
        build();
    picker.setVisible(true);
    //createFolder();

    /*var picker = new google.picker.PickerBuilder()
        .enableFeature(google.picker.Feature.NAV_HIDDEN)
        .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
        .setAppId(appId)
        .setLocale('es')
        .setOAuthToken(oauthToken)
        .addView(view)
        .addView(upload)
        .setDeveloperKey(developerKey)
        .setCallback(pickerCallback)
        .build();
     picker.setVisible(true);*/
  }
}

function createFolder(){
  var fileMetadata = {
    'name': 'Invoices',
    'mimeType': 'application/vnd.google-apps.folder'
  };
  window.gapi.client.drive.files.create({
    resource: fileMetadata,
    fields: 'id'
  }, function (err, file) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      console.log('Folder Id: ', file.id);
    }
});

}

// A simple callback implementation.
function pickerCallback(data) {
  if (data.action == google.picker.Action.PICKED) {
    var fileId = data.docs[0].id;
    //alert('The user selected: ' + fileId);
    //window.open('https://drive.google.com/open?id='+fileId,'_blank');
    Meteor.call('chalUpdateDrive', Session.get("taskId"), fileId);
    //createFolder();
    /*newPermission = new Permission();
    newPermission.setType("anyone");
    newPermission.setRole("reader");
    newPermission.setValue("");
    newPermission.setWithLink(true);
    service.permissions().insert(fileId, newPermission).execute();*/
  }
}

/*function renderWidget() {
  gapi.sharetoclassroom.render("widget-div",
      {"url": "https://www.google.com", "size": "30", "theme": "classic", "locale": "es-ES"} );
}*/

Template.missions.onRendered(function() {
  /*window.___gcfg = {
    parsetags: 'explicit',
  };*/
  $.getScript("https://apis.google.com/js/api.js");
  $.getScript("https://apis.google.com/js/platform.js");
  //renderWidget();
  $('.colorpicker').spectrum({
    type: "color",
    togglePaletteOnly: "true",
    showInput: "true",
    showInitial: "true",
    showAlpha: "true",
    showPalette: "true",
    showSelectionPalette: "true",
    chooseText: "OK",
    cancelText: "Cancelar",
    preferredFormat: "hex",
    move: function (color) {

    },
    show: function () {

    },
    beforeShow: function () {

    },
    hide: function () {

    },
    change: function() {

    },
    palette: [
        ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
        "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
        ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
        "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
        ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
        "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
        "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
        "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
        "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
        "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
        "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
        "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
        "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
        "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
    ]
  });
});

Template.missions.helpers({
  challenge: function() {
    return challenges.find({classId: Session.get('classId')}, {sort: {order: 1}});
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
  'submit form.missionFormCreate': function(event) {
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
    Session.set('chalId',this._id)
    Modal.show('notes');
  },
  'change .chalName': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      Meteor.call('chalUpdateName', this._id, event.currentTarget.value);
    } else {
      //Meteor.call('chalDelete',event.target.name);
    }
  },
  'change .chalDesc': function(event) {
    event.preventDefault();
    Meteor.call('chalUpdateDesc', this._id, event.currentTarget.value);
  },
  'click .chalDel': function(event) {
    event.preventDefault();
    Session.set('missionId',this._id)
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
  'change .nbDepCheck': function(event) {
    event.preventDefault();
    //alert(event.currentTarget.checked);
    Meteor.call('nbDepChange', this._id, event.currentTarget.checked);
  },
  'click .chalSave': function(event) {
    event.preventDefault();
    id=this._id;
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
    Meteor.call('chalMissionDelete', this._id, this.missionId, this.order);
  },
  'click .chalMissionUp': function(event) {
    event.preventDefault
    missionId=$(event.currentTarget).closest('.panel').attr("id");
    o=chalMissions.findOne({_id: this._id}).order;
    //Meteor.call('chalMissionOrder', this._id, 0);
    a=chalMissions.findOne({missionId: this.missionId, order: o-1})._id;
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
    s=chalMissions.findOne({missionId: this.missionId, order: o+1})._id;
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
  'click .chalMissionGrades': function(event) {
    event.preventDefault();
    //alert(this._id);
    //alert(challenges.findOne({_id: this.missionId}).IoG);
    Session.set('taskId',this._id)
    Modal.show('notes');
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
    //createFolder();
  },
  'click .btn-mup': function(event) {
    event.preventDefault();
    if (this.order!=1){
      a=challenges.findOne({missionId: this.missionId, order: this.order-1})._id;
      Meteor.call('missionOrder', a, this.order);
      Meteor.call('missionOrder', this._id, this.order-1);
      //Meteor.call('missionOrder', this._id, this.classId, this._order, 'up');
    }
    event.stopPropagation();
  },
  'click .btn-mdown': function(event) {
    event.preventDefault();
    a=challenges.findOne({missionId: this.missionId, order: this.order+1})._id;
    Meteor.call('missionOrder', a, this.order);
    Meteor.call('missionOrder', this._id, this.order+1);
    event.stopPropagation();
  },
  'change .missionColor': function(event) {
    event.preventDefault();
    Meteor.call('missionColorChange', this._id, event.currentTarget.value);
  },
  'click .schedulerBtn': function(event) {
    $('#modalScheduler').toggleClass('oculto');
    scheduler.init("scheduler_here", new Date(), "week");
    //Modal.show('scheduler');
  },
  'click .datetimepicker': function(event) {
        $(event.currentTarget).datetimepicker();
  },
});

Template.deleteMission.events({
  'submit form': function(event) {
    Meteor.call('chalDelete',Session.get('missionId'),Session.get('classId'));
    Modal.hide('deleteMission');
  }
});
