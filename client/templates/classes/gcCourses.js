//import swal from 'sweetalert';

Template.gcCourses.onRendered(function () {
  Session.set("gcId","");
  //ListaCursos();
});

Template.gcCourses.helpers({
  gc: function() {
    var url = "https://classroom.googleapis.com/v1/courses";
    var myAccessToken=Meteor.user().services.google.accessToken;

    var params = {
       access_token: myAccessToken
    }

    HTTP.get(url,{params:params},function(error,resp){
      if (error) {
        //console.log(error);
      } else {
        //console.log(resp);
        Session.set('lc',resp.data.courses);
        /*
        if (courses.length > 0) {
          for (i = 0; i < courses.length; i++) {
            var course = courses[i];
            url_students='https://classroom.googleapis.com/v1/courses/'+course.id+'/students';
            HTTP.get(url_students,{params:params},function(error,respS){
              if (error) {
                console.log(error);
              } else {
                console.log(respS);
                Session.set('sc'+course.id,respS.data.students);
              }
            });
          }
        } else {
          appendPre('No courses found.');
        }*/
      }
    })
    return Session.get('lc');
  },
  gcs: function(c) {
    ListaEstudiantes(c);
    return Session.get('sc'+c);
  }
});

Template.gcCourses.events({
  'click a': function(event) {
    event.preventDefault();
    Session.set("gcId",event.target.title);
  }
});
