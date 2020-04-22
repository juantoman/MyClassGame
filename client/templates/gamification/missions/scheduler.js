//import Calendar from 'tui-calendar'; /* ES6 */
//import "tui-calendar/dist/tui-calendar.css";


// If you use the default popups, use this.
//import 'tui-date-picker/dist/tui-date-picker.css';
//import 'tui-time-picker/dist/tui-time-picker.css';

import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.js';
import 'dhtmlx-scheduler/codebase/sources/locale/locale_es.js';
import 'dhtmlx-scheduler/codebase/sources/ext/dhtmlxscheduler_agenda_view.js';
import 'dhtmlx-scheduler/codebase/sources/ext/dhtmlxscheduler_year_view.js';


Template.scheduler.onRendered(function() {

   //$.getScript("https://cdn.dhtmlx.com/scheduler/edge/sources/locale/locale_es.js");
   //$.getScript("https://cdn.dhtmlx.com/scheduler/edge/sources/ext/dhtmlxscheduler_agenda_view.js");

});


Template.scheduler.events({
  'click #schedulerBtn': function(event) {
    $('#scheduler_here').toggleClass('oculto');
    //$('#tuiCalendar').toggleClass('oculto');
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
    scheduler.init("scheduler_here", new Date(), "week");
    scheduler.addEvent({
        start_date: "20-04-2020 09:00",
        end_date:   "20-04-2020 12:00",
        text:   "Meeting",
        holder: "John", // userdata
        room:   "5",     // userdata
        color:"red"
    });
    /*
    var COMMON_CUSTOM_THEME = {
      'common.border': '1px solid #ffbb3b',
      'common.backgroundColor': '#ffbb3b0f',
      'common.holiday.color': '#f54f3d',
      'common.saturday.color': '#3162ea',
      'common.dayname.color': '#333'
    };
    // register templates
  const templates = {
    popupIsAllDay: function() {
      return 'All Day';
    },
    popupStateFree: function() {
      return 'Free';
    },
    popupStateBusy: function() {
      return 'Busy';
    },
    titlePlaceholder: function() {
      return 'Subject';
    },
    locationPlaceholder: function() {
      return 'Location';
    },
    startDatePlaceholder: function() {
      return 'Start date';
    },
    endDatePlaceholder: function() {
      return 'End date';
    },
    popupSave: function() {
      return 'Save';
    },
    popupUpdate: function() {
      return 'Update';
    },
    popupDetailDate: function(isAllDay, start, end) {
      var isSameDate = moment(start).isSame(end);
      var endFormat = (isSameDate ? '' : 'YYYY.MM.DD ') + 'hh:mm a';

      if (isAllDay) {
        return moment(start).format('YYYY.MM.DD') + (isSameDate ? '' : ' - ' + moment(end).format('YYYY.MM.DD'));
      }

      return (moment(start).format('YYYY.MM.DD hh:mm a') + ' - ' + moment(end).format(endFormat));
    },
    popupDetailLocation: function(schedule) {
      return 'Location : ' + schedule.location;
    },
    popupDetailUser: function(schedule) {
      return 'User : ' + (schedule.attendees || []).join(', ');
    },
    popupDetailState: function(schedule) {
      return 'State : ' + schedule.state || 'Busy';
    },
    popupDetailRepeat: function(schedule) {
      return 'Repeat : ' + schedule.recurrenceRule;
    },
    popupDetailBody: function(schedule) {
      return 'Body : ' + schedule.body;
    },
    popupEdit: function() {
      return 'Edit';
    },
    popupDelete: function() {
      return 'Delete';
    }
  };

    var cal = new Calendar('#calendar', {
      defaultView: 'week',
      theme: COMMON_CUSTOM_THEME, // set theme
      template: templates,
      useCreationPopup: true,
      useDetailPopup: true
    });

    cal.createSchedules([
    {
        id: '1',
        calendarId: '1',
        title: 'my schedule',
        category: 'time',
        dueDateClass: '',
        start: '2020-04-20T12:30:00+09:00',
        end: '2020-04-20T22:30:00+09:00'
    },
    {
        id: '2',
        calendarId: '1',
        title: 'second schedule',
        category: 'time',
        dueDateClass: '',
        start: '2020-04-21T17:30:00+09:00',
        end: '2020-04-21T18:31:00+09:00',
        bgColor: '#aa0000'
    }
]);

    $('#calendar').tuiCalendar({
      defaultView: 'week',
      taskView: true,
      template: {
        monthDayname: function(dayname) {
          return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
        }
      }
    });
    */
  }
})
