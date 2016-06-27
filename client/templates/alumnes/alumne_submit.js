Template.alumneSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var alumne = {
      url: $(e.target).find('[name=url]').val(),
      nom: $(e.target).find('[name=nom]').val()
    };


    Meteor.call('alumneInsert', alumne, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);
        // show this result but route anyway
      if (result.alumneExists)
        alert('This link has already been posted');

      Router.go('llistaAlumnes');
    });
  }
});
