Template.convictionsList.helpers({
  convictions: function() {
    return convictions.find({classId: Session.get('classId')});
  }
});

Template.convictionsList.events({
  'submit form.createConvictionForm': function(event) {
    event.preventDefault();
    var conviction = {
      classId: Session.get('classId'),
      convictionName: $(event.target).find('[name=convictionName]').val(),
      convictionDescription: $(event.target).find('[name=convictionDesc]').val(),
      createdOn: new Date()
    };
    Meteor.call('convictionInsert', conviction);
  },
  'submit form.convictionForm': function(event) {
    event.preventDefault();
    var conviction = {
      convictionName: $(event.target).find('[name=convictionName]').val(),
      convictionDescription: $(event.target).find('[name=convictionDesc]').val(),
    };
    Meteor.call('convictionUpdate', this._id, conviction);
  },
  'click .btnDeleteConviction': function(event) {
    event.preventDefault();
    Meteor.call('convictionDelete',this._id);
  }
});
