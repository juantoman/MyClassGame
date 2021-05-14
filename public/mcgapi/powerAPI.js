function powerAPI()
{
  queryString = window.location.search;
  urlParams = new URLSearchParams(queryString);
  e=urlParams.get('e');
  id=urlParams.get('id');
  //document.body.innerHTML+="<div id='mcgapi'><form action='/methods/badgeAPI' method='post'><input type='hidden' id='elementType' name='elementType' value='" + e + "'><input type='hidden' id='elementId' name='elementId' value='" + id + "'><br><label for='studentId'>StudentId:</label><br><input type='text' id='studentId' name='studentId' value='studentId'><br><br><input type='submit' value='Enviar'></form></div>";
  document.getElementById('elementType').value = e;
  document.getElementById('elementId').value = id;
}


$( document ).ready(function(){
  $( "#btnPowerAPI" ).click(function() {
    $.ajax({
      url: "/methods/powerAPI",
      data: {
        'elementType': $( "#elementType" ).val(),
        'elementId': $( "#elementId" ).val(),
        'studentId': $( "#studentId" ).val()
      },
      // Whether this is a POST or GET request
      type: "POST",

      // The type of data we expect back
      dataType : "json"
    })
    .done(function( res ) {
        $( "#apiresult" ).html( res );
    });
  });
});
