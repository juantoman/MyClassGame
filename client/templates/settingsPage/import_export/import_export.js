

Template.import_export.events({
  'click .import': function(event) {
    event.preventDefault();
    // var data;
    // var file = document.getElementById('csvFile').files[0];
    // Papa.parse(file, {
    //   header: true,
    //   dynamicTyping: true,
    //   complete: function(results) {
    //     console.log("Finished:", results.data);
    //     data = results.data;
    //   }
    // });

    classId=$("#fancy-text-classId").val();
    elements=[];
    $(".import_export input:checkbox:checked").each(function(){
      elements.push($(this).attr("id"));
    });
    Meteor.call('importFromClassId',classId,Session.get('classId'),elements,function(error,imported){
      if (error) {
        console.log(error);
      } else {
        if (imported){
          swal({
            title: TAPi18n.__('importedData'),
            icon: "success",
          });
        } else {
          swal({
            title: TAPi18n.__('incorrectClassId'),
            icon: "warning",
          });
        }
      }
    });
  }
});
