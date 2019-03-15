Template.studentsPage.onRendered(function() {
  $.getScript("https://apis.google.com/js/api.js");
  try {
    emailUser=Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address;
  }
  catch(err) {
    emailUser=Meteor.users.findOne({_id: Meteor.userId()}).services.google.email;
  }
  currentStudent=students.findOne({'classId': Session.get('classId'),'email': emailUser})._id;
  Session.set('currentStudent',currentStudent);
});

// The Browser API key obtained from the Google Developers Console.
// Replace with your own Browser API key, or your own key.
var developerKey = "AIzaSyDnHOEU_r2pePVwDhw12EALhMFllO9IB_0";

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
    window.open('https://drive.google.com/open?id='+fileId,'_blank')
  }
}

Template.studentsPage.helpers({
  students: function() {
    var sortOrder = {};
    if (Session.get('invertOrder')=="checked") {
      sortOrder[Session.get('orderStudents')]=-1;
    } else {
      sortOrder[Session.get('orderStudents')]=1;
    }
    sortOrder["_id"]=-1;
    return students.find({'classId': Session.get('classId')}, {sort: sortOrder});
  },
  image: function(avatar) {
    avatarVisible=classes.findOne({ _id: Session.get('classId') }).avatarVisible;
    if ( avatar=="" || !avatar || (  Session.get('userType') != "teacher"  &&  !avatarVisible ) ) {
    //if ( avatar=="" || !avatar || Session.get('userType') != "teacher") {
      if ( classes.findOne({_id: Session.get('classId')}).studentImg ) {
        return classes.findOne({_id: Session.get('classId')}).studentImg;
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/v1542963357/proves/luke.png";
      }
    } else  {
      return avatar;
    }
  },
  grid: function() {
    if ( Session.get('golBtn') == "grid" ) {
      return true;
    } else {
      return false;
    }
  },
  grupo: function() {
    if (this.groupId) {
      return groups.findOne({_id: this.groupId});
    } else {
      var group = {
        groupName:"Sin asignar"
      };
      return group;
    }
  },
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
  },
  parent: function() {
    if (Session.get('userType')!="teacher") {
     return true;
    } else {
     return false;
    };
  },
  modalTeacher: function() {
    if (Session.get('userType')=="teacher") {
     //return "#mod_student_modal";
    } else {
     return "";
    }
  },
  myuser: function(emailStudent) {
    //alert("hola");
    try {
      emailUser=Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address;
    }
    catch(err) {
      emailUser=Meteor.users.findOne({_id: Meteor.userId()}).services.google.email;
    }
    if ( emailStudent.toUpperCase() == emailUser.toUpperCase() ) {
      return "myuser";
    } else {
      return "";
    }
  },
  thumbSelected: function(id) {
    if ( parseInt(students.findOne({"_id": id}).selected) == 1 ) {
      return 'userSelected';
    } else {
      return 'userNotSelected';
    }
  },
  checkSelected: function(s) {
    if ( s ) {
      return 'checked';
    }
  },
  studentSelected: function(s) {
    if ( s ) {
      return 'studentSelected';
    }
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
  }
});

Template.studentsPage.events({
  'click .btn-delete-student': function(event) {
    event.preventDefault();
    Session.set('studentId', event.target.name);
    Modal.show('deleteStudent');
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
   'click .btn-cards': function(event) {
    event.preventDefault();
    if ($(event.target).closest('div').attr("id")){
      Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    } else {
      Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    }
    if ( Session.get('userType')=="teacher") {
      Modal.show('cardsModal');
    }
  },
  'click .info-list': function(event) {
    event.preventDefault();
    Session.set('nXP',0);
    Session.set('nBg',0);
    Session.set('nMM',0);
    Session.set('nR',0);
    Session.set('nHP',0);
    Session.setPersistent('studentId', $(event.target).closest('tr').attr("id"));
    Session.set('studentSelected', true);
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
  'click .foto,.info-grid': function(event) {
    event.preventDefault();
    Session.set('nXP',0);
    Session.set('nBg',0);
    Session.set('nMM',0);
    Session.set('nR',0);
    Session.set('nHP',0);
    if (event.target.name!=""){
      Session.setPersistent('studentId', event.target.name);
      Session.set('studentSelected', true);
    }
  },
  'click #drive': function(event) {
    loadPicker();
  },
  'click .btn-select,#selectedStudent': function(event) {
    Meteor.call('studentSelection', event.target.name);
  }
});
