{"filter":false,"title":"header.js","tooltip":"/client/templates/application/header.js","ace":{"folds":[],"scrolltop":562,"scrollleft":0,"selection":{"start":{"row":40,"column":27},"end":{"row":40,"column":27},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":55,"state":"start","mode":"ace/mode/javascript"}},"hash":"4308c6ceb340333369ba16c16018cc41bea44ebf","undoManager":{"mark":34,"position":34,"stack":[[{"start":{"row":12,"column":3},"end":{"row":24,"column":3},"action":"insert","lines":[",","  'click .closeSession': function(event) {","    event.preventDefault();","    Session.set('className', '');","    Session.set('studentSelected', false);","    Session.set('groupSelected', false);","    //Session.set('userType', \"\");","    //$(\"#fondo\").css(\"background-image\", \"\");","    Router.go('classesPage');","    Session.keys = {}","    //gapi.auth2.getAuthInstance().signOut();","    Meteor.logout();","  }"],"id":2}],[{"start":{"row":12,"column":4},"end":{"row":13,"column":0},"action":"insert","lines":["",""],"id":3},{"start":{"row":13,"column":0},"end":{"row":13,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":13,"column":2},"end":{"row":20,"column":3},"action":"insert","lines":["'click .clases': function(event) {","    event.preventDefault();","    Session.set('className', '');","    Session.set('studentSelected', false);","    Session.set('groupSelected', false);","    $(\"#fondo\").css(\"background-image\", \"\");","    Router.go('classesPage');","  }"],"id":5}],[{"start":{"row":20,"column":3},"end":{"row":20,"column":4},"action":"insert","lines":[","],"id":6}],[{"start":{"row":6,"column":2},"end":{"row":6,"column":3},"action":"insert","lines":["v"],"id":7}],[{"start":{"row":6,"column":2},"end":{"row":6,"column":3},"action":"remove","lines":["v"],"id":8}],[{"start":{"row":6,"column":2},"end":{"row":26,"column":2},"action":"insert","lines":["className: function() {","  return Session.get('className');//classes.findOne({ _id: Session.get('classId') } ).className;"," },"," studentName: function() {","  if (Session.get('studentSelected')) {","   return students.findOne({ _id: Session.get('studentId') } ).alias;","  } else {","   return \"\";","  }"," },"," userType: function() {","  if (Session.get('userType')==\"teacher\") {","   return \"PROFESOR\";","  }","  if (Session.get('userType')==\"student\") {","    return \"ESTUDIANTE\";","  }","  if (Session.get('userType')==\"parent\") {","    return \"PADRE/MADRE\";","  }"," }"],"id":9}],[{"start":{"row":40,"column":4},"end":{"row":41,"column":0},"action":"insert","lines":["",""],"id":10},{"start":{"row":41,"column":0},"end":{"row":41,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":41,"column":2},"end":{"row":46,"column":4},"action":"insert","lines":["'click .clase': function(event) {","    event.preventDefault();","    Session.set('studentSelected', false);","    Session.set('groupSelected', false);","    Router.go('myNav');","  },"],"id":11}],[{"start":{"row":6,"column":1},"end":{"row":6,"column":2},"action":"remove","lines":[" "],"id":12}],[{"start":{"row":26,"column":2},"end":{"row":26,"column":3},"action":"insert","lines":[","],"id":13}],[{"start":{"row":26,"column":3},"end":{"row":27,"column":0},"action":"insert","lines":["",""],"id":14},{"start":{"row":27,"column":0},"end":{"row":27,"column":1},"action":"insert","lines":[" "]}],[{"start":{"row":27,"column":1},"end":{"row":32,"column":4},"action":"insert","lines":["students: function() {","    return students.find({ classId: Session.get('classId') }, {sort: {XP: -1,_id: 1}} );","  },","  groups: function() {","    return groups.find({classId: Session.get('classId')});","  },"],"id":15}],[{"start":{"row":32,"column":3},"end":{"row":32,"column":4},"action":"remove","lines":[","],"id":18}],[{"start":{"row":9,"column":11},"end":{"row":9,"column":12},"action":"remove","lines":["e"],"id":19},{"start":{"row":9,"column":10},"end":{"row":9,"column":11},"action":"remove","lines":["m"]},{"start":{"row":9,"column":9},"end":{"row":9,"column":10},"action":"remove","lines":["a"]},{"start":{"row":9,"column":8},"end":{"row":9,"column":9},"action":"remove","lines":["N"]}],[{"start":{"row":64,"column":3},"end":{"row":64,"column":4},"action":"insert","lines":[","],"id":20}],[{"start":{"row":64,"column":4},"end":{"row":65,"column":0},"action":"insert","lines":["",""],"id":21},{"start":{"row":65,"column":0},"end":{"row":65,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":65,"column":2},"end":{"row":79,"column":4},"action":"insert","lines":["'click .student_button': function(event) {","    event.preventDefault();","    Session.setPersistent('studentId',event.target.id);","    Session.set('studentSelected', true);","    Session.setPersistent('sogBtn', \"students\");","    Session.set('groupSelected', false);","    $(\".tab-pane\").removeClass(\"active\");","    $(\"#studentsMain\").addClass(\"active\");","    $(\"#Datos\").addClass(\"active\");","    $(\".nav-pills li\").removeClass(\"active\");","    $(\"#sM\").addClass(\"active\");","    $(\"#studentData\").addClass(\"active\");","    $(\"#collapseStudents\").removeClass(\"in\");","    $(\"#collapseStudents\").removeClass(\"in\");","  },"],"id":22}],[{"start":{"row":79,"column":4},"end":{"row":80,"column":0},"action":"insert","lines":["",""],"id":23},{"start":{"row":80,"column":0},"end":{"row":80,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":80,"column":2},"end":{"row":91,"column":3},"action":"insert","lines":["'click .group_button': function(event) {","    event.preventDefault();","    Session.setPersistent('groupId',event.target.id);","    Session.set('groupSelected', true);","    Session.setPersistent('sogBtn', \"groups\");","    Session.set('studentSelected', false);","    $(\".tab-pane\").removeClass(\"active\");","    $(\".nav-pills li\").removeClass(\"active\");","    $(\"#studentsMain\").addClass(\"active\");","    $(\"#sM\").addClass(\"active\");","    $(\"#collapseStudents\").removeClass(\"in\");","  }"],"id":24}],[{"start":{"row":67,"column":38},"end":{"row":67,"column":50},"action":"remove","lines":["event.target"],"id":25},{"start":{"row":67,"column":38},"end":{"row":67,"column":39},"action":"insert","lines":["t"]},{"start":{"row":67,"column":39},"end":{"row":67,"column":40},"action":"insert","lines":["h"]},{"start":{"row":67,"column":40},"end":{"row":67,"column":41},"action":"insert","lines":["i"]},{"start":{"row":67,"column":41},"end":{"row":67,"column":42},"action":"insert","lines":["s"]}],[{"start":{"row":67,"column":42},"end":{"row":67,"column":43},"action":"insert","lines":["_"],"id":26}],[{"start":{"row":67,"column":42},"end":{"row":67,"column":43},"action":"remove","lines":["_"],"id":27}],[{"start":{"row":67,"column":43},"end":{"row":67,"column":44},"action":"insert","lines":["_"],"id":28}],[{"start":{"row":82,"column":36},"end":{"row":82,"column":51},"action":"remove","lines":["event.target.id"],"id":29},{"start":{"row":82,"column":36},"end":{"row":82,"column":44},"action":"insert","lines":["this._id"]}],[{"start":{"row":40,"column":27},"end":{"row":41,"column":0},"action":"insert","lines":["",""],"id":30},{"start":{"row":41,"column":0},"end":{"row":41,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":41,"column":4},"end":{"row":41,"column":15},"action":"insert","lines":["currentUser"],"id":31}],[{"start":{"row":41,"column":4},"end":{"row":41,"column":5},"action":"insert","lines":["a"],"id":32},{"start":{"row":41,"column":5},"end":{"row":41,"column":6},"action":"insert","lines":["l"]},{"start":{"row":41,"column":6},"end":{"row":41,"column":7},"action":"insert","lines":["e"]},{"start":{"row":41,"column":7},"end":{"row":41,"column":8},"action":"insert","lines":["r"]},{"start":{"row":41,"column":8},"end":{"row":41,"column":9},"action":"insert","lines":["t"]},{"start":{"row":41,"column":9},"end":{"row":41,"column":10},"action":"insert","lines":["("]}],[{"start":{"row":41,"column":21},"end":{"row":41,"column":22},"action":"insert","lines":[")"],"id":33},{"start":{"row":41,"column":22},"end":{"row":41,"column":23},"action":"insert","lines":[";"]}],[{"start":{"row":41,"column":10},"end":{"row":41,"column":11},"action":"insert","lines":["M"],"id":34},{"start":{"row":41,"column":11},"end":{"row":41,"column":12},"action":"insert","lines":["e"]},{"start":{"row":41,"column":12},"end":{"row":41,"column":13},"action":"insert","lines":["t"]},{"start":{"row":41,"column":13},"end":{"row":41,"column":14},"action":"insert","lines":["e"]},{"start":{"row":41,"column":14},"end":{"row":41,"column":15},"action":"insert","lines":["o"]},{"start":{"row":41,"column":15},"end":{"row":41,"column":16},"action":"insert","lines":["r"]}],[{"start":{"row":41,"column":16},"end":{"row":41,"column":17},"action":"insert","lines":["."],"id":35}],[{"start":{"row":41,"column":10},"end":{"row":41,"column":28},"action":"remove","lines":["Meteor.currentUser"],"id":36},{"start":{"row":41,"column":10},"end":{"row":41,"column":23},"action":"insert","lines":["Meteor.user()"]}],[{"start":{"row":41,"column":23},"end":{"row":41,"column":24},"action":"insert","lines":["."],"id":37},{"start":{"row":41,"column":24},"end":{"row":41,"column":25},"action":"insert","lines":["p"]},{"start":{"row":41,"column":25},"end":{"row":41,"column":26},"action":"insert","lines":["r"]},{"start":{"row":41,"column":26},"end":{"row":41,"column":27},"action":"insert","lines":["o"]}],[{"start":{"row":41,"column":27},"end":{"row":41,"column":28},"action":"insert","lines":["f"],"id":38},{"start":{"row":41,"column":28},"end":{"row":41,"column":29},"action":"insert","lines":["i"]},{"start":{"row":41,"column":29},"end":{"row":41,"column":30},"action":"insert","lines":["l"]},{"start":{"row":41,"column":30},"end":{"row":41,"column":31},"action":"insert","lines":["e"]},{"start":{"row":41,"column":31},"end":{"row":41,"column":32},"action":"insert","lines":["."]},{"start":{"row":41,"column":32},"end":{"row":41,"column":33},"action":"insert","lines":["n"]},{"start":{"row":41,"column":33},"end":{"row":41,"column":34},"action":"insert","lines":["a"]},{"start":{"row":41,"column":34},"end":{"row":41,"column":35},"action":"insert","lines":["m"]},{"start":{"row":41,"column":35},"end":{"row":41,"column":36},"action":"insert","lines":["e"]}],[{"start":{"row":41,"column":0},"end":{"row":41,"column":38},"action":"remove","lines":["    alert(Meteor.user().profile.name);"],"id":39},{"start":{"row":40,"column":27},"end":{"row":41,"column":0},"action":"remove","lines":["",""]}]]},"timestamp":1571004057475}