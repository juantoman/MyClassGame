handleClientLoad=function() {
  gapi.load('client:auth2', initClient);
}

initClient=function() {
  var CLIENT_ID = mcgParameters.findOne().clientId;
  var API_KEY = mcgParameters.findOne().apiKey;
  
  // Cargamos el servicio Rest API de Google 
  //var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest","https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
  
  // El servicio de Autenticación con una cuenta de Google 
  //var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
  var SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters.readonly https://www.googleapis.com/auth/classroom.profile.emails https://www.googleapis.com/auth/classroom.coursework.students.readonly https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.topics.readonly";

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

updateSigninStatus=function(isSignedIn) {
  if (!isSignedIn) {
    gapi.auth2.getAuthInstance().signIn();
  }
  ListaCursos();
}

appendPre=function(message) {
  $("#GoogleClassroom").html($("#GoogleClassroom").html() + message + '\n');
}

// Acá listamos los archivos de nuestra cuenta de Google Drive, especificamos que datos de los archivos queremos mostrar 

listFolder=function() {
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

createFolderFunction=function() {
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

changePermissions=function(folderId) {
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
  
  /*
  gapi.client.drive.permissions.insert({
  'fileId': files,
  'resource': body
  }).execute(function(response) {
  callback(null, response);
  });*/
  
}

listCourses=function() {
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
  
listStudents=function(c) {
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

ListaCursos=function() {
  gapi.client.classroom.courses.list({
    pageSize: 10,
  }).then(function(response) {
    Session.set('lc',response.result.courses);
    var courses = response.result.courses;
    console.log(courses);
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

ListaEstudiantes=function(c) {
  gapi.client.classroom.courses.students.list({
    courseId: c
  }).then(function(response) {
    Session.set('sc'+c,response.result.students);
  });
}

listaTareas=function() {
  cId=classes.findOne({'_id':Session.get("classId")}).gcId;
  gapi.client.classroom.courses.courseWork.list({
    courseId: cId
  }).then(function(response) {
    console.log(response.result);
    Session.set('lt',response.result.courseWork);
  });
}

creaTarea=function() {
  cW = {
    'title': 'Filomeno',
    'description': 'Read the article about ant colonies and complete the quiz.',
    'materials': [
       {'link': { 'url': 'http://example.com/ant-colonies' }},
       {'link': { 'url': 'http://example.com/ant-quiz' }}
  ],
    'workType': 'ASSIGNMENT',
    'state': 'PUBLISHED',
  }
  courseId=classes.findOne({'_id':Session.get('classId')}).gcId;
  gapi.client.request({
    'path': 'https://classroom.googleapis.com/v1/courses/'+courseId+'/courseWork',
    'method': 'POST',
    'body': cW
  }).then(function(jsonResp,rawResp) {
      console.log(jsonResp)
      if (jsonResp.status==200) {
        callback(jsonResp.result)
      }
  })
  /*
  gapi.client.classroom.courses.courseWork.create({
      'courseId': '36588540955',
      'body':cW
    }).then(function(response) {
    console.log(response);
  });*/
}

listaTemas=function() {
  cId=classes.findOne({'_id':Session.get("classId")}).gcId;
  gapi.client.classroom.courses.topics.list({
    courseId: cId
  }).then(function(response) {
    Session.set('lt',response.result.topic);
    return response.result.topic;
  });
}

$.getScript("https://apis.google.com/js/api.js");
$.getScript("https://apis.google.com/js/platform.js");
