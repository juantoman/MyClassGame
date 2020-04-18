//import swal from 'sweetalert';

Template.GCTasks.onRendered(function () {
  Session.set("gcId","");
  listaTemas();
});

Template.GCTasks.helpers({
  lt: function() {
    //return $.grep(Session.get('lc'), function(e){ return e.id == '31168491805'; });
    //ListaEstudiantes(this.id);
    return Session.get('lt');
  },
  gcs: function(c) {
    ListaEstudiantes(c);
    return Session.get('sc'+c);
  }
});

Template.GCTasks.events({
  'click a': function(event) {
    event.preventDefault();
    Session.set("gcId",event.target.title);
  }
});
