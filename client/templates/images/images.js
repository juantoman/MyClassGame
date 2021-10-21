$.getScript("https://media-library.cloudinary.com/global/all.js");
var last_image="";
var new_image="";

Template.imagesTemplate.onRendered(function() {
   $.getScript("https://upload-widget.cloudinary.com/global/all.js");
   key=mcgParameters.findOne({'_id':1}).GoogleApiKeyForCloudinary;
   //cloudName: 'myclassgame', 'c4mcg1', 'c4mcg2'
   //widget = cloudinary.createUploadWidget({ cloudName: 'myclassgame', uploadPreset: 'myclassgame', googleApiKey: key, cropping: true, croppingAspectRatio: 1, searchBySites: ["all", "cloudinary.com"], searchByRights: true}, function(error, result){
   widget = cloudinary.createUploadWidget({ cloudName: 'c4mcg2', uploadPreset: 'myclassgame', googleApiKey: key, searchBySites: ["all", "cloudinary.com"], searchByRights: true}, function(error, result){
    if (!error && result && result.event === "success") {
      console.log('Done! Here is the image info: ', result.info);
      image_url=result.info.url;
      image_url=image_url.replace('http:','https:');
      if (Session.get('imageType')!="userAvatar") {
        if (Session.get('imageType')=="question") {
          var imgObject = {
             userId:Meteor.userId(),
             classId:Session.get('classId'),
             type: Session.get('imageType'),
             image_url: image_url,
             createdOn: new Date()
          };
        } else {
          var imgObject = {
             classId:Session.get('classId'),
             type: Session.get('imageType'),
             image_url: image_url,
             createdOn: new Date()
          };
        }
      } else {
        var imgObject = {
           userId:Meteor.userId(),
           type: Session.get('imageType'),
           image_url: image_url,
           createdOn: new Date()
        };
      }
      new_image=result.info.url;
      if (last_image!=new_image){
        Meteor.call('imageInsert',imgObject);
        last_image=new_image;
      }
    }
  });
});

Template.imagesTemplate.helpers({
  images: function() {
    if (Session.get('imageType')=="userAvatar") {
      return images.find( { userId: Meteor.userId(), type: Session.get('imageType') } );
    } else {
      return images.find( { classId: Session.get('classId'), type: Session.get('imageType') } );
    }
  },
  image_low: function() {
    cloudinary_url=this.image_url;
    cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_150,f_auto,dpr_auto/')
    return cloudinary_url;
  },
  checkedImage: function(idImage) {
    if ( Session.get('imageType') == "badge" ) {
      idElement=badges.findOne({_id: Session.get('idElementImage')}).badgeImage;
    }
    if ( Session.get('imageType') == "event" ) {
      idElement=randomEvents.findOne({_id: Session.get('idElementImage')}).eventImage;
    }
    if ( Session.get('imageType') == "card" ) {
      idElement=cards.findOne({_id: Session.get('idElementImage')}).cardImage;
    }
    if ( Session.get('imageType') == "chrome" ) {
      idElement=chromes.findOne({_id: Session.get('idElementImage')}).chromeImage;
    }
    if ( Session.get('imageType') == "item" ) {
      idElement=store.findOne({_id: Session.get('idElementImage')}).itemImage;
    }
    if ( Session.get('imageType') == "avatar" ) {
      if (students.find({_id: Session.get('idElementImage')}).count()!=0) {
        idElement=students.findOne({_id: Session.get('idElementImage')}).avatar;
      } else {
        idElement=classes.findOne({_id: Session.get('idElementImage')}).studentImg;
      }
    }
    if ( Session.get('imageType') == "group" ) {
      if (groups.find({_id: Session.get('idElementImage')}).count()!=0) {
        idElement=groups.findOne({_id: Session.get('idElementImage')}).groupImg;
      } else {
        idElement=classes.findOne({_id: Session.get('idElementImage')}).groupImg;
      }
    }
    if ( Session.get('imageType') == "backImg" ) {
      idElement=classes.findOne({_id: Session.get('idElementImage')}).groupImg;
    }
    if ( Session.get('imageType') == "map" ) {
      idElement=classes.findOne({_id: Session.get('idElementImage')}).mapImg;
    }
    if ( Session.get('imageType') == "villains" ) {
      idElement=villains.findOne({_id: Session.get('idElementImage')}).villainImage;
    }
    if ( Session.get('imageType') == "mission" ) {
      idElement=challenges.findOne({_id: Session.get('idElementImage')}).missionImg;
    }
    if ( Session.get('imageType') == "behaviour" ) {
      idElement=behaviours.findOne({_id: Session.get('idElementImage')}).behaviourImage;
    }
    if ( Session.get('imageType') == "question" ) {
      idElement=questions.findOne({_id: Session.get('idElementImage')}).questionImage;
    }
    if (idImage==idElement) {
      return "checked";
    } else {
      return "";
    }
  },
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
  }
});

