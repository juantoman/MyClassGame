
Template.shareModal.onRendered(function() {
    $.getScript("https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js");
    var qrCode;
 });

 Template.shareModal.helpers({
    url: function() {
        var sharedElement=Session.get("sharedElement");
        var url = "https://www.myclassgame.es/mcgapi/"+sharedElement.type+"API.html?e="+sharedElement.type+"&id="+ sharedElement.id;
        return url;
    }
  });

Template.shareModal.events({
    'click .shareModalClose': function(event) {
        event.preventDefault();
        Modal.hide('shareModal');
    },
    'click .shareModalURL': function(event) {
        event.preventDefault();
        var sharedElement=Session.get("sharedElement");
        var url = "https://www.myclassgame.es/mcgapi/"+sharedElement.type+"API.html?e="+sharedElement.type+"&id="+ sharedElement.id;
        navigator.clipboard.writeText(url)
    },
    'click .shareModalIframe': function(event) {
        event.preventDefault();
        var sharedElement=Session.get("sharedElement");
        var url = "https://www.myclassgame.es/mcgapi/"+sharedElement.type+"API.html?e="+sharedElement.type+"&id="+ sharedElement.id;
        var iframe = '<div style="width: 100%;"><div style="position: relative; padding-bottom: 56.25%; padding-top: 0; height: 0;"><iframe frameborder="0" width="1200" height="675" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="'+ url +'" type="text/html" allowfullscreen="true" scrolling="yes"></iframe></div></div>'
        navigator.clipboard.writeText(iframe)
    },
    'click .shareModalQRCode': function(event) {
        event.preventDefault();
        var sharedElement=Session.get("sharedElement");
        var url = "https://www.myclassgame.es/mcgapi/"+sharedElement.type+"API.html?e="+sharedElement.type+"&id="+ sharedElement.id;
        qrCode = new QRCodeStyling({
            width: 200,
            height: 200,
            type: "svg",
            data: url,
            image: "/images/mcg_ico.png",
            dotsOptions: {
                color: "#4267b2",
                type: "rounded"
            },
            backgroundOptions: {
                color: "#e9ebee",
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 5
            }
        });
        qrCode.append(document.getElementById("qrcode"));
        document.getElementById("btnQrCode").disabled = true;
    },
    'click #qrcode': function(event) {
        event.preventDefault();
        var sharedElement=Session.get("sharedElement");
        qrCode.download({ name: "mcg_qr_"+sharedElement.type+"_"+sharedElement.name+"_"+sharedElement.id, extension: "png" });
    }
});