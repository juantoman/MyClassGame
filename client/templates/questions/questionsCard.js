function LightenDarkenColor(col, amt) {

    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}

Template.questionsCardTemplate.helpers({
  otherColor: function(color) {
    /*
    var c1 = 0x000851; // Stored as 16777215
    var c2 = 0x1CB5E0; // Stored as 16711680
    d = c1 - c2; // 16777215 - 16711680 = 65535
    c=this.missionColor.substr(1, 6);
    missionColor=parseInt(c, 16);
    result=missionColor+d;
    console.log("AAAAAAAAAAAAAAAAAA");
    console.log(result);
    if ( result >= 16777215) {
      result=result-16777215;
    }
    var color = result.toString(16); // 'ffff', converted back to hex
    color = "#"+"000000".substr(0, 6 - color.length) + color;

    */
    color=LightenDarkenColor(color, 150);
    if (color>="#ffffff") {
      color=LightenDarkenColor(color,-150);
    }
    return color;
  },
  cardPic: function(missionImg) {
    // if (missionImg) {
    //   url=images.findOne({_id: missionImg}).image_url;
    // } else {
    //   url="";
    // }
    // return url;
    if (missionImg) {
      url=images.findOne({_id: this.missionImg}).image_url;
      url=url.replace('/upload/','/upload/q_auto,w_auto,h_200,f_auto,dpr_auto/');
    } else {
      cardPic=classes.findOne({_id:Session.get('classId')}).backImg;
      if (cardPic.substring(0, 4)=="http") {
        url=cardPic;
      } else {
        url=images.findOne({_id: cardPic}).image_url;
        url=url.replace('/upload/','/upload/q_auto,w_auto,h_200,f_auto,dpr_auto/');
      }
    }
    return url;
  },
  teacher: function() {
    if (Session.get('userType')!="teacher") {
     return "readonly";
    };
  },
  disTeacher: function() {
    if (Session.get('userType')!="teacher") {
     return "disabled";
    };
  },
  isTeacher: function() {
    if (Session.get('userType')=="teacher") {
      return true;
    } else {
      return false;
    };
  },
  TeacherOrVisible: function() {
    if (Session.get('userType')=="teacher" || this.visible) {
      return true;
    } else {
      return false;
    };
  }
});

Template.questionsCardTemplate.events({
  'click .quizBtnInfo,.quizCard .text': function(event) {
    event.preventDefault();
    Session.set('quizId',this._id);
    Modal.show("quizModal");
  },
  'click .quizVisibleBtn': function(event) {
    event.preventDefault();
    Meteor.call('quizVisibleToggle', this._id);
  }
});

Template.questionsCardCreateTemplate.helpers({
  otherColor: function(color) {
    /*
    var c1 = 0x000851; // Stored as 16777215
    var c2 = 0x1CB5E0; // Stored as 16711680
    d = c1 - c2; // 16777215 - 16711680 = 65535
    c=this.missionColor.substr(1, 6);
    missionColor=parseInt(c, 16);
    result=missionColor+d;
    console.log("AAAAAAAAAAAAAAAAAA");
    console.log(result);
    if ( result >= 16777215) {
      result=result-16777215;
    }
    var color = result.toString(16); // 'ffff', converted back to hex
    color = "#"+"000000".substr(0, 6 - color.length) + color;

    */
    color=LightenDarkenColor(color, 150);
    if (color>="#ffffff") {
      color=LightenDarkenColor(color,-150);
    }
    return color;
  },
  cardPic: function(missionImg) {
    // if (missionImg) {
    //   url=images.findOne({_id: missionImg}).image_url;
    // } else {
    //   url="";
    // }
    // return url;
    if (missionImg) {
      url=images.findOne({_id: this.missionImg}).image_url;
      url=url.replace('/upload/','/upload/q_auto,w_auto,h_200,f_auto,dpr_auto/');
    } else {
      cardPic=classes.findOne({_id:Session.get('classId')}).backImg;
      if (cardPic.substring(0, 4)=="http") {
        url=cardPic;
      } else {
        url=images.findOne({_id: cardPic}).image_url;
        url=url.replace('/upload/','/upload/q_auto,w_auto,h_200,f_auto,dpr_auto/');
      }
    }
    return url;
  }
});

Template.questionsCardCreateTemplate.events({
  'click .quizCard': function(event) {
    event.preventDefault();
    Modal.show("newquizModal");
  }
});
