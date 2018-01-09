Template.studentsPage.onRendered(function() {
   $.getScript("https://apis.google.com/js/api.js");
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
    return students.find({classId: Session.get('classId')}, {sort: {XP: -1}});
  },
  image: function(avatar) {
    if (!avatar) {
      return "/images/user_128.png";
    } else  {
      return avatar
    }
  },
  lista: function() {
    if ( Session.get('golBtn') == "grid" ) {
      return true;
    } else {
      return false;
    }
  },
  grupo: function() {
    return groups.findOne({_id: this.groupId});
  },
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
  }
});

Template.studentsPage.events({
  'click .btn-delete': function(event) {
    event.preventDefault();
    alert("Borrar alumne");
    //Meteor.call('studentDelete', event.target.name);
  },
  'click .btn-xp': function(event) {
    event.preventDefault();
    Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    if ( Session.get('userType')=="teacher") {
      Modal.show('xpModal');
    }    
    //Meteor.call('studentXP', event.target.name, 100);
  },
  'click .btn-hp': function(event) {
    event.preventDefault();
    Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    if ( Session.get('userType')=="teacher") {
      Modal.show('hpModal');
    }  
    //Meteor.call('studentHP', event.target.name, 10);
  },
  'click .btn-info': function(event) {
    event.preventDefault();
    Session.setPersistent('studentId', event.target.name);
    //Meteor.call('studentHP', event.target.name, 10);
  },
  'click .btn-badge': function(event) {
    event.preventDefault();
    Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    if ( Session.get('userType')=="teacher") {
      Modal.show('badgeModal');
    }
    //Session.setPersistent('studentId', event.target.name);
    //Meteor.call('studentHP', event.target.name, 10);
  },
  'click .btn-store': function(event) {
    event.preventDefault();
    Session.setPersistent('studentId', $(event.target).closest('div').attr("id"));
    if ( Session.get('userType')=="teacher") {
      Modal.show('storeModal');
    }
    //Session.setPersistent('studentId', event.target.name);
    //Meteor.call('studentHP', event.target.name, 10);
  },
  'click .foto': function(event) {
    event.preventDefault();
    console.log("Dades alumne");
    alert("Dades alumne");
  },
  'click #drive': function(event) {
    console.log("Drive");
    loadPicker();
  }
});
