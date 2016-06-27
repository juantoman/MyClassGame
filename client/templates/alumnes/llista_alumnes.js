Template.classesPage.helpers({
  classe: function() {
    return classes.find({}, {sort: {submitted: -1}});
  }
});
