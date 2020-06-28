Template.addVillainModal.events({
  'submit form#add_villain_form': function(event) {
    event.preventDefault();
    var nombres =  $(event.target).find('[name=villains-names]').val().split(",");
    nombres.forEach(function (villainName) {
      if(villainName!=""){
        var villain = {
          classId: Session.get('classId'),
          villainName: villainName.trim(),
          villainImage: "https://res.cloudinary.com/myclassgame/image/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/v1582290869/myclassgame/darth-vader-pajamas-officially-licensed-merch-the-23_kjngzn.png",
          HP:10,
          createdOn: new Date()
        };
        Meteor.call('villainInsert', villain);
      }
    });
    Modal.hide('addVillainModal');
  }
})
