{"filter":false,"title":"myNav.js","tooltip":"/client/templates/myNav/myNav.js","undoManager":{"mark":10,"position":10,"stack":[[{"start":{"row":0,"column":0},"end":{"row":1,"column":0},"action":"insert","lines":["",""],"id":2}],[{"start":{"row":1,"column":0},"end":{"row":2,"column":0},"action":"insert","lines":["",""],"id":3}],[{"start":{"row":1,"column":0},"end":{"row":2,"column":0},"action":"insert","lines":["import swal from 'sweetalert';",""],"id":4}],[{"start":{"row":0,"column":0},"end":{"row":1,"column":0},"action":"remove","lines":["",""],"id":5}],[{"start":{"row":4,"column":3},"end":{"row":5,"column":0},"action":"insert","lines":["",""],"id":6}],[{"start":{"row":0,"column":30},"end":{"row":1,"column":0},"action":"insert","lines":["",""],"id":7}],[{"start":{"row":1,"column":0},"end":{"row":2,"column":0},"action":"insert","lines":["",""],"id":8}],[{"start":{"row":2,"column":0},"end":{"row":73,"column":1},"action":"insert","lines":["// The Browser API key obtained from the Google Developers Console.","// Replace with your own Browser API key, or your own key.","var developerKey = \"AIzaSyDnHOEU_r2pePVwDhw12EALhMFllO9IB_0\";","","// The Client ID obtained from the Google Developers Console. Replace with your own Client ID.","var clientId = \"422269930750-src3psqemmt1p6m8alujf9nvmook5c0d.apps.googleusercontent.com\"","","// Replace with your own App ID. (Its the first number in your Client ID)","var appId = \"yB6YafY8yJqC2fr1vPVg6HTw\";","","// Scope to use to access user's Drive items.","var scope = ['https://www.googleapis.com/auth/drive'];","","var pickerApiLoaded = false;","var oauthToken;","","// Use the Google API Loader script to load the google.picker script.","function loadPicker() {","  gapi.load('auth', {'callback': onAuthApiLoad});","  gapi.load('picker', {'callback': onPickerApiLoad});","}","","function onAuthApiLoad() {","  window.gapi.auth.authorize(","      {","        'client_id': clientId,","        'scope': scope,","        'immediate': false","      },","      handleAuthResult);","}","","function onPickerApiLoad() {","  pickerApiLoaded = true;","  createPicker();","}","","function handleAuthResult(authResult) {","  if (authResult && !authResult.error) {","    oauthToken = authResult.access_token;","    createPicker();","  }","}","","// Create and render a Picker object for searching images.","function createPicker() {","  if (pickerApiLoaded && oauthToken) {","    var view = new google.picker.DocsView().setIncludeFolders(true).setOwnedByMe(true);","    //view.setMimeTypes(\"image/png,image/jpeg,image/jpg\");","    var picker = new google.picker.PickerBuilder()","        .enableFeature(google.picker.Feature.NAV_HIDDEN)","        .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)","        .setAppId(appId)","        .setLocale('es')","        .setOAuthToken(oauthToken)","        .addView(view)","        .addView(new google.picker.DocsUploadView())","        .setDeveloperKey(developerKey)","        .setCallback(pickerCallback)","        .build();","     picker.setVisible(true);","  }","}","","// A simple callback implementation.","function pickerCallback(data) {","  if (data.action == google.picker.Action.PICKED) {","    var fileId = data.docs[0].id;","    //alert('The user selected: ' + fileId);","    window.open('https://drive.google.com/open?id='+fileId,'_blank')","  }","}"],"id":9}],[{"start":{"row":2,"column":0},"end":{"row":73,"column":1},"action":"remove","lines":["// The Browser API key obtained from the Google Developers Console.","// Replace with your own Browser API key, or your own key.","var developerKey = \"AIzaSyDnHOEU_r2pePVwDhw12EALhMFllO9IB_0\";","","// The Client ID obtained from the Google Developers Console. Replace with your own Client ID.","var clientId = \"422269930750-src3psqemmt1p6m8alujf9nvmook5c0d.apps.googleusercontent.com\"","","// Replace with your own App ID. (Its the first number in your Client ID)","var appId = \"yB6YafY8yJqC2fr1vPVg6HTw\";","","// Scope to use to access user's Drive items.","var scope = ['https://www.googleapis.com/auth/drive'];","","var pickerApiLoaded = false;","var oauthToken;","","// Use the Google API Loader script to load the google.picker script.","function loadPicker() {","  gapi.load('auth', {'callback': onAuthApiLoad});","  gapi.load('picker', {'callback': onPickerApiLoad});","}","","function onAuthApiLoad() {","  window.gapi.auth.authorize(","      {","        'client_id': clientId,","        'scope': scope,","        'immediate': false","      },","      handleAuthResult);","}","","function onPickerApiLoad() {","  pickerApiLoaded = true;","  createPicker();","}","","function handleAuthResult(authResult) {","  if (authResult && !authResult.error) {","    oauthToken = authResult.access_token;","    createPicker();","  }","}","","// Create and render a Picker object for searching images.","function createPicker() {","  if (pickerApiLoaded && oauthToken) {","    var view = new google.picker.DocsView().setIncludeFolders(true).setOwnedByMe(true);","    //view.setMimeTypes(\"image/png,image/jpeg,image/jpg\");","    var picker = new google.picker.PickerBuilder()","        .enableFeature(google.picker.Feature.NAV_HIDDEN)","        .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)","        .setAppId(appId)","        .setLocale('es')","        .setOAuthToken(oauthToken)","        .addView(view)","        .addView(new google.picker.DocsUploadView())","        .setDeveloperKey(developerKey)","        .setCallback(pickerCallback)","        .build();","     picker.setVisible(true);","  }","}","","// A simple callback implementation.","function pickerCallback(data) {","  if (data.action == google.picker.Action.PICKED) {","    var fileId = data.docs[0].id;","    //alert('The user selected: ' + fileId);","    window.open('https://drive.google.com/open?id='+fileId,'_blank')","  }","}"],"id":10}],[{"start":{"row":2,"column":0},"end":{"row":3,"column":0},"action":"remove","lines":["",""],"id":11}],[{"start":{"row":2,"column":0},"end":{"row":3,"column":0},"action":"remove","lines":["",""],"id":12}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":2,"column":0},"end":{"row":2,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1556873324526,"hash":"200113e38ece12fc771e6682fdf4e55ab4c8fc5d"}