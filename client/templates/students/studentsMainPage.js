Template.studentsMainPage.onRendered(function() {
  c=[];
  teacherClasses=[];
  studentClasses=[];
  teacherClasses=Meteor.user().classesTeacher;
  studentClasses=Meteor.user().classes;
  c=c.concat(teacherClasses,studentClasses);
  c=_.uniq(c);
  classId=location.pathname.substring(10);
  if ( ! c.includes(classId)  ) {
    if ( location.host == 'localhost:8000' ) {
      location.href = 'http://localhost:8000/';
    }
    if (location.origin == 'https://www.myclassgame.es') {
      location.href = 'https://www.myclassgame.es/';
    }
  }
})


Template.studentsMainPage.helpers({
  className: function() {
    return Session.get('className');
  },
  btnSelected: function(option) {
    if ( option == "students" && Session.get('sogBtn') == "students" ) {return "btn-warning"; }
    if ( option == "groups" && Session.get('sogBtn') == "groups" ) {return "btn-warning"; }
  },
  studentsSelected: function() {
    if ( Session.get('sogBtn') == "students" ) {
      return true;
    } else {
      return false;
    }
  },
  golSelected: function(option) {
    if ( option == "grid" && Session.get('golBtn') == "grid" ) {return "btn-warning"; }
    if ( option == "list" && Session.get('golBtn') == "list" ) {return "btn-warning"; }
  },
  gridSelected: function() {
    if ( Session.get('golBtn') == "grid" ) {
      return true;
    } else {
      return false;
    }
  },
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
  },
  idClass: function() {
    return Session.get('classId');
  },
  selected: function() {
    return Session.get('studentSelected');
  },
  selEval: function(e) {
    if (classes.findOne({_id:Session.get('classId')}).evaluation==e) {
      return "selected"
    } else {
      return "";
    }
  },
  students: function() {
    return students.find({ classId: Session.get('classId') }, {sort: {XP: -1,_id: 1}} );
  },
  groups: function() {
    return groups.find({classId: Session.get('classId')});
  },
  parent: function() {
    if (Session.get('userType')=="parent") {
     return true;
    } else {
     return false;
    };
  },
  invertChecked: function() {
    return Session.get('invertOrder');
  },
  image: function(avatar) {
    avatarVisible=classes.findOne({ _id: Session.get('classId') }).avatarVisible;
    if ( avatar=="" || !avatar || (  Session.get('userType') != "teacher"  &&  !avatarVisible ) ) {
      if ( classes.findOne({_id: Session.get('classId')}).studentImg ) {
        if (classes.findOne({_id: Session.get('classId')}).studentImg.substring(0, 4)=="http") {
          return classes.findOne({_id: Session.get('classId')}).studentImg;
        } else {
          cloudinary_url=images.findOne({_id: classes.findOne({_id: Session.get('classId')}).studentImg}).image_url;
          cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
          return cloudinary_url;
        }
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/q_auto,w_auto,h_60,f_auto,dpr_auto/v1542963357/proves/luke.png";
      }
    } else  {
      if (avatar.substring(0, 4)=="http") {
        return avatar;
      } else {
        cloudinary_url=images.findOne({_id: avatar}).image_url;
        cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
        return cloudinary_url;
      }
    }
  },
  hideAbsents: function() {
    return Session.get('hideAbsents');
  },
  compressCard: function() {
    return Session.get("compressCard");
  }
});

