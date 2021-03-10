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
    alert($(".import_export input:checkbox:checked").length)
  },
  'click .export': function(event) {
    event.preventDefault();

    var fields = [
      "id",
      "alias",
      "name",
      "level",
      "XP",
      "HP"
    ];

    var data = [];
    data.push(fields);

    var elements = students.find().fetch();
    _.each(elements, function(c) {
      data.push([
        c._id,
        c.alias,
        c.studentName,
        c.level,
        c.XP,
        c.HP
      ]);
    });

    var csv = Papa.unparse(data);

    var blob = new Blob([csv]);
		var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
    a.download = "students_" + Session.get("className") + ".csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    /*
    rows= datos;
    let csvContent = "data:text/csv;charset=utf-8,";

    rows.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link);
    link.click();
    */
  }
});
