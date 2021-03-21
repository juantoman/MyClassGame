Template.levelsTemplate.helpers({
  parametersClass: function() {
    return classes.findOne({_id: Session.get('classId')});
  },
  levelObj: function() {
    return levels.find({classId: Session.get('classId')}); //,{sort: { 'level' : 1 }});
  },
  nextLevel: function() {
    return levels.find({classId: Session.get('classId')}).count();
  }
});

Template.levelsTemplate.events({
  'change #levelXP': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      Meteor.call('levelXPUpdate', Session.get('classId'), event.currentTarget.value);
    }
  },
  'change #levelXPRatio': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      Meteor.call('levelXPRatioUpdate', Session.get('classId'), event.currentTarget.value);
    }
  },
  'change .xpCheck': function(event) {
    event.preventDefault();
    Meteor.call('xpChangeLevel', Session.get('classId'), event.currentTarget.checked);
    if (event.currentTarget.checked) {
      c=classes.findOne({_id: Session.get('classId')});
      levelXP=c.levelXP;
      levelXPRatio=c.levelXPRatio;
      students.find( { classId: Session.get('classId') }).forEach(function (s){
        na=s.level;
        XP=s.XP;
        if ( isNaN(levelXP) || levelXP =="" || levelXP == 0 ) {
          n=0;
        } else {
          n=parseInt((XP/levelXP-1)/levelXPRatio+1);
        }
        if ( na != n ) {
          Meteor.call('studentLevel', s._id, n);
        }
      })
    }
  },
  'submit form': function(event) {
    event.preventDefault();
    //n=parseInt(levels.find({classId: Session.get('classId')}).count());
    var level = {
      classId: Session.get('classId'),
      levelDescription: $(event.target).find('[name=levelDescription]').val(),
      level: $(event.target).find('[name=level]').val(),
      createdOn: new Date()
    };
    Meteor.call('levelInsert', level);
  },
  'change .inputGroup': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      if (! $(event.target).hasClass("level"))
      {
        Meteor.call('levelUpdateDesc', this._id, event.currentTarget.value);
      } else {
        Meteor.call('levelUpdate', this._id, event.currentTarget.value);
      }
    } else {
      Meteor.call('levelDelete',this._id);
    }
  }
});
