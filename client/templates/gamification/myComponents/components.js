Template.componentsTemplate.events({
    'click .classChromes': function(event) {
        event.preventDefault();
        Meteor.subscribe('chromes',"class",Session.get("classId"));
    }
});