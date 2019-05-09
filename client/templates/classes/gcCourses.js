import swal from 'sweetalert';

Template.gcCourses.onRendered(function () {
  Session.set("gcId","");
  ListaCursos();
});

Template.gcCourses.helpers({
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

Template.gcCourses.events({
  'click a': function(event) {
    event.preventDefault();
    Session.set("gcId",event.target.title);
  }
});
