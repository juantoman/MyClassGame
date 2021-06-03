Template.view.helpers({
  students: function() {
    return students.find({'classId': Session.get('classId')});
  },
  image: function(avatar) {
    if ( avatar=="" || !avatar ) {
      return "https://avatars.dicebear.com/v2/avataaars/"+this._id+".svg";
    } else  {
      if (avatar.substring(0, 4)=="http") {
        return avatar;
      } else {
        cloudinary_url=images.findOne({_id: avatar}).image_url;
        cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
        return cloudinary_url;
      }
    }
  },
})
