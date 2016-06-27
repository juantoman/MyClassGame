Template.alumneItem.helpers({
  enlace: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.href;
  }
});
