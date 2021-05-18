$.getScript("https://unpkg.com/vis-network/standalone/umd/vis-network.min.js");

Template.mcgmap.onRendered(function() {

  // create an array with nodes
    var nodes = new vis.DataSet([
        {id: 1, label: '1', x:10, y:1 },
        {id: 2, label: '2'},
        {id: 3, label: '3'},
        {id: 4, label: '4'},
        {id: 5, label: '5'}
    ]);

    // create an array with edges
    var edges = new vis.DataSet([
        {from: 1, to: 2},
        {from: 2, to: 3},
        {from: 3, to: 4},
        {from: 4, to: 5}
    ]);

    // create a network
    var container = document.getElementById('missionSvg');

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
      }
    };



    // initialize your network!
    var network = new vis.Network(container, data, options);
})
