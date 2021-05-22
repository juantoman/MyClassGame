$.getScript("https://unpkg.com/vis-network/standalone/umd/vis-network.min.js");

Template.mcgmap.onRendered(function() {
  const nodes = [
    { id: 1, label: 1 },
    { id: 2, label: 2 },
    { id: 3, label: 3 },
    { id: 4, label: 4 },
  ]

  const edges = [
    { id: '1-2',  from: 1, to: 2 },
    { id: '1-3', from: 1, to: 3 },
    { id: '2-3', from: 2, to: 3 },
    { id: '1-4', from: 1, to: 4 },
  ]

  const positionsElement = document.getElementById('positions')
  const container = document.getElementById('missionMap')
  const data = {
    nodes: new vis.DataSet(nodes),
    edges: new vis.DataSet(edges),
  }
  const options = {
    width: '1000px',
    height: '800px',
    layout: {
      improvedLayout: false,
    },
    edges: {
      smooth: false,
    },
    physics: false,
    interaction: {
        dragNodes: true,// do not allow dragging nodes
        zoomView: false, // do not allow zooming
        dragView: false  // do not allow dragging
    }
  }

  let network = null

  function initGraph(generateRandomPosition = true) {
    if (generateRandomPosition) {
      data.nodes.forEach(node => {
        data.nodes.update({ id: node.id, x: undefined, x: undefined })
      })
    }
    network = new vis.Network(container, data, options);
    // network.moveTo({
    //     position: {x: 0, y: 0}
    // })
  }

  document.getElementById('generate-graph').addEventListener('click', initGraph)

  document.getElementById('extract-positions').addEventListener('click', e => {
    network.storePositions()
    const nodePositions = data.nodes.map(({ id, x, y }) => ({ id, x, y }))
    positionsElement.value = JSON.stringify(nodePositions)
  })

  document.getElementById('load-positions').addEventListener('click', e => {
    const nodePositions = JSON.parse(positionsElement.value)
    nodePositions.forEach(nodePosition => data.nodes.update(nodePosition))
    initGraph(false)
  })

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
        width: '1000px',
        height: '800px',
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
      network.moveTo({
          position: {x: 0, y: 0},
          // offset: {x: -width/2, y: -height/2},
          // scale: 1
      })

      network.on("dragEnd", function (params) {
        //https://stackoverflow.com/questions/40489700/visjs-save-manipulated-data-to-json
    	  params.event = "[original event]";
    	  document.getElementById("eventSpanHeading").innerText = "dragEnd event:";
    	  document.getElementById("eventSpanContent").innerText = JSON.stringify(params,null,4);
    	  coord={
          x:parseInt(params.pointer.canvas.x),
          y:parseInt(params.pointer.canvas.y)
        }
        mId=challenges.findOne({classId: Session.get('classId'), order: params.nodes[0]})._id;
        Meteor.call('chalUpdate', mId, coord);
    	  console.log("dragEnd event, getNodeAt returns: " + this.getNodeAt(params.pointer.DOM));
      });
    }
  }
});
