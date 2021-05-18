$.getScript("https://unpkg.com/vis-network/standalone/umd/vis-network.min.js");

Template.mcgmap.onRendered(function() {

  // create an array with nodes
    var nodes = new vis.DataSet([
      {id: 1, label: '1', x:10, y:10, color: "#FFA807" },
      {id: 2, label: '2', x:20, y:50, color: "#FFA807" },
      {id: 3, label: '3', x:90, y:100, color: "#FFA807" },
      {id: 4, label: '4', x:100, y:10, color: "#FFA807" },
      {id: 5, label: '5', x:200, y:10, color: "#FFA807" }
    ]);

    // create an array with edges
    var edges = new vis.DataSet([
        {from: 1, to: 2, arrows: "to" },
        {from: 2, to: 3, arrows: "to" },
        {from: 3, to: 4, arrows: "to" },
        {from: 4, to: 5, arrows: "to" }
    ]);

    // create a network
    var container = document.getElementById('mynetwork');

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
})