Template.imagesTemplate.events({
  'click .selectImage': function(event) {
    event.preventDefault();
    if (Session.get('idElementImage')){
      if (Session.get('imageType')=="badge") {
        Meteor.call('imageBadgeUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="event") {
        Meteor.call('imageEventUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="card") {
        Meteor.call('imageCardUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="chrome") {
        Meteor.call('imageChromeUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="item") {
        Meteor.call('imageItemUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="avatar") {
        Meteor.call('avatarUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
        Meteor.call('studentImgUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="villain") {
        Meteor.call('villainImageUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="mission") {
        Meteor.call('missionImageUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="group") {
        Meteor.call('groupImageUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
        Meteor.call('groupImgUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="backImg") {
        Meteor.call('backImgUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
        $("#mainTab").css('background-image','url("'+images.findOne({_id: classes.findOne({_id: Session.get("classId")}).backImg}).image_url+'")');
        $(".studentProfile").css('background-image','url("'+images.findOne({_id: classes.findOne({_id: Session.get("classId")}).backImg}).image_url+'")');
        $(".opacityDiv").toggleClass('opacityProfile');
      }
      if (Session.get('imageType')=="map") {
        Meteor.call('mapUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="userAvatar") {
        Meteor.call('userAvatarUpdate',$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="behaviour") {
        Meteor.call('behaviourImageUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="question") {
        Meteor.call('imageQuestionUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
    } else {
      Session.set('selectedImage',$("input[name='imageId']:checked").val());
    }
    Meteor.call('studentCanChangeImage', Session.get('studentId'),false);
    Modal.hide('imagesTemplate');
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('imagesTemplate');
  },
  'click .cloudinary': function(event) {
    event.preventDefault();
    widget.open();
  },
  'click .deleteImage': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('delete') + " " + TAPi18n.__('image'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('imageDelete',this._id);
        swal({
          title: TAPi18n.__('image') + " " + TAPi18n.__('fdeleted'),
          type: 'success'
        })
      // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      }
    })
  },
  'click .thumbnail,.card_image': function(event) {
    event.preventDefault();
    $(".thumbnail,.card_image").removeClass("checked");
    $(event.currentTarget).find("input").prop("checked", true);
    $(event.currentTarget).addClass("checked");
  },
  'click .delcloud': function(event) {
    event.preventDefault();

    // var cloudinary = require("cloudinary-core");

    // var cl = new cloudinary.Cloudinary({cloud_name: "c4mcg1", secure: true});

    // Change cloud name, API Key, and API Secret below

    // cl.config({ 
    //   cloud_name: 'c4mcg1', 
    //   api_key: '411178996743237', 
    //   api_secret: '2jLtsfPQfVrXtm63v5M-93Ek_cw' 
    // });

    //Buscar imatge

    // const myImage = cl.image('sample'); // sample is the public ID of the image.

    // console.log(myImage);
    // cl.v2.uploader.destroy('thanos', function(error, result) {
    //   console.log(result);
    // });

    //Subir imatge

    // const url = "https://api.cloudinary.com/v1_1/c4mcg1/image/upload";

    // const formData = new FormData();
    
    // let file = "https://res.cloudinary.com/c4mcg1/image/upload/q_auto,w_auto,h_150,f_auto,dpr_auto/v1634072191/myclassgame/PP_icono_2019_gcz9cd.svg";
    // formData.append("file", file);
    // formData.append("upload_preset", "myclassgame");

    // fetch(url, {
    //   method: "POST",
    //   body: formData
    // })
    //   .then((response) => {
    //     return response.text();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   });

    //Borrar imatge
    function SHA1 (msg) {
      function rotate_left(n,s) {
          var t4 = ( n<<s ) | (n>>>(32-s));
          return t4;
      };
      function lsb_hex(val) {
          var str="";
          var i;
          var vh;
          var vl;
          for( i=0; i<=6; i+=2 ) {
              vh = (val>>>(i*4+4))&0x0f;
              vl = (val>>>(i*4))&0x0f;
              str += vh.toString(16) + vl.toString(16);
          }
          return str;
      };
      function cvt_hex(val) {
          var str="";
          var i;
          var v;
          for( i=7; i>=0; i-- ) {
              v = (val>>>(i*4))&0x0f;
              str += v.toString(16);
          }
          return str;
      };
      function Utf8Encode(string) {
          string = string.replace(/\r\n/g,"\n");
          var utftext = "";
          for (var n = 0; n < string.length; n++) {
              var c = string.charCodeAt(n);
              if (c < 128) {
                  utftext += String.fromCharCode(c);
              }
              else if((c > 127) && (c < 2048)) {
                  utftext += String.fromCharCode((c >> 6) | 192);
                  utftext += String.fromCharCode((c & 63) | 128);
              }
              else {
                  utftext += String.fromCharCode((c >> 12) | 224);
                  utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                  utftext += String.fromCharCode((c & 63) | 128);
              }
          }
          return utftext;
      };
      var blockstart;
      var i, j;
      var W = new Array(80);
      var H0 = 0x67452301;
      var H1 = 0xEFCDAB89;
      var H2 = 0x98BADCFE;
      var H3 = 0x10325476;
      var H4 = 0xC3D2E1F0;
      var A, B, C, D, E;
      var temp;
      msg = Utf8Encode(msg);
      var msg_len = msg.length;
      var word_array = new Array();
      for( i=0; i<msg_len-3; i+=4 ) {
          j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
          msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
          word_array.push( j );
      }
      switch( msg_len % 4 ) {
          case 0:
              i = 0x080000000;
          break;
          case 1:
              i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
          break;
          case 2:
              i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
          break;
          case 3:
              i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8    | 0x80;
          break;
      }
      word_array.push( i );
      while( (word_array.length % 16) != 14 ) word_array.push( 0 );
      word_array.push( msg_len>>>29 );
      word_array.push( (msg_len<<3)&0x0ffffffff );
      for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
          for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
          for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
          A = H0;
          B = H1;
          C = H2;
          D = H3;
          E = H4;
          for( i= 0; i<=19; i++ ) {
              temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
              E = D;
              D = C;
              C = rotate_left(B,30);
              B = A;
              A = temp;
          }
          for( i=20; i<=39; i++ ) {
              temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
              E = D;
              D = C;
              C = rotate_left(B,30);
              B = A;
              A = temp;
          }
          for( i=40; i<=59; i++ ) {
              temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
              E = D;
              D = C;
              C = rotate_left(B,30);
              B = A;
              A = temp;
          }
          for( i=60; i<=79; i++ ) {
              temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
              E = D;
              D = C;
              C = rotate_left(B,30);
              B = A;
              A = temp;
          }
          H0 = (H0 + A) & 0x0ffffffff;
          H1 = (H1 + B) & 0x0ffffffff;
          H2 = (H2 + C) & 0x0ffffffff;
          H3 = (H3 + D) & 0x0ffffffff;
          H4 = (H4 + E) & 0x0ffffffff;
      }
      var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
      return temp.toLowerCase();
  }
    const urld = "https://api.cloudinary.com/v1_1/c4mcg1/image/destroy"
    // var params = {
    //   public_id:'thanos',
    //   api_key:'411178996743237'
    // }
    ts=Math.round((new Date).getTime()/1000);
    c="public_id=thanos&timestamp="+ts+"2jLtsfPQfVrXtm63v5M-93Ek_cw";
    console.log(c)
    signature=SHA1(c);
    console.log(signature);
    const formDatad = new FormData();
    formDatad.append("public_id", 'thanos');
    formDatad.append("api_key", "411178996743237");
    //formDatad.append("api_secret", "2jLtsfPQfVrXtm63v5M-93Ek_cw");
    formDatad.append("timestamp", ts);
    formDatad.append("signature", signature);
    

    fetch(urld, {
      method: "POST",
      body: formDatad
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log(data);
      });
    // HTTP.post(url,{params:params},function(error,resp){
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log(resp);
    //   }
    // })


  }
});
