Template.battle.onRendered(function() {
  $('#sn').html(classes.findOne({ _id: Session.get('classId') } ).adventureDesc);
});
Template.battle.helpers({
  class: function() {
    return classes.findOne({ _id: Session.get('classId') } );
  },
  studentName: function() {
    return students.findOne({_id: Session.get('currentStudent')}).studentName;
  },
  mission: function() {
    t=students.findOne({_id: Session.get('currentStudent')}).activeTask;
    m=chalMissions.findOne({_id: t}).missionId;
    return challenges.findOne({_id: m});
  },
  task: function() {
    t=students.findOne({_id: Session.get('currentStudent')}).activeTask;
    return chalMissions.findOne({_id: t});
  }
});

Template.battle.events({
  'click #student_th': function(event) {
    event.preventDefault();
    sort.set({ student: 1 });
  },
  'click .battleHeart': function(event) {
    event.preventDefault();
    //$(event.currentTarget).toggleClass('oculto');
    $(event.currentTarget).find('[data-fa-i2svg]').attr('data-icon','heart-broken');
    h1=$('.bat1').find('[data-icon=heart]').length;
    h2=$('.bat2').find('[data-icon=heart]').length;
    if ( h2 == 0 ) {
      swal({
        title: 'H1 GANA!!!',
        type: 'success'
      });
      $('.bat1 [data-icon=heart-broken]').attr('data-icon','heart');
      $('.bat2 [data-icon=heart-broken]').attr('data-icon','heart');
    } else if ( h1 == 0 ) {
      swal({
        title: 'H2 GANA!!!',
        type: 'success'
      });
      $('.bat1 [data-icon=heart-broken]').attr('data-icon','heart');
      $('.bat2 [data-icon=heart-broken]').attr('data-icon','heart');
    } else if (h1 == h2 ) {
      swal({
        title: "Vais empatados a " + h1 ,
        type: 'success'
      });
    } else if (h1 > h2) {
      swal({
        title: "H1 va ganando " + h1  + " a " + h2 ,
        type: 'success'
      });
    } else if (h1 < h2) {
      swal({
        title: "H2 va ganando " + h2  + " a " + h1 ,
        type: 'success'
      });
    }
  },
  'click .battle .card,.battle .card-turned': function(event) {
    $(event.currentTarget).toggleClass('card card-turned');
    $(event.currentTarget).find('.card-inside').toggleClass('card-back card-front');
    $(event.currentTarget).find('.backlogocard').toggleClass('oculto');
  }
});
