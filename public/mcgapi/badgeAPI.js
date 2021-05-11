function badgeAPI()
{
  queryString = window.location.search;
  urlParams = new URLSearchParams(queryString);
  e=urlParams.get('e');
  id=urlParams.get('id');
  //document.body.innerHTML+="<div id='mcgapi'><form action='/methods/badgeAPI' method='post'><input type='hidden' id='elementType' name='elementType' value='" + e + "'><input type='hidden' id='elementId' name='elementId' value='" + id + "'><br><label for='studentId'>StudentId:</label><br><input type='text' id='studentId' name='studentId' value='studentId'><br><br><input type='submit' value='Enviar'></form></div>";
  document.getElementById('elementType').value = e;
  document.getElementById('elementId').value = id;
}


$("#btnBadgeAPI").click(function(){
  alert("A");
  // $.post("demo_test_post.asp",
  // {
  //   name: "Donald Duck",
  //   city: "Duckburg"
  // },
  // function(data, status){
  //   alert("Data: " + data + "\nStatus: " + status);
  // });
});
