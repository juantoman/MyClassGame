$.getScript("https://unpkg.com/vis-network/standalone/umd/vis-network.min.js");

Template.mcgmap.onRendered(function() {


})

Template.mcgmap.events({
  'click #verMapa': function(event) {
    event.preventDefault();
    $('#missionMap').toggleClass("oculto");
    // create an array with nodes
      m=challenges.find({classId: Session.get('classId')}, {sort: {order: 1}}).fetch();
      n=m.length;
      var nodes = new vis.DataSet();
      var edges = new vis.DataSet();
      for (i=1;i<=n;i++) {
        node={
            id: i,
            label: "M"+i,
            x:100*i,
            y:100,
            color: "white"
        };
        nodes.add(node);
        if ( i != n) {
          edge={
              from: i,
              to: i+1,
              arrows: "to"
          };
          edges.add(edge)
        }
      }

      // create a network
      var container = document.getElementById('missionMap');

      // provide the data in the vis format
      var data = {
          nodes: nodes,
          edges: edges
      };
      var options = {
        physics:{
              enabled: false
        },
        edges: {
              smooth: false
        },
        interaction:{
              zoomView: false
        }
      };



      // initialize your network!
      var network = new vis.Network(container, data, options);
  }
});
