{"filter":false,"title":"chat.js","tooltip":"/client/templates/chat/chat.js","undoManager":{"mark":23,"position":23,"stack":[[{"start":{"row":16,"column":0},"end":{"row":46,"column":0},"action":"remove","lines":["","Template.cardsList.events({","  'submit form': function(event) {","    event.preventDefault();","    //console.log($(event.target).find('[name=eventDescription]').val())","    var card = {","      classId: Session.get('classId'),","      cardName: $(event.target).find('[name=cardName]').val(),","      cardDescription: $(event.target).find('[name=cardDescription]').val(),","      cardImage: Session.get('selectedImage'),","      createdOn: new Date()","    };","    Meteor.call('cardInsert', card);","  },","  'change .inputGroup': function(event) {","    event.preventDefault();","    if (event.currentTarget.value )","    {","      Meteor.call('cardUpdate', event.target.name, event.target.id, event.currentTarget.value);","    } else {","      Meteor.call('cardDelete',event.target.name);","    }","  },"," 'click .eImage': function(event) {","    event.preventDefault();","    Session.set('imageType','card');","    Session.set('idElementImage',event.currentTarget.title);","    Modal.show('images');","  }","});",""],"id":2}],[{"start":{"row":15,"column":3},"end":{"row":16,"column":0},"action":"remove","lines":["",""],"id":3}],[{"start":{"row":3,"column":3},"end":{"row":14,"column":3},"action":"remove","lines":[",","  card_src: function(imageId) {","    if (imageId) {","      return images.findOne({_id: imageId}).image_url;","    } else {","      if (Session.get('selectedImage')) {","        return images.findOne({_id: Session.get('selectedImage')}).image_url;","      } else {","        return \"http://res.cloudinary.com/myclassgame/image/upload/v1542714723/myclassgame/Gold_Badge_Template_Clipart_Picture_ohwmt7.png\";","      }","    }","  }"],"id":4}],[{"start":{"row":0,"column":9},"end":{"row":0,"column":18},"action":"remove","lines":["cardsList"],"id":6},{"start":{"row":0,"column":9},"end":{"row":0,"column":13},"action":"insert","lines":["chat"]}],[{"start":{"row":1,"column":2},"end":{"row":1,"column":7},"action":"remove","lines":["cards"],"id":7},{"start":{"row":1,"column":2},"end":{"row":1,"column":3},"action":"insert","lines":["t"]}],[{"start":{"row":1,"column":3},"end":{"row":1,"column":4},"action":"insert","lines":["e"],"id":8}],[{"start":{"row":1,"column":4},"end":{"row":1,"column":5},"action":"insert","lines":["a"],"id":9}],[{"start":{"row":1,"column":5},"end":{"row":1,"column":6},"action":"insert","lines":["c"],"id":10}],[{"start":{"row":1,"column":6},"end":{"row":1,"column":7},"action":"insert","lines":["h"],"id":11}],[{"start":{"row":1,"column":7},"end":{"row":1,"column":8},"action":"insert","lines":["e"],"id":12}],[{"start":{"row":1,"column":8},"end":{"row":1,"column":9},"action":"insert","lines":["r"],"id":13}],[{"start":{"row":1,"column":1},"end":{"row":3,"column":3},"action":"remove","lines":[" teacher: function() {","    return cards.find({classId: Session.get('classId')});","  }"],"id":14},{"start":{"row":1,"column":1},"end":{"row":7,"column":3},"action":"insert","lines":["teacher: function() {","    if (Session.get('userType')==\"teacher\") {","     return true;","    } else {","     return false;","    };","  }"]}],[{"start":{"row":1,"column":0},"end":{"row":1,"column":1},"action":"remove","lines":[" "],"id":15}],[{"start":{"row":1,"column":0},"end":{"row":1,"column":2},"action":"insert","lines":["  "],"id":16}],[{"start":{"row":0,"column":0},"end":{"row":0,"column":1},"action":"insert","lines":["ç"],"id":17}],[{"start":{"row":0,"column":0},"end":{"row":0,"column":1},"action":"remove","lines":["ç"],"id":18}],[{"start":{"row":0,"column":0},"end":{"row":1,"column":0},"action":"insert","lines":["",""],"id":19}],[{"start":{"row":0,"column":0},"end":{"row":4,"column":3},"action":"insert","lines":["Template.studentPage.onRendered(function() {","   $.getScript(\"https://widget.cloudinary.com/v2.0/global/all.js\");","   $.getScript(\"https://media-library.cloudinary.com/global/all.js\");","   grafica();","});"],"id":20}],[{"start":{"row":0,"column":9},"end":{"row":0,"column":20},"action":"remove","lines":["studentPage"],"id":21},{"start":{"row":0,"column":9},"end":{"row":0,"column":13},"action":"insert","lines":["chat"]}],[{"start":{"row":1,"column":3},"end":{"row":3,"column":13},"action":"remove","lines":["$.getScript(\"https://widget.cloudinary.com/v2.0/global/all.js\");","   $.getScript(\"https://media-library.cloudinary.com/global/all.js\");","   grafica();"],"id":22},{"start":{"row":1,"column":3},"end":{"row":1,"column":49},"action":"insert","lines":["window.scrollTo(0,document.body.scrollHeight);"]}],[{"start":{"row":1,"column":3},"end":{"row":1,"column":10},"action":"remove","lines":["window."],"id":60},{"start":{"row":1,"column":3},"end":{"row":1,"column":22},"action":"insert","lines":["$(\"#chatTeachers\")."]}],[{"start":{"row":1,"column":33},"end":{"row":1,"column":59},"action":"remove","lines":["document.body.scrollHeight"],"id":61},{"start":{"row":1,"column":33},"end":{"row":1,"column":34},"action":"insert","lines":["5"]}],[{"start":{"row":1,"column":34},"end":{"row":1,"column":35},"action":"insert","lines":["0"],"id":62}],[{"start":{"row":1,"column":35},"end":{"row":1,"column":36},"action":"insert","lines":["0"],"id":63}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":1,"column":36},"end":{"row":1,"column":36},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1551973938786,"hash":"1522c4160638399ca3e5577217c48a8767a49f97"}