function mcgapi(a)
{
  document.body.innerHTML+="<div id='mcgapi'><form action='/studentXP' method='post'><label for='elementId'>ElementId:</label><br><input type='text' id='elementId' name='elementId' value='" + a + "'><br><label for='studentId'>Last name:</label><br><input type='text' id='studentId' name='studentId' value='studentId'><br><br><input type='submit' value='Enviar'></form></div>";
  document.getElementById('mcgapi').style.display = "block";
}
