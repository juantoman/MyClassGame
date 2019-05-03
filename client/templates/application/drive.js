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