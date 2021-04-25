Template.newCollectionableCard.helpers({
  chromeTypes: function() {
    return classes.findOne({_id: Session.get('classId')}).chromeTypes;
  }
});

Template.newCollectionableCard.events({
  'click .element-card__image, click .element-card-full__image, click .element-card-noMCG__unit-name': function(event) {
    event.preventDefault();
    $('.element-card-inner').removeClass('element-card-rotated');
    $(event.target).closest('.element-card-inner').addClass('element-card-rotated');
  },
  'click .cardClose': function(event) {
    event.preventDefault();
    $('.element-card-inner').removeClass('element-card-rotated');
    event.stopPropagation();
  },
  'click .btnMCGCard, click .btnEnvelopeChrome, click .btnSingleChrome': function(event) {
    event.preventDefault();
    $(event.target).toggleClass('btnCardSelected');
    event.stopPropagation();
  },
  'submit form.elementCardForm': function(event) {
    event.preventDefault();
    //console.log($(event.target).find('[name=eventDescription]').val())
    price = isNaN($(event.target).find('[name=chromePrice]').val()) || $(event.target).find('[name=chromePrice]').val() == "" ? parseInt(0): parseInt($(event.target).find('[name=chromePrice]').val());
    level = isNaN($(event.target).find('[name=chromeLevel]').val()) || $(event.target).find('[name=chromeLevel]').val() == "" ? parseInt(0): parseInt($(event.target).find('[name=chromeLevel]').val());
    mcgType=$(event.target).find('[name=btnMCGCard]').hasClass("btnCardSelected");
    envelopeChrome=$(event.target).find('[name=btnEnvelopeChrome]').hasClass("btnCardSelected");
    singleChrome=$(event.target).find('[name=btnSingleChrome]').hasClass("btnCardSelected");
    color = $('.ncardgem').attr('src');
    if (color.indexOf("green")!=-1) {
      ncolor="green";
    }
    if (color.indexOf("orange")!=-1) {
      ncolor="orange";
    }
    if (color.indexOf("red")!=-1) {
      ncolor="red";
    }
    var chrome = {
      classId: Session.get('classId'),
      chromeName: $(event.target).find('[name=chromeName]').val(),
      chromeDescription: $(event.target).find('[name=chromeDescription]').val(),
      chromeLevel: level,
      chromePrice: price,
      chromeMCG: mcgType,
      envelopeChrome: envelopeChrome,
      singleChrome: singleChrome,
      chromeType: $(event.target).find('[name=chromeType]').val(),
      chromeWeird:ncolor,
      createdOn: new Date()
    };
    Meteor.call('chromeInsert', chrome);
  },
  'click .ncardgem': function(event) {
    event.preventDefault();
    ccolor = $(event.target).attr('src');
    if (ccolor.indexOf("green")!=-1) {
      ncolor="orange";
    }
    if (ccolor.indexOf("orange")!=-1) {
      ncolor="red";
    }
    if (ccolor.indexOf("red")!=-1) {
      ncolor="green";
    }
    $(event.target).attr('src','/images/'+ncolor+'.png');
  }
});
