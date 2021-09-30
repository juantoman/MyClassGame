Template.componentsTemplate.events({
    'click .classChromes': function(event) {
        event.preventDefault();
        if( chromes.find({'classId': Session.get('classId')}).count() == 0 ) {
            Meteor.subscribe('chromes',"class",Session.get("classId"));
        }
    }
});