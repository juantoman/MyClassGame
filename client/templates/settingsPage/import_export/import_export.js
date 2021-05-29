

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
  'click #backup': function(event) {
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
  'change #restoreBackupFile': function(event) {
    event.preventDefault();
    try {
        let files = event.target.files;
        if (!files.length) {
            alert('No file selected!');
            return;
        }
        let file = files[0];
        let reader = new FileReader();
        const self = this;
        reader.onload = (event) => {
          var result = JSON.parse(event.target.result);
          Meteor.call('classDelete',result.classId);
          _.each(result.classes, function(e) {
            Meteor.call('classInsert',e);
          });
          _.each(result.students, function(e) {
            Meteor.call('studentInsert',e);
          });
          _.each(result.images, function(e) {
            Meteor.call('imageInsert',e);
          });
          _.each(result.levels, function(e) {
            Meteor.call('levelInsert',e);
          });
          _.each(result.badges, function(e) {
            Meteor.call('badgeInsert',e);
          });
          _.each(result.groups, function(e) {
            Meteor.call('groupInsert',e);
          });
          _.each(result.store, function(e) {
            Meteor.call('itemInsert',e);
          });
          _.each(result.cards, function(e) {
            Meteor.call('cardInsert',e);
          });
          _.each(result.chromes, function(e) {
            Meteor.call('chromeInsert',e);
          });
          _.each(result.behaviours, function(e) {
            Meteor.call('behaviourInsert',e);
          });
          _.each(result.behavioursLog, function(e) {
            Meteor.call('behaviourLogInsert',e);
          });
          _.each(result.questions, function(e) {
            Meteor.call('questionInsert',e);
          });
          _.each(result.quizzes, function(e) {
            Meteor.call('quizInsert',e);
          });
          _.each(result.randomEvents, function(e) {
            Meteor.call('randomEventInsert',e);
          });
          _.each(result.convictions, function(e) {
            Meteor.call('convictionInsert',e);
          });
          _.each(result.quotes, function(e) {
            Meteor.call('quoteInsert',e);
          });
          _.each(result.challenges, function(e) {
            Meteor.call('chalInsert',e);
          });
          _.each(result.chalMissions, function(e) {
            Meteor.call('chalMissionInsert',e);
          });
          _.each(result.challengesXP, function(e) {
            Meteor.call('chalInsertXP',e);
          });
          _.each(result.diary, function(e) {
            Meteor.call('diaryInsert',e);
          });
          _.each(result.notebook, function(e) {
            Meteor.call('notebookInsert',e);
          });
          _.each(result.notebookWork, function(e) {
            Meteor.call('notebookWorkInsert',e);
          });
          _.each(result.chatClass, function(e) {
            Meteor.call('messageInsert',e);
          });
          _.each(result.chatStudentTeacher, function(e) {
            Meteor.call('messageSTInsert',e);
          });
          _.each(result.chatTeachers, function(e) {
            Meteor.call('messageTeacherInsert',e);
          });
          _.each(result.notifications, function(e) {
            Meteor.call('notificationInsert',e);
          });
          _.each(result.villains, function(e) {
            Meteor.call('villainInsert',e);
          });
        };
        reader.readAsText(file);
    } catch (err) {
        console.error(err);
    }
  }
});
