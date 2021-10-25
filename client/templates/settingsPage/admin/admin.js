Template.admin.rendered = function() {
  //Session.set('className', "");
}

Template.admin.helpers({
  claseTipo: function() {
    if (mcgParameters.find({'typeClasses':Session.get('classId')}).count() == 0) {
      return false;
    } else {
      return true;
    }
  },
  admin: function() {
    if (Meteor.user().services.google.email == "Juan.Torres@iestacio.com") {
      return true;
    } else {
      return false;
    }
  },
  stored: function() {
    return classes.findOne({'_id':Session.get('classId')}).stored;
  },
  visibleClass: function() {
    return classes.findOne({'_id':Session.get('classId')}).visibleClass;
  },
  classId: function() {
    return Session.get('classId');
  }
});
Template.admin.events({
  'click .btn-class': function(event) {
    event.preventDefault();
    Session.set('classId', event.target.id);
    Session.set('className', event.target.name);
    Session.setPersistent('navItem', "Students");
    Session.setPersistent('sogBtn',"students");
    Session.setPersistent('golBtn',"grid");
    Session.set('studentSelected', false);
    Session.setPersistent('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);
    backImg=classes.findOne({"_id": Session.get('classId')}).backImg;
    $("#fondo").css("background-image", "url("+backImg+")");
    //Session.set('orderStudents', "XP");
    //Session.set('invertOrder', "checked");
    Router.go('studentsMainPage',{_id:Session.get('classId')});
  },
  'click #btn-duplicar': function(event) {
    event.preventDefault();
    cId=Session.get('classId');
    /*Session.set('className', event.target.name);
    Session.setPersistent('navItem', "Students");
    Session.setPersistent('sogBtn',"students");
    Session.setPersistent('golBtn',"grid");
    Session.set('studentSelected', false);
    Session.setPersistent('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);*/
    var c = classes.findOne({'_id': cId});
    delete c._id;
    c.teacherId=Meteor.userId();
    c.className="Copia_" + c.className;
    c.iniHP=10;
    Meteor.call('classDuplicate',c,cId);
    swal({
      title: TAPi18n.__('duplicateClass'),
      type: 'success'
    });
    /*students.find({'classId': cId}).forEach(function(student){
      var newStudent = student;
      delete student._id;
      student.classId=Session.get('classId');
      Meteor.call('studentInsert',student);
    });*/
    //Router.go('classesPage');
  },
  'click #btn-eliminar': function(event) {
    event.preventDefault();
    Modal.show('deleteClass');
  },
  'click #btn-tipo': function(event) {
    event.preventDefault();
    if (mcgParameters.find().count()==0) {
      var params = {
        typeClasses:[],
        passMCG: "@MCG2406?"
      };
      Meteor.call('paramsInsert',params);
      Meteor.call('typePush',Session.get('classId'));
    }
    if (mcgParameters.find({typeClasses:Session.get('classId')}).count() == 0) {
      Meteor.call('typePush',Session.get('classId'));
    } else {
      Meteor.call('typePull',Session.get('classId'));
    }
  },
  'click #btn-view': function(event) {
    event.preventDefault();
    if (classes.findOne({'_id':Session.get('classId')}).visibleClass) {
      Meteor.call('visibleClass',Session.get('classId'),false);
    } else {
      Meteor.call('visibleClass',Session.get('classId'),true);
    }
  },
  'click #btn-store-class': function(event) {
    event.preventDefault();
    Meteor.call('classStore',Session.get('classId'));
  },
  'click #btn-restore': function(event) {
    event.preventDefault();
    Meteor.call('classStore',Session.get('classId'));
  },
  'click #changeRol': function(event) {
    event.preventDefault();
    if (Meteor.user().services.google.email == "Juan.Torres@iestacio.com") {
      type=Meteor.users.findOne(Meteor.user()).userType;
      Meteor.call('userTypeInsert', "");
      Session.setPersistent('userType', "");
      Router.go('index');
    }
  },
  'click #adminClass': function(event) {
    event.preventDefault();
    if (Meteor.user().services.google.email == "Juan.Torres@iestacio.com") {
      Modal.show('adminClass');
    }
    /*Session.set('classId', event.target.id);
    Session.set('className', event.target.name);
    Session.setPersistent('navItem', "Students");
    Session.setPersistent('sogBtn',"students");
    Session.setPersistent('golBtn',"grid");
    Session.set('studentSelected', false);
    Session.setPersistent('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);*/
  },
  'click #btn-acceso-estudiantes': function(event) {
    event.preventDefault();
    students.find({'classId':Session.get('classId')}).forEach(function(s){
      if (s.alias.split(" ").length -1 == 0) {
        Meteor.call('createStudentUser', s._id, s.alias, Session.get('classId'));
      }
    });
    Modal.show('studentsPrint');
  },
  'click #btn-eliminar-acceso-estudiantes': function(event) {
    event.preventDefault();
    students.find({'classId':Session.get('classId')}).forEach(function(s){
      Meteor.call('deleteStudentUser', s.userId, s._id);
    });
  },
  'click #btn-imprimir-estudiantes': function(event) {
    event.preventDefault();
    Modal.show('studentsPrint');
  },
  'click #btn-backup': function(event) {
    event.preventDefault();
    classes = classes.find({_id:Session.get('classId')}).fetch();
    students = students.find({classId:Session.get('classId')}).fetch();
    images = images.find({classId:Session.get('classId')}).fetch();
    levels = levels.find({classId:Session.get('classId')}).fetch();
    badges = badges.find({classId:Session.get('classId')}).fetch();
    groups = groups.find({classId:Session.get('classId')}).fetch();
    store = store.find({classId:Session.get('classId')}).fetch();
    cards = cards.find({classId:Session.get('classId')}).fetch();
    chromes = chromes.find({classId:Session.get('classId')}).fetch();
    behaviours = behaviours.find({classId:Session.get('classId')}).fetch();
    behavioursLog = behavioursLog.find({classId:Session.get('classId')}).fetch();
    questions = questions.find({classId:Session.get('classId')}).fetch();
    quizzes = quizzes.find({classId:Session.get('classId')}).fetch();
    randomEvents = randomEvents.find({classId:Session.get('classId')}).fetch();
    convictions = convictions.find({classId:Session.get('classId')}).fetch();
    quotes = quotes.find({classId:Session.get('classId')}).fetch();
    challenges = challenges.find({classId:Session.get('classId')}).fetch();
    chalMissions = chalMissions.find({classId:Session.get('classId')}).fetch();
    challengesXP = challengesXP.find({classId:Session.get('classId')}).fetch();
    diary = diary.find({classId:Session.get('classId')}).fetch();
    notebook = notebook.find({classId:Session.get('classId')}).fetch();
    notebookWork = notebookWork.find({classId:Session.get('classId')}).fetch();
    chatClass = chatClass.find({classId:Session.get('classId')}).fetch();
    chatStudentTeacher = chatStudentTeacher.find({classId:Session.get('classId')}).fetch();
    chatTeachers = chatTeachers.find({classId:Session.get('classId')}).fetch();
    notifications = notifications.find({classId:Session.get('classId')}).fetch();
    villains = villains.find({classId:Session.get('classId')}).fetch();

    var data = {
      classId: Session.get('classId'),
      classes: classes,
      students: students,
      images: images,
      levels: levels,
      badges: badges,
      groups: groups,
      store: store,
      cards: cards,
      chromes: chromes,
      behaviours: behaviours,
      behavioursLog: behavioursLog,
      questions: questions,
      quizzes: quizzes,
      randomEvents: randomEvents,
      convictions: convictions,
      quotes: quotes,
      challenges: challenges,
      chalMissions: chalMissions,
      challengesXP: challengesXP,
      diary: diary,
      notebook: notebook,
      notebookWork: notebookWork,
      chatClass: chatClass,
      chatStudentTeacher: chatStudentTeacher,
      chatTeachers: chatTeachers,
      notifications: notifications,
      villains: villains
    }
    //console.log(data.cards);
    var jsondata = JSON.stringify(data);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(jsondata);
    var d = new Date();
    datetime=d.getFullYear().toString().padStart(4, "0")+d.getMonth().toString().padStart(2, "0")+d.getDate().toString().padStart(2, "0")+d.getHours().toString().padStart(2, "0")+d.getMinutes().toString().padStart(2, "0")+d.getSeconds().toString().padStart(2, "0");
    let exportFileDefaultName = 'MCG_backup_'+ Session.get('className') + '_' + datetime + '.json';
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  },
  'click .viewUrl': function(event) {
    event.preventDefault();
    document.execCommand('selectAll');
    const el = document.createElement('textarea');
    //el.value = "https://www.myclassgame.es/mcgapi/mcgapi.html?e=badge&id="+this._id;
    el.value = 'https://www.myclassgame.es/view/' + Session.get('classId');
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
});
