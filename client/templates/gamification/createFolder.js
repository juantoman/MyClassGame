Template.createFolder.onRendered(function() {
  $.getScript("https://apis.google.com/js/api.js");
  // Client ID and API key from the Developer Console
  var folderId="";
      var CLIENT_ID = '422269930750-src3psqemmt1p6m8alujf9nvmook5c0d.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyBqyxpnFhDv1nOkTszttyDSXn2HPpznhZI';

      // Cargamos el servicio Rest API de Google 
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
 
      // El servicio de Autenticación con una cuenta de Google 
      var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
      
      // Seleccionamos los botones de Iniciar Sesión y Cerrar Sesión 
      var authorizeButton = document.getElementById('autorizar_btn');
      authorizeButton.onclick = handleClientLoad;
 
      
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }
 
     
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
 
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
        });
      }
 
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          listFiles();
        }
      }
 
      
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }
 
 
      function appendPre(message) {
        var pre = document.getElementById('root');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }
      
      // Acá listamos los archivos de nuestra cuenta de Google Drive, especificamos que datos de los archivos queremos mostrar 
      function listFiles() {
        //Llistar carpeta
        /*gapi.client.drive.files.list({
          'pageSize': 10,
          'fields': "nextPageToken, files(id, name)"
        }).then(function(response) {
          appendPre('Files:');
          var files = response.result.files;
          if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              appendPre(file.name + ' (' + file.id + ')');
            }
          } else {
            appendPre('No files found.');
          }
        });*/
        //Crear carpeta
        var body= {"name": "tururi", 
           "mimeType": "application/vnd.google-apps.folder"}
        
        gapi.client.request({
          'path': 'https://www.googleapis.com/drive/v3/files/',
          'method': 'POST',
          'body': body
        }).then(function(jsonResp,rawResp) {
            console.log(jsonResp);
            changePermissions(jsonResp.result.id)
            if (jsonResp.status==200) {
              callback(jsonResp.result)
            }
        })
      }
      function changePermissions(folderId) {
        //Canviar permissos
        var body = {
        'withLink': true,
        'type': "anyone",
        'role': "reader"
        };
        gapi.client.request({
          'path': 'https://www.googleapis.com/drive/v3/files/'+folderId+'/permissions',
          'method': 'POST',
          'body': body
        }).then(function(jsonResp,rawResp) {
            console.log(jsonResp)
            if (jsonResp.status==200) {
              callback(jsonResp.result)
            }
        })
        
        /*gapi.client.drive.permissions.insert({
        'fileId': files,
        'resource': body
        }).execute(function(response) {
        callback(null, response);
        });*/
      }
});

Template.createFolder.events({
  'click #createFolderBtn': function(event) {
    event.preventDefault();;
  }
});
