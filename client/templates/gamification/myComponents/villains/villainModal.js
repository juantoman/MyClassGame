Template.addVillainModal.events({
  'submit form#add_villain_form': function(event) {
    event.preventDefault();
    var nombres =  $(event.target).find('[name=villains-names]').val().split(",");
    nombres.forEach(function (villainName) {
      if(villainName!=""){
        var villain = {
          classId: Session.get('classId'),
          villainName: villainName.trim(),
          villainImage: "/images/angry.png",
          HP:10,
          createdOn: new Date()
        };
        Meteor.call('villainInsert', villain);
      }
    });
    Modal.hide('addVillainModal');
  }
})
