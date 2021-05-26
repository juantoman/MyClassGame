$.getScript("https://unpkg.com/vis-network/standalone/umd/vis-network.min.js");

Template.mcgmap.helpers({
  mapImg: function() {
    mapImg=classes.findOne({_id:Session.get('classId')}).mapImg;
    url=images.findOne({_id: mapImg}).image_url;
    url=url.replace('/upload/','/upload/q_auto,w_auto,h_2000,f_auto,dpr_auto/');
    return url
  }
})

Template.mcgmap.events({
  'click #seeMap': function(event) {
    event.preventDefault();
    $('#missionMapContainer').toggleClass("oculto");
    if(!$('#missionMapContainer').hasClass("oculto")) {
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
        node={
            id: i,
            label: "M"+i,
            x:x,
            y:y,
            borderWidth: 3,
            font: {
              size:30,
              color: 'white',
              bold: true
            },
            color: {
              border: 'white',
              background: m[i-1].missionColor
            },
            shadow:{
             enabled: true,
             color: 'rgba(0,0,0,1)',
             size:7,
             x:10,
             y:10
           },
           shape: 'box',
           margin: 10
        };
        nodes.add(node);
        if ( i != n) {
          edge={
              from: i,
              to: i+1,
              arrows: "to",
              width: 8,
              color: m[i-1].missionColor,
              shadow:{
               enabled: true,
               color: 'rgba(0,0,0,1)',
               size:7,
               x:10,
               y:10
             }
          };
          edges.add(edge)
        }
      }

      // create a network
      var container = document.getElementById('missionMap');

      var img = document.getElementById('missionMapImage');
      var width = img.clientWidth;
      var height = img.clientHeight;
      var widthIni=1697;
      var r=width/widthIni;

      // provide the data in the vis format
      var data = {
          nodes: nodes,
          edges: edges
      };
      var options = {
        autoResize: false,
        width: parseInt(width/r) + 'px',
        height: parseInt(height/r) +'px',
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
      network.setSize(width,height);
      network.redraw();

      network.on("dragEnd", function (params) {
        //https://stackoverflow.com/questions/40489700/visjs-save-manipulated-data-to-json
    	  coord={
          x:parseInt(params.pointer.canvas.x),
          y:parseInt(params.pointer.canvas.y)
        }
        mId=challenges.findOne({classId: Session.get('classId'), order: params.nodes[0]})._id;
        Meteor.call('chalUpdate', mId, coord);
      });

      network.on("click", function (params) {
        //https://stackoverflow.com/questions/40489700/visjs-save-manipulated-data-to-json
        mId=challenges.findOne({classId: Session.get('classId'), order: params.nodes[0]})._id;
        $('#missionMapContainer').toggleClass("oculto");
        $("#missionsPage").addClass("oculto");
        $("#missionPage").removeClass("oculto");
        Session.set('chalId',mId);
      });

      window.onresize=function viewportHandler(event) {
        var width = img.clientWidth;
        var height = img.clientHeight;
        network.setSize(width,height);
        network.redraw();
      }
    }
  },
  'click .changeMap, click .changeMap2': function(event) {
    event.preventDefault();
    if (Session.get('userType')=="teacher") {
      Session.set('imageType','map');
      Session.set('idElementImage',Session.get("classId"));
      Modal.show('imagesTemplate');
    }
  },
  'click .closeImage': function(event) {
    event.preventDefault();
    $('#missionMapContainer').toggleClass("oculto");
  }
});
