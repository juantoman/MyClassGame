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
  },
  'click .export': function(event) {
    event.preventDefault();

    students = students.find({classId:Session.get('classId')}).fetch();
    chromes = chromes.find({classId:Session.get('classId')}).fetch();
    cards = cards.find({classId:Session.get('classId')}).fetch();
    var data = {
       students: students,
       cards: cards,
       chromes: chromes
    }
    console.log(data.cards);
    var jsondata = JSON.stringify(data);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(jsondata);
    let exportFileDefaultName = 'data.json';
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }
});