Template.studentsMainPage.events({
  'click .btn-sog': function(event) {
    event.preventDefault();
    Session.setPersistent('sogBtn', event.target.id);
  },
  'click .btn-gol': function(event) {
    event.preventDefault();
    Session.setPersistent('golBtn', event.currentTarget.id);
  },
  'click .btn-all': function(event) {
    event.preventDefault();
    students.find( { $and: [ { selected: 0 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
      Meteor.call('studentSelection', item["_id"]);
    });
    /*if (Session.get('allBtn')=="All") {
      Session.set('allBtn', 'None');
      $('#all').removeClass('btn-warning');
      students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
        Meteor.call('studentSelection', item["_id"]);
      });
    } else {
      Session.set('allBtn', 'All');
      $('#all').addClass('btn-warning');
      students.find( { $and: [ { selected: 0 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
        Meteor.call('studentSelection', item["_id"]);
      });
    };*/
  },
  'click .btn-none': function(event) {
    event.preventDefault();
    students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
      Meteor.call('studentSelection', item["_id"]);
    });
  },
  'click .invert': function(event) {
    event.preventDefault();
    students.find( { classId: Session.get('classId')  } ).forEach(function (item){
        Meteor.call('studentSelection', item["_id"]);
    });
  },
  'click .btn-presents': function(event) {
    event.preventDefault();
    students.find( { classId: Session.get('classId'), selected: 1  } ).forEach(function (item){
        Meteor.call('studentSelection', item["_id"]);
    });
    students.find( { classId: Session.get('classId'), present: 1  } ).forEach(function (item){
        Meteor.call('studentSelection', item["_id"]);
    });
  },
  'click .btn-deleteStudents': function(event) {
    event.preventDefault();
    if (students.find( { classId: Session.get('classId'), selected: 1  } ).count() > 0 ) {
      swal({
        title: TAPi18n.__('delete') + " " + TAPi18n.__('students'),
        text: TAPi18n.__('areYouSure'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: TAPi18n.__('yes'),
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          students.find( { classId: Session.get('classId'), selected: 1  } ).forEach(function (item){
            Meteor.call('studentDelete', item["_id"]);
          });
          swal({
            title: TAPi18n.__('students') + " " + TAPi18n.__('deleted'),
            type: 'success'
          })
        // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
        }
      })
    }
  },
  'click .btn-xp3': function(event) {
    event.preventDefault();
    if ( Session.get('userType')=="teacher") {
      Modal.show('allXPModal');
    }
  },
  'click .btn-hp3': function(event) {
    event.preventDefault();
    if ( Session.get('userType')=="teacher") {
      Modal.show('allHPModal');
    }
  },
  'click .btn-bg3': function(event) {
    event.preventDefault();
    if ( Session.get('userType')=="teacher") {
      Modal.show('allBGModal');
    }
  },
  'click .btn-cards3': function(event) {
    event.preventDefault();
    if ( Session.get('userType')=="teacher") {
      Modal.show('allCardsModal');
    }
  },
  'click .btn-chromes': function(event) {
    event.preventDefault();
    if ( Session.get('userType')=="teacher") {
      Modal.show('allChromesModal');
    }
  },
  'click .btn-coins3': function(event) {
    event.preventDefault();
    if ( Session.get('userType')=="teacher") {
      Modal.show('allCoinsModal');
    }
  },
  'click .btn-store3': function(event) {
    event.preventDefault();
    if ( Session.get('userType')=="teacher") {
      Modal.show('allStoreModal');
    }
  },
  'change #className': function(event) {
    event.preventDefault();
    Meteor.call('classUpdate',Session.get('classId'), event.currentTarget.value);
  },
  'change select#evaluacion': function(event) {
    event.preventDefault();
    //alert($(event.target).val());
    Session.setPersistent('evaluation', $(event.target).val());
    Meteor.call('changeEvaluation', Session.get('classId'),$(event.target).val());
  },
  'click #hashClase': function(event) {
    event.preventDefault();
    Modal.show('messageModal');
  },
  'click .student_button': function(event) {
    event.preventDefault();
    Session.setPersistent('studentId',event.target.id);
    Session.set('studentSelected', true);
    Session.setPersistent('sogBtn', "students");
    Session.set('groupSelected', false);
  },
  'click .all_button': function(event) {
    event.preventDefault();
    Session.set('studentSelected', false);
    Session.set('groupSelected', false);
  },
  'click .group_button': function(event) {
    event.preventDefault();
    Session.setPersistent('groupId',event.target.id);
    Session.set('groupSelected', true);
    Session.setPersistent('sogBtn', "groups");
    Session.set('studentSelected', false);
  },
  'click .clases': function(event) {
    event.preventDefault();
    Session.set('className', '');
    Session.set('studentSelected', false);
    Session.set('groupSelected', false);
    $("#fondo").css("background-image", "");
    //Router.go('/');
  },
  'click .student_button': function(event) {
    event.preventDefault();
    Session.setPersistent('studentId',event.target.id);
    Session.set('studentSelected', true);
    Session.setPersistent('sogBtn', "students");
    Session.set('groupSelected', false);
  },
  'click .all_button': function(event) {
    event.preventDefault();
    Session.set('studentSelected', false);
    Session.set('groupSelected', false);
  },
  'click .group_button': function(event) {
    event.preventDefault();
    Session.setPersistent('groupId',event.target.id);
    Session.set('groupSelected', true);
    Session.setPersistent('sogBtn', "groups");
    Session.set('studentSelected', false);
  },
  'change #orderSelect': function(event) {
    event.preventDefault();
    Session.set('orderStudents', $("#orderSelect").val());
  },
  'change #invertCheck': function(event) {
    event.preventDefault();
    if (event.currentTarget.checked){
      c="checked";
    } else {
      c="";
    }
    Session.set('invertOrder', c);
  },
  'change #floatMenu': function(event) {
    event.preventDefault();
    $("#menu-superior").toggleClass("oculto");
  },
  'click #allStudentsAbsents': function(event) {
    event.preventDefault();
    Meteor.call('allStudentsAbsents', Session.get('classId'));
  },
  'click #allStudentsPresents': function(event) {
    event.preventDefault();
    Meteor.call('allStudentsPresents', Session.get('classId'));
  },
  'click #hideAbsents': function(event) {
    event.preventDefault();
    Session.set('hideAbsents', !Session.get('hideAbsents'));
  },
  'click .submenuBtn': function(event) {
    event.preventDefault();
    $('#mainPageMenu').toggleClass('in');
    /*
    $('.submenuHide').toggleClass('oculto');
    if ($('.submenuBtn').text()=="-") {
      $('.submenuBtn').text("+");
    } else {
      $('.submenuBtn').text("-");
    }*/
  },
  'click .export': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('downloadCSV'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        var fields = [
          "id",
          "alias",
          "name",
          "email",
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
            c.email,
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

        swal({
          title: TAPi18n.__('CSVdownloaded'),
          type: 'success'
        })
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })

  },
  'click .btn-compressCard': function(event) {
    event.preventDefault();
    Session.set("compressCard",!Session.get("compressCard"))
  }
 });
