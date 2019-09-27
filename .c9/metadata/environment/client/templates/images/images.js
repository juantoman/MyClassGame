{"filter":false,"title":"images.js","tooltip":"/client/templates/images/images.js","ace":{"folds":[],"scrolltop":1635,"scrollleft":0,"selection":{"start":{"row":99,"column":8},"end":{"row":99,"column":55},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"hash":"18705c17c1c12db709b43d03ae7160c12b21cd30","undoManager":{"mark":30,"position":30,"stack":[[{"start":{"row":56,"column":5},"end":{"row":57,"column":0},"action":"insert","lines":["",""],"id":2},{"start":{"row":57,"column":0},"end":{"row":57,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":57,"column":4},"end":{"row":63,"column":5},"action":"insert","lines":["if ( Session.get('imageType') == \"group\" ) {","      if (groups.find({_id: Session.get('idElementImage')}).count()!=0) {","        idElement=groups.findOne({_id: Session.get('idElementImage')}).groupImg;","      } else {","        idElement=classes.findOne({_id: Session.get('idElementImage')}).groupImg;","      }","    }"],"id":3}],[{"start":{"row":57,"column":38},"end":{"row":57,"column":43},"action":"remove","lines":["group"],"id":4},{"start":{"row":57,"column":38},"end":{"row":57,"column":39},"action":"insert","lines":["c"]},{"start":{"row":57,"column":39},"end":{"row":57,"column":40},"action":"insert","lines":["l"]},{"start":{"row":57,"column":40},"end":{"row":57,"column":41},"action":"insert","lines":["a"]},{"start":{"row":57,"column":41},"end":{"row":57,"column":42},"action":"insert","lines":["s"]},{"start":{"row":57,"column":42},"end":{"row":57,"column":43},"action":"insert","lines":["s"]}],[{"start":{"row":58,"column":10},"end":{"row":58,"column":16},"action":"remove","lines":["groups"],"id":5},{"start":{"row":58,"column":10},"end":{"row":58,"column":11},"action":"insert","lines":["c"]},{"start":{"row":58,"column":11},"end":{"row":58,"column":12},"action":"insert","lines":["l"]},{"start":{"row":58,"column":12},"end":{"row":58,"column":13},"action":"insert","lines":["a"]},{"start":{"row":58,"column":13},"end":{"row":58,"column":14},"action":"insert","lines":["s"]},{"start":{"row":58,"column":14},"end":{"row":58,"column":15},"action":"insert","lines":["s"]},{"start":{"row":58,"column":15},"end":{"row":58,"column":16},"action":"insert","lines":["e"]},{"start":{"row":58,"column":16},"end":{"row":58,"column":17},"action":"insert","lines":["s"]}],[{"start":{"row":59,"column":71},"end":{"row":59,"column":76},"action":"remove","lines":["group"],"id":6},{"start":{"row":59,"column":71},"end":{"row":59,"column":72},"action":"insert","lines":["c"]},{"start":{"row":59,"column":72},"end":{"row":59,"column":73},"action":"insert","lines":["l"]},{"start":{"row":59,"column":73},"end":{"row":59,"column":74},"action":"insert","lines":["a"]},{"start":{"row":59,"column":74},"end":{"row":59,"column":75},"action":"insert","lines":["s"]},{"start":{"row":59,"column":75},"end":{"row":59,"column":76},"action":"insert","lines":["s"]}],[{"start":{"row":58,"column":6},"end":{"row":60,"column":14},"action":"remove","lines":["if (classes.find({_id: Session.get('idElementImage')}).count()!=0) {","        idElement=groups.findOne({_id: Session.get('idElementImage')}).classImg;","      } else {"],"id":7},{"start":{"row":58,"column":4},"end":{"row":58,"column":6},"action":"remove","lines":["  "]},{"start":{"row":58,"column":2},"end":{"row":58,"column":4},"action":"remove","lines":["  "]},{"start":{"row":58,"column":0},"end":{"row":58,"column":2},"action":"remove","lines":["  "]},{"start":{"row":57,"column":48},"end":{"row":58,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":58,"column":6},"end":{"row":58,"column":8},"action":"remove","lines":["  "],"id":8}],[{"start":{"row":59,"column":0},"end":{"row":59,"column":7},"action":"remove","lines":["      }"],"id":9},{"start":{"row":58,"column":79},"end":{"row":59,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":94,"column":7},"end":{"row":95,"column":0},"action":"insert","lines":["",""],"id":10},{"start":{"row":95,"column":0},"end":{"row":95,"column":6},"action":"insert","lines":["      "]}],[{"start":{"row":95,"column":6},"end":{"row":97,"column":7},"action":"insert","lines":["if (Session.get('imageType')==\"item\") {","        Meteor.call('imageItemUpdate',Session.get('idElementImage'),$(\"input[name='imageId']:checked\").val());","      }"],"id":11}],[{"start":{"row":95,"column":37},"end":{"row":95,"column":41},"action":"remove","lines":["item"],"id":12},{"start":{"row":95,"column":37},"end":{"row":95,"column":38},"action":"insert","lines":["c"]},{"start":{"row":95,"column":38},"end":{"row":95,"column":39},"action":"insert","lines":["l"]},{"start":{"row":95,"column":39},"end":{"row":95,"column":40},"action":"insert","lines":["a"]},{"start":{"row":95,"column":40},"end":{"row":95,"column":41},"action":"insert","lines":["s"]},{"start":{"row":95,"column":41},"end":{"row":95,"column":42},"action":"insert","lines":["s"]}],[{"start":{"row":96,"column":21},"end":{"row":96,"column":26},"action":"remove","lines":["image"],"id":13},{"start":{"row":96,"column":21},"end":{"row":96,"column":22},"action":"insert","lines":["c"]},{"start":{"row":96,"column":22},"end":{"row":96,"column":23},"action":"insert","lines":["l"]},{"start":{"row":96,"column":23},"end":{"row":96,"column":24},"action":"insert","lines":["a"]},{"start":{"row":96,"column":24},"end":{"row":96,"column":25},"action":"insert","lines":["s"]},{"start":{"row":96,"column":25},"end":{"row":96,"column":26},"action":"insert","lines":["s"]}],[{"start":{"row":96,"column":21},"end":{"row":96,"column":30},"action":"remove","lines":["classItem"],"id":14},{"start":{"row":96,"column":21},"end":{"row":96,"column":28},"action":"insert","lines":["backImg"]}],[{"start":{"row":95,"column":37},"end":{"row":95,"column":42},"action":"remove","lines":["class"],"id":15},{"start":{"row":95,"column":37},"end":{"row":95,"column":38},"action":"insert","lines":["b"]},{"start":{"row":95,"column":38},"end":{"row":95,"column":39},"action":"insert","lines":["a"]},{"start":{"row":95,"column":39},"end":{"row":95,"column":40},"action":"insert","lines":["c"]},{"start":{"row":95,"column":40},"end":{"row":95,"column":41},"action":"insert","lines":["k"]}],[{"start":{"row":95,"column":41},"end":{"row":95,"column":42},"action":"insert","lines":["I"],"id":16},{"start":{"row":95,"column":42},"end":{"row":95,"column":43},"action":"insert","lines":["m"]}],[{"start":{"row":95,"column":43},"end":{"row":95,"column":44},"action":"insert","lines":["g"],"id":17}],[{"start":{"row":57,"column":38},"end":{"row":57,"column":43},"action":"remove","lines":["class"],"id":18},{"start":{"row":57,"column":38},"end":{"row":57,"column":45},"action":"insert","lines":["backImg"]}],[{"start":{"row":96,"column":108},"end":{"row":97,"column":0},"action":"insert","lines":["",""],"id":19},{"start":{"row":97,"column":0},"end":{"row":97,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":97,"column":8},"end":{"row":98,"column":150},"action":"insert","lines":["$(\"#mainTab\").css('background-image','url(\"'+images.findOne({_id: classes.findOne({_id: Session.get(\"classId\")}).backImg}).image_url+'\")');","    $(\".studentProfile\").css('background-image','url(\"'+images.findOne({_id: classes.findOne({_id: Session.get(\"classId\")}).backImg}).image_url+'\")');"],"id":20}],[{"start":{"row":98,"column":4},"end":{"row":98,"column":6},"action":"insert","lines":["  "],"id":21}],[{"start":{"row":98,"column":6},"end":{"row":98,"column":8},"action":"insert","lines":["  "],"id":22}],[{"start":{"row":98,"column":154},"end":{"row":99,"column":0},"action":"insert","lines":["",""],"id":23},{"start":{"row":99,"column":0},"end":{"row":99,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":99,"column":8},"end":{"row":99,"column":82},"action":"insert","lines":["$(\".opacityProfile\").css('background-color': 'rgba(0,0,0,0.4) !important';"],"id":24}],[{"start":{"row":99,"column":81},"end":{"row":99,"column":82},"action":"insert","lines":[")"],"id":28}],[{"start":{"row":99,"column":12},"end":{"row":99,"column":26},"action":"remove","lines":["opacityProfile"],"id":30},{"start":{"row":99,"column":12},"end":{"row":99,"column":22},"action":"insert","lines":["opacityDiv"]}],[{"start":{"row":99,"column":25},"end":{"row":99,"column":79},"action":"remove","lines":["css('background-color': 'rgba(0,0,0,0.4) !important');"],"id":31},{"start":{"row":99,"column":25},"end":{"row":99,"column":26},"action":"insert","lines":["t"]},{"start":{"row":99,"column":26},"end":{"row":99,"column":27},"action":"insert","lines":["o"]}],[{"start":{"row":99,"column":25},"end":{"row":99,"column":27},"action":"remove","lines":["to"],"id":32},{"start":{"row":99,"column":25},"end":{"row":99,"column":38},"action":"insert","lines":["toggleClass()"]}],[{"start":{"row":99,"column":37},"end":{"row":99,"column":39},"action":"insert","lines":["''"],"id":33}],[{"start":{"row":99,"column":38},"end":{"row":99,"column":48},"action":"insert","lines":["opacityDiv"],"id":34}],[{"start":{"row":99,"column":38},"end":{"row":99,"column":48},"action":"remove","lines":["opacityDiv"],"id":35},{"start":{"row":99,"column":38},"end":{"row":99,"column":52},"action":"insert","lines":["opacityProfile"]}],[{"start":{"row":99,"column":54},"end":{"row":99,"column":55},"action":"insert","lines":[";"],"id":36}]]},"timestamp":1569498064255}