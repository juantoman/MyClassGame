
$.getScript("https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js");

Template.shareModal.events({
    'click .shareModalClose': function(event) {
        event.preventDefault();
        Modal.hide('shareModal');
    },
    'click .shareModalURL': function(event) {
        event.preventDefault();
        var sharedElementId=Session.get("sharedElementId");
        var url = "https://www.myclassgame.es/mcgapi/collectionableAPI.html?e=collectionable&amp;id="+ sharedElementId;
        navigator.clipboard.writeText(url)
    },
    'click .shareModalIframe': function(event) {
        event.preventDefault();
        var sharedElementId=Session.get("sharedElementId");
        var iframe = '<div style="width: 100%;"><div style="position: relative; padding-bottom: 56.25%; padding-top: 0; height: 0;"><iframe frameborder="0" width="1200" height="675" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.myclassgame.es/mcgapi/collectionableAPI.html?e=collectionable&amp;id='+ sharedElementId +'" type="text/html" allowfullscreen="true" scrolling="yes"></iframe></div></div>'
        navigator.clipboard.writeText(iframe)
    },
    'click .shareModalQRCode': function(event) {
        event.preventDefault();
        var sharedElementId=Session.get("sharedElementId");
        var url = "https://www.myclassgame.es/mcgapi/collectionableAPI.html?e=collectionable&amp;id="+ sharedElementId;
        new QRCode(document.getElementById("qrcode"), url);
        document.getElementById("btnQrCode").disabled = true;
    }
});