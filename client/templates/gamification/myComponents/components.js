Template.componentsTemplate.events({
    'click .classChromes': function(event) {
        event.preventDefault();
        if( chromes.find({'classId': Session.get('classId')}).count() == 0 ) {        
            Meteor.subscribe('chromes',"class",Session.get("classId"));
        }
        if( images.find({'classId': Session.get('classId'),'type':'chrome'}).count() == 0 ) {        
            Meteor.subscribe('images',Session.get("classId"),["chrome"]);
        }
    }
});