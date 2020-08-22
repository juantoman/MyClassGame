//import Calendar from 'tui-calendar'; /* ES6 */


//dhtmlx scheduler
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.js';
import 'dhtmlx-scheduler/codebase/sources/locale/locale_es.js';
import 'dhtmlx-scheduler/codebase/sources/ext/dhtmlxscheduler_agenda_view.js';
import 'dhtmlx-scheduler/codebase/sources/ext/dhtmlxscheduler_year_view.js';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';


Template.scheduler.onRendered(function() {

   //$.getScript("https://cdn.dhtmlx.com/scheduler/edge/sources/locale/locale_es.js");
   //$.getScript("https://cdn.dhtmlx.com/scheduler/edge/sources/ext/dhtmlxscheduler_agenda_view.js");
   scheduler.config.first_hour = 8;
   scheduler.config.last_hour = 17;
   scheduler.config.start_on_monday = true;
   scheduler.locale.labels.year_tab ="Año";
   scheduler.locale.labels.agenda_tab="Agenda";
   scheduler.config.lightbox.sections=[
     {name:"recurring", height:21, type:"select", map_to:"rec_type", options:[
         {key:"1", label:"Misión 1"},
         {key:"2", label:"Misión 2"},
         {key:"3", label:"Misión 3"},
         {key:"4", label:"Misión 4"}
     ]},
     {name:"description", height:100, map_to:"text", type:"textarea" , focus:true},
     {name:"time", height:72, type:"time", map_to:"auto"}
   ];
   //scheduler.config.readonly = true;
   scheduler.clearAll();
   scheduler.init("scheduler_here", new Date(), "week");
   scheduler.parse([
       {text:"Meeting",    start_date:"2020-04-20 14:00", end_date:"2020-04-20 17:00", color:"orange"},
       {text:"Conference", start_date:"2020-04-22 12:00", end_date:"2020-04-22 19:00", color:"green"},
       {text:"Conference", start_date:"2020-04-22 12:30", end_date:"2020-04-22 19:30", color:"blue"},
       {text:"Conference", start_date:"2020-04-22 13:00", end_date:"2020-04-22 20:00", color:"lime"},
       {text:"Interview",  start_date:"2020-04-24 09:00", end_date:"2020-04-24 10:00", color:"red"}
   ],"json");
   scheduler.addEvent({
       start_date: "20-04-2020 09:00",
       end_date:   "20-04-2020 12:00",
       text:   "Meeting",
       holder: "John", // userdata
       room:   "5",     // userdata
       color:"red"
   });

});


Template.scheduler.events({
  'click .schedulerClose': function(event) {
    event.preventDefault();
    $('#modalScheduler').toggleClass('oculto');
    //Modal.hide('scheduler');
  }
})
