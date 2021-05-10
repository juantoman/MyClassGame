function mcgapi()
{
  queryString = window.location.search;
  urlParams = new URLSearchParams(queryString);
  e=urlParams.get('e');
  id=urlParams.get('id');
  document.body.innerHTML+="<div id='mcgapi'><form action='/methods/apiprova' method='post'><input type='hidden' id='elementType' name='elementType' value='" + e + "'><input type='hidden' id='elementId' name='elementId' value='" + id + "'><br><label for='studentId'>StudentId:</label><br><input type='text' id='studentId' name='studentId' value='studentId'><br><br><input type='submit' value='Enviar'></form></div>";
  document.getElementById('mcgapi').style.display = "block";

}
