$.getScript("https://unpkg.com/vis-network/standalone/umd/vis-network.min.js");

Template.mcgmap.onRendered(function() {


})

Template.mcgmap.events({
  'click #verMapa': function(event) {
    event.preventDefault();
    $('#missionMap').toggleClass("oculto");
    if(!$('#missionMap').hasClass("oculto")) {
    // create an array with nodes
      m=challenges.find({classId: Session.get('classId')}, {sort: {order: 1}}).fetch();
      n=m.length;
      var nodes = null
      var edges = null
      nodes = new vis.DataSet();
      edges = new vis.DataSet();
      for (i=1;i<=n;i++) {
        if (m[i-1].x) {
          x=parseInt(m[i-1].x);
        } else {
          x=100*i;
        }
        if (m[i-1].y) {
          y=parseInt(m[i-1].y);
        } else {
          y=100;
        }
        console.log(x +" "+ y)
        node={
            id: i,
            label: "M"+i,
            x:x,
            y:y,
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
        autoResize: false,
        height: '1000',
        width: '800',
        physics:{
              enabled: false
        },
        edges: {
              smooth: false
        },
        interaction:{
              zoomView: false,
              dragView: false
        },
        layout:{
          hierarchical: false,
          improvedLayout: false
        }
      };



      // initialize your network!
      var network = null
      network = new vis.Network(container, data, options);

      network.on("dragEnd", function (params) {
        //https://stackoverflow.com/questions/40489700/visjs-save-manipulated-data-to-json
    	  params.event = "[original event]";
    	  document.getElementById("eventSpanHeading").innerText = "dragEnd event:";
    	  document.getElementById("eventSpanContent").innerText = JSON.stringify(params,null,4);
    	  coord={
          x:parseInt(params.pointer.DOM.x),
          y:parseInt(params.pointer.DOM.y)
        }
        mId=challenges.findOne({classId: Session.get('classId'), order: params.nodes[0]})._id;
        Meteor.call('chalUpdate', mId, coord);
    	  console.log("dragEnd event, getNodeAt returns: " + this.getNodeAt(params.pointer.DOM));
      });
    }
  }
});
