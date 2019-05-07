import swal from 'sweetalert';

// Client ID and API key from the Developer Console
  
var CLIENT_ID = '422269930750-src3psqemmt1p6m8alujf9nvmook5c0d.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBqyxpnFhDv1nOkTszttyDSXn2HPpznhZI';

// Cargamos el servicio Rest API de Google 
//var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest","https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// El servicio de Autenticación con una cuenta de Google 
//var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
var SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters.readonly https://www.googleapis.com/auth/classroom.profile.emails";

// Seleccionamos los botones de Iniciar Sesión y Cerrar Sesión 

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
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    ListaCursos();
  }
}

function appendPre(message) {
  $("#GoogleClassroom").html($("#GoogleClassroom").html() + message + '\n');
}

// Acá listamos los archivos de nuestra cuenta de Google Drive, especificamos que datos de los archivos queremos mostrar 

function listFolder() {
  //Llistar carpeta
  gapi.client.drive.files.list({
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
  });
}

function createFolderFunction() {
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

function listCourses() {
  gapi.client.classroom.courses.list({
    pageSize: 10,
  }).then(function(response) {
    var courses = response.result.courses;
    appendPre('Courses:');
    if (courses.length > 0) {
      for (i = 0; i < courses.length; i++) {
        var course = courses[i];
        appendPre(course.name+":"+course.id)
        listStudents(course.id);
      }
    } else {
      appendPre('No courses found.');
    }
  });
}
  
function listStudents(c) {
  gapi.client.classroom.courses.students.list({
    courseId: c
  }).then(function(response) {
    var students = response.result.students;
    appendPre('students:');
    if (students.length > 0) {
      for (i = 0; i < students.length; i++) {
        var student = students[i];
        appendPre(c+":"+student.userId+":"+student.profile.name.fullName)
      }
    } else {
      appendPre('No students found.');
    }
  });
}

function ListaCursos() {
  gapi.client.classroom.courses.list({
    pageSize: 10,
  }).then(function(response) {
    Session.set('lc',response.result.courses);
    var courses = response.result.courses;
    if (courses.length > 0) {
      for (i = 0; i < courses.length; i++) {
        var course = courses[i];
        ListaEstudiantes(course.id);
      }
    } else {
      appendPre('No courses found.');
    }
  });
}

function ListaEstudiantes(c) {
  gapi.client.classroom.courses.students.list({
    courseId: c
  }).then(function(response) {
    Session.set('sc'+c,response.result.students);
  });
}

Template.GCTemplate.onRendered(function () {
  Session.set("gcId","");
  $.getScript("https://apis.google.com/js/api.js");
  $.getScript("https://apis.google.com/js/platform.js");
  handleClientLoad();
});

Template.GCTemplate.helpers({
  gc: function() {
    //return $.grep(Session.get('lc'), function(e){ return e.id == '31168491805'; });
    //ListaEstudiantes(this.id);
    return Session.get('lc');
  },
  gcs: function(c) {
    ListaEstudiantes(c);
    return Session.get('sc'+c);
  }
});

Template.GCTemplate.events({
  'click a': function(event) {
    event.preventDefault();
    Session.set("gcId",event.target.title);
  }
});
