Template.gamificationView.helpers({
  badgesList: function() {
    return badges.find({classId: Session.get('classId')});
  },
  store: function() {
    return store.find({classId: Session.get('classId')});
  },
  chromes: function() {
    return chromes.find({classId: Session.get('classId')});
  },
  chromeTypeData: function(chromeType) {
    chromeTypes=classes.findOne({_id: Session.get('classId')}).chromeTypes;
    let obj = chromeTypes.find(o => o._id === chromeType);
    if (obj) {
      return obj;
    } else {
      return true;
    }
  },
  cards: function() {
    return cards.find({classId: Session.get('classId')});
  },
  quotes: function() {
    return quotes.find({classId: Session.get('classId')});
  },
  randomEvents: function() {
    return randomEvents.find({classId: Session.get('classId')});
  },
  behaviourList: function() {
    return behaviours.find({classId: Session.get('classId')});
  },
  XPisChecked: function() {
    if (this.positive) {
      return "checked";
    } else {
      return ""
    }
  },
  convictions: function() {
    return convictions.find({classId: Session.get('classId')});
  },
  villains: function() {
    return villains.find({classId: Session.get('classId')});
  },
  parametersClass: function() {
    return classes.findOne({_id: Session.get('classId')});
  },
  levelObj: function() {
    return levels.find({classId: Session.get('classId')}); //,{sort: { 'level' : 1 }});
  },
  levelChange: function(l) {
    c=classes.findOne({_id: Session.get('classId')});
    if (c.levelXPRatio>1){
      return parseInt(Math.trunc(Math.ceil(c.levelXP*(1-Math.pow(c.levelXPRatio,l))/(1-c.levelXPRatio))));
    } else {
      return  parseInt(Math.trunc(c.levelXP*l));
    }
  },
  component_src: function(imageId,high) {
    if (high) {
      h="h_400";
    } else {
      h="h_200";
    }
    if (imageId) {
      cloudinary_url=images.findOne({_id: imageId}).image_url;
      cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,' + h + ',f_auto,dpr_auto/');
      return cloudinary_url;
    } else {
      if (Session.get('selectedImage')) {
        cloudinary_url=images.findOne({_id: Session.get('selectedImage')}).image_url;
        cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,' + h + ',f_auto,dpr_auto/');
        return cloudinary_url;
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/q_auto,w_auto," + h + ",f_auto,dpr_auto/v1554810211/images/event-2930674_960_720.png";
      }
    }
  },
})
