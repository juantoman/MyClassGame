{"filter":false,"title":"studentPage.js","tooltip":"/client/templates/student/studentPage.js","undoManager":{"mark":100,"position":100,"stack":[[{"start":{"row":99,"column":11},"end":{"row":99,"column":12},"action":"insert","lines":["="],"id":145}],[{"start":{"row":99,"column":12},"end":{"row":99,"column":13},"action":"insert","lines":["0"],"id":146}],[{"start":{"row":99,"column":13},"end":{"row":99,"column":14},"action":"insert","lines":[";"],"id":147}],[{"start":{"row":104,"column":16},"end":{"row":104,"column":23},"action":"remove","lines":["XPTotal"],"id":148},{"start":{"row":104,"column":16},"end":{"row":104,"column":46},"action":"insert","lines":["Session.get('missionsXPTotal')"]}],[{"start":{"row":103,"column":4},"end":{"row":103,"column":5},"action":"insert","lines":["/"],"id":149}],[{"start":{"row":103,"column":5},"end":{"row":103,"column":6},"action":"insert","lines":["/"],"id":150}],[{"start":{"row":103,"column":14},"end":{"row":103,"column":24},"action":"remove","lines":["parsetInt("],"id":157}],[{"start":{"row":103,"column":5},"end":{"row":103,"column":6},"action":"remove","lines":["/"],"id":158}],[{"start":{"row":103,"column":4},"end":{"row":103,"column":5},"action":"remove","lines":["/"],"id":159}],[{"start":{"row":103,"column":44},"end":{"row":103,"column":45},"action":"remove","lines":[")"],"id":160}],[{"start":{"row":104,"column":16},"end":{"row":104,"column":46},"action":"remove","lines":["Session.get('missionsXPTotal')"],"id":161},{"start":{"row":104,"column":16},"end":{"row":104,"column":23},"action":"insert","lines":["XPTotal"]}],[{"start":{"row":103,"column":4},"end":{"row":105,"column":44},"action":"remove","lines":["XPTotal=Session.get('missionsXPTotal')+t;","    console.log(XPTotal);","    //Session.set('missionsXPTotal',XPTotal)"],"id":162}],[{"start":{"row":103,"column":2},"end":{"row":103,"column":4},"action":"remove","lines":["  "],"id":163}],[{"start":{"row":103,"column":0},"end":{"row":103,"column":2},"action":"remove","lines":["  "],"id":164}],[{"start":{"row":102,"column":7},"end":{"row":103,"column":0},"action":"remove","lines":["",""],"id":165}],[{"start":{"row":102,"column":7},"end":{"row":102,"column":8},"action":"remove","lines":[";"],"id":166}],[{"start":{"row":99,"column":0},"end":{"row":99,"column":14},"action":"remove","lines":["    XPTotal=0;"],"id":167}],[{"start":{"row":98,"column":8},"end":{"row":99,"column":0},"action":"remove","lines":["",""],"id":168}],[{"start":{"row":127,"column":31},"end":{"row":128,"column":0},"action":"insert","lines":["",""],"id":169},{"start":{"row":128,"column":0},"end":{"row":128,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":128,"column":4},"end":{"row":134,"column":45},"action":"insert","lines":["XPTotal=0;","    chalMissions.find({'missionId':this._id}).forEach(function(c){","      t+=parseInt(c.chalMissionXP);","    });","    XPTotal=Session.get('missionsXPTotal')+t;","    console.log(XPTotal);","    //Session.set('missionsXPTotal',XPTotal);"],"id":170}],[{"start":{"row":43,"column":0},"end":{"row":43,"column":36},"action":"remove","lines":["   Session.set('missionsXPTotal',0);"],"id":171}],[{"start":{"row":42,"column":44},"end":{"row":43,"column":0},"action":"remove","lines":["",""],"id":172}],[{"start":{"row":128,"column":24},"end":{"row":128,"column":31},"action":"remove","lines":["mission"],"id":173},{"start":{"row":128,"column":24},"end":{"row":128,"column":25},"action":"insert","lines":["c"]}],[{"start":{"row":128,"column":25},"end":{"row":128,"column":26},"action":"insert","lines":["l"],"id":174}],[{"start":{"row":128,"column":26},"end":{"row":128,"column":27},"action":"insert","lines":["s"],"id":175}],[{"start":{"row":128,"column":26},"end":{"row":128,"column":27},"action":"remove","lines":["s"],"id":176}],[{"start":{"row":128,"column":26},"end":{"row":128,"column":27},"action":"insert","lines":["a"],"id":177}],[{"start":{"row":128,"column":27},"end":{"row":128,"column":28},"action":"insert","lines":["s"],"id":178}],[{"start":{"row":128,"column":28},"end":{"row":128,"column":29},"action":"insert","lines":["s"],"id":179}],[{"start":{"row":128,"column":33},"end":{"row":128,"column":41},"action":"remove","lines":["this._id"],"id":180},{"start":{"row":128,"column":33},"end":{"row":128,"column":63},"action":"insert","lines":["Session.get('missionsXPTotal')"]}],[{"start":{"row":128,"column":46},"end":{"row":128,"column":61},"action":"remove","lines":["missionsXPTotal"],"id":181},{"start":{"row":128,"column":46},"end":{"row":128,"column":53},"action":"insert","lines":["classId"]}],[{"start":{"row":128,"column":55},"end":{"row":128,"column":56},"action":"insert","lines":[","],"id":182}],[{"start":{"row":128,"column":56},"end":{"row":128,"column":57},"action":"insert","lines":[" "],"id":183}],[{"start":{"row":128,"column":57},"end":{"row":128,"column":59},"action":"insert","lines":["''"],"id":184}],[{"start":{"row":128,"column":57},"end":{"row":128,"column":59},"action":"remove","lines":["''"],"id":185},{"start":{"row":128,"column":57},"end":{"row":128,"column":70},"action":"insert","lines":["type:\"Misión\""]}],[{"start":{"row":128,"column":61},"end":{"row":128,"column":62},"action":"insert","lines":["'"],"id":186}],[{"start":{"row":128,"column":57},"end":{"row":128,"column":58},"action":"insert","lines":["'"],"id":187}],[{"start":{"row":128,"column":56},"end":{"row":128,"column":57},"action":"remove","lines":[" "],"id":188}],[{"start":{"row":128,"column":8},"end":{"row":128,"column":16},"action":"remove","lines":["Missions"],"id":189},{"start":{"row":128,"column":8},"end":{"row":128,"column":9},"action":"insert","lines":["l"]}],[{"start":{"row":128,"column":9},"end":{"row":128,"column":10},"action":"insert","lines":["e"],"id":190}],[{"start":{"row":128,"column":10},"end":{"row":128,"column":11},"action":"insert","lines":["n"],"id":191}],[{"start":{"row":128,"column":11},"end":{"row":128,"column":12},"action":"insert","lines":["g"],"id":192}],[{"start":{"row":128,"column":12},"end":{"row":128,"column":13},"action":"insert","lines":["e"],"id":193}],[{"start":{"row":128,"column":13},"end":{"row":128,"column":14},"action":"insert","lines":["s"],"id":194}],[{"start":{"row":128,"column":92},"end":{"row":129,"column":0},"action":"insert","lines":["",""],"id":195},{"start":{"row":129,"column":0},"end":{"row":129,"column":6},"action":"insert","lines":["      "]}],[{"start":{"row":129,"column":6},"end":{"row":129,"column":105},"action":"insert","lines":["challengesXP.find({'missionId':this._id,'studentId':Session.get('studentId')}).forEach(function(c){"],"id":196}],[{"start":{"row":129,"column":37},"end":{"row":129,"column":41},"action":"remove","lines":["this"],"id":197},{"start":{"row":129,"column":37},"end":{"row":129,"column":38},"action":"insert","lines":["c"]}],[{"start":{"row":129,"column":42},"end":{"row":129,"column":79},"action":"remove","lines":[",'studentId':Session.get('studentId')"],"id":198}],[{"start":{"row":129,"column":63},"end":{"row":129,"column":64},"action":"insert","lines":["x"],"id":199}],[{"start":{"row":129,"column":64},"end":{"row":129,"column":65},"action":"insert","lines":["p"],"id":200}],[{"start":{"row":130,"column":6},"end":{"row":130,"column":8},"action":"insert","lines":["  "],"id":201}],[{"start":{"row":130,"column":37},"end":{"row":131,"column":0},"action":"insert","lines":["",""],"id":202},{"start":{"row":131,"column":0},"end":{"row":131,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":131,"column":6},"end":{"row":131,"column":8},"action":"remove","lines":["  "],"id":203}],[{"start":{"row":131,"column":6},"end":{"row":131,"column":7},"action":"insert","lines":["}"],"id":204}],[{"start":{"row":131,"column":7},"end":{"row":132,"column":0},"action":"insert","lines":["",""],"id":205},{"start":{"row":132,"column":0},"end":{"row":132,"column":6},"action":"insert","lines":["      "]}],[{"start":{"row":132,"column":4},"end":{"row":132,"column":6},"action":"remove","lines":["  "],"id":206}],[{"start":{"row":132,"column":2},"end":{"row":132,"column":4},"action":"remove","lines":["  "],"id":207}],[{"start":{"row":132,"column":0},"end":{"row":132,"column":2},"action":"remove","lines":["  "],"id":208}],[{"start":{"row":131,"column":7},"end":{"row":132,"column":0},"action":"remove","lines":["",""],"id":209}],[{"start":{"row":136,"column":11},"end":{"row":136,"column":41},"action":"remove","lines":["Session.get('missionsXPTotal')"],"id":210},{"start":{"row":136,"column":11},"end":{"row":136,"column":12},"action":"insert","lines":["t"]}],[{"start":{"row":130,"column":8},"end":{"row":130,"column":9},"action":"remove","lines":["t"],"id":211}],[{"start":{"row":130,"column":8},"end":{"row":130,"column":15},"action":"insert","lines":["XPTotal"],"id":212}],[{"start":{"row":133,"column":4},"end":{"row":135,"column":45},"action":"remove","lines":["XPTotal=Session.get('missionsXPTotal')+t;","    console.log(XPTotal);","    //Session.set('missionsXPTotal',XPTotal);"],"id":213}],[{"start":{"row":133,"column":2},"end":{"row":133,"column":4},"action":"remove","lines":["  "],"id":214}],[{"start":{"row":133,"column":0},"end":{"row":133,"column":2},"action":"remove","lines":["  "],"id":215}],[{"start":{"row":132,"column":7},"end":{"row":133,"column":0},"action":"remove","lines":["",""],"id":216}],[{"start":{"row":133,"column":11},"end":{"row":133,"column":12},"action":"remove","lines":["t"],"id":217}],[{"start":{"row":133,"column":11},"end":{"row":133,"column":18},"action":"insert","lines":["XPTotal"],"id":218}],[{"start":{"row":131,"column":7},"end":{"row":131,"column":8},"action":"insert","lines":[")"],"id":219}],[{"start":{"row":131,"column":8},"end":{"row":131,"column":9},"action":"insert","lines":[";"],"id":220}],[{"start":{"row":130,"column":27},"end":{"row":130,"column":28},"action":"insert","lines":["x"],"id":221}],[{"start":{"row":130,"column":28},"end":{"row":130,"column":29},"action":"insert","lines":["p"],"id":222}],[{"start":{"row":129,"column":37},"end":{"row":129,"column":38},"action":"remove","lines":["c"],"id":223}],[{"start":{"row":129,"column":37},"end":{"row":129,"column":38},"action":"insert","lines":["t"],"id":224}],[{"start":{"row":129,"column":38},"end":{"row":129,"column":39},"action":"insert","lines":["h"],"id":225}],[{"start":{"row":129,"column":39},"end":{"row":129,"column":40},"action":"insert","lines":["i"],"id":226}],[{"start":{"row":129,"column":40},"end":{"row":129,"column":41},"action":"insert","lines":["s"],"id":227}],[{"start":{"row":129,"column":10},"end":{"row":129,"column":18},"action":"remove","lines":["lengesXP"],"id":228},{"start":{"row":129,"column":10},"end":{"row":129,"column":11},"action":"insert","lines":["M"]}],[{"start":{"row":129,"column":11},"end":{"row":129,"column":12},"action":"insert","lines":["i"],"id":229}],[{"start":{"row":129,"column":12},"end":{"row":129,"column":13},"action":"insert","lines":["s"],"id":230}],[{"start":{"row":129,"column":13},"end":{"row":129,"column":14},"action":"insert","lines":["s"],"id":231}],[{"start":{"row":129,"column":14},"end":{"row":129,"column":15},"action":"insert","lines":["i"],"id":232}],[{"start":{"row":129,"column":15},"end":{"row":129,"column":16},"action":"insert","lines":["o"],"id":233}],[{"start":{"row":129,"column":16},"end":{"row":129,"column":17},"action":"insert","lines":["n"],"id":234}],[{"start":{"row":129,"column":17},"end":{"row":129,"column":18},"action":"insert","lines":["s"],"id":235}],[{"start":{"row":129,"column":40},"end":{"row":129,"column":41},"action":"remove","lines":["s"],"id":236}],[{"start":{"row":129,"column":39},"end":{"row":129,"column":40},"action":"remove","lines":["i"],"id":237}],[{"start":{"row":129,"column":38},"end":{"row":129,"column":39},"action":"remove","lines":["h"],"id":238}],[{"start":{"row":129,"column":37},"end":{"row":129,"column":38},"action":"remove","lines":["t"],"id":239}],[{"start":{"row":129,"column":37},"end":{"row":129,"column":38},"action":"insert","lines":["c"],"id":240}],[{"start":{"row":126,"column":17},"end":{"row":126,"column":18},"action":"insert","lines":["I"],"id":241}],[{"start":{"row":126,"column":17},"end":{"row":126,"column":18},"action":"remove","lines":["I"],"id":242}],[{"start":{"row":126,"column":17},"end":{"row":126,"column":18},"action":"insert","lines":["G"],"id":243}],[{"start":{"row":134,"column":4},"end":{"row":135,"column":0},"action":"insert","lines":["",""],"id":244},{"start":{"row":135,"column":0},"end":{"row":135,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":135,"column":2},"end":{"row":143,"column":4},"action":"insert","lines":["missionsXPTotalG: function() {","    XPTotal=0;","    challenges.find({'classId':Session.get('classId'),'type':\"Misión\"}).forEach(function(c){","      chalMissions.find({'missionId':c._id}).forEach(function(cxp){","        XPTotal+=parseInt(cxp.chalMissionXP);","      });","    });","    return XPTotal;","  },"],"id":245}],[{"start":{"row":126,"column":17},"end":{"row":126,"column":18},"action":"remove","lines":["G"],"id":246}],[{"start":{"row":126,"column":17},"end":{"row":126,"column":18},"action":"insert","lines":["I"],"id":247}],[{"start":{"row":128,"column":62},"end":{"row":128,"column":68},"action":"remove","lines":["Misión"],"id":248},{"start":{"row":128,"column":62},"end":{"row":128,"column":63},"action":"insert","lines":["R"]}],[{"start":{"row":128,"column":63},"end":{"row":128,"column":64},"action":"insert","lines":["e"],"id":249}],[{"start":{"row":128,"column":64},"end":{"row":128,"column":65},"action":"insert","lines":["t"],"id":250}],[{"start":{"row":128,"column":65},"end":{"row":128,"column":66},"action":"insert","lines":["o"],"id":251}]]},"ace":{"folds":[],"scrolltop":944,"scrollleft":0,"selection":{"start":{"row":76,"column":13},"end":{"row":76,"column":23},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":24,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1552405398506,"hash":"a5a2fa70fc78b27dc57df556856a51e07a545b25"}