Template.adventure.onRendered(function() {
  //$('#adventureDesc').summernote();
  $.getScript("https://cdn.tiny.cloud/1/uxh471978q9jgw7y107j4cuzopr9tsqh5ytfj1ajjhywc89m/tinymce/5/tinymce.min.js");
  //$('#divDesc').html(classes.findOne({ _id: Session.get('classId') } ).adventureDesc);

});

Template.adventure.helpers({
  challenge: function() {
    return challenges.find({classId: Session.get('classId')});
  },
  chalMissions: function(id) {
    return chalMissions.find({classId: Session.get('classId'), missionId: id}, {sort: {order: 1}});
  },
  class: function() {
    return classes.findOne({ _id: Session.get('classId') } );
  },
  teacher: function() {
    if (Session.get('userType')!="teacher") {
     return "readonly";
    };
  },
  disTeacher: function() {
    if (Session.get('userType')!="teacher") {
     return "disabled";
    };
  },
  isTeacher: function() {
    if (Session.get('userType')=="teacher") {
      return true;
    } else {
      return false;
    };
  }
});

Template.adventure.events({
  'submit form#tinymce': function(event) {
    event.preventDefault();
    var adventureData = {
      adventureName: $("#adventureName").val(),
      adventureDesc: $("#adventureDesc").val(),
      adventureTiny: $("#adventureTiny").val(),
      adventureWeb: $("#adventureWeb").val()
    };
    Meteor.call('saveAdventure', Session.get('classId'), adventureData);
    $('#sn').html($("#adventureDesc").val());
    //$('#divDesc').html($("#adventureDesc").val());
  },
  'click #descBtn': function(event) {
    event.preventDefault();
    tinymce.init({
      selector: '#adventureDesc',
      plugins: 'print preview paste importcss searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
      imagetools_cors_hosts: ['picsum.photos'],
      menubar: 'file edit view insert format tools table help',
      toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview print | insertfile image media template link anchor codesample | ltr rtl',
      toolbar_sticky: true,
      autosave_ask_before_unload: true,
      autosave_interval: "30s",
      autosave_prefix: "{path}{query}-{id}-",
      autosave_restore_when_empty: false,
      autosave_retention: "2m",
      image_advtab: true,
      content_css: '//www.tiny.cloud/css/codepen.min.css',
      link_list: [
        { title: 'My page 1', value: 'http://www.tinymce.com' },
        { title: 'My page 2', value: 'http://www.moxiecode.com' }
      ],
      image_list: [
        { title: 'My page 1', value: 'http://www.tinymce.com' },
        { title: 'My page 2', value: 'http://www.moxiecode.com' }
      ],
      image_class_list: [
        { title: 'None', value: '' },
        { title: 'Some class', value: 'class-name' }
      ],
      importcss_append: true,
      file_picker_callback: function (callback, value, meta) {
        /* Provide file and text for the link dialog */
        if (meta.filetype === 'file') {
          callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
        }

        /* Provide image and alt text for the image dialog */
        if (meta.filetype === 'image') {
          callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
        }

        /* Provide alternative source and posted for the media dialog */
        if (meta.filetype === 'media') {
          callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
        }
      },
      templates: [
            { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
        { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
        { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
      ],
      template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
      template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
      height: 600,
      image_caption: true,
      quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
      noneditable_noneditable_class: "mceNonEditable",
      toolbar_mode: 'sliding',
      contextmenu: "link image imagetools table",
      language: 'es'
    });
    $('#divDesc').toggleClass('oculto');
    $('#divTinyDesc').toggleClass('oculto');
  },
  'click #saveDescBtn': function(event) {
    var adventureData = {
      adventureName: $("#adventureName").val(),
      adventureDesc: tinymce.activeEditor.getContent(),
      adventureTiny: $("#adventureTiny").val(),
      adventureWeb: $("#adventureWeb").val()
    };
    Meteor.call('saveAdventure', Session.get('classId'), adventureData);
    //$('#sn').html(tinymce.activeEditor.getContent());
    //$('#divDesc').html(tinymce.activeEditor.getContent());
    $('#divDesc').toggleClass('oculto');
    $('#divTinyDesc').toggleClass('oculto');
    tinymce.remove('#adventureDesc');
  },
  'click #embebido': function(event) {
    event.preventDefault();
    if ($("#iframeWeb").css("display")=="table"){
      $("#iframeWeb").css("display","none");
      event.currentTarget.value="Ver";
    } else {
      $("#iframeWeb").css("display","table");
      event.currentTarget.value="Ocultar";
    }

  },
  'change #nbDepCheck': function(event) {
    event.preventDefault();
    //alert(event.currentTarget.checked);
    Meteor.call('nbDepChange', event.target.name, event.currentTarget.checked);
  },
  'click #adventureBtn': function(event) {
    event.preventDefault();
    //localStorage.classId=Session.get("classId");
    //alert(localStorage.classId);
    var opened = window.open("");
    opened.document.write("<html><head>" + this.adventureDesc + "</html>");
    //Modal.show('adventureTemplate');
  }
});
