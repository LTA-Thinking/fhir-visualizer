var form = document.forms.namedItem("fileinfo");
form.addEventListener('submit', function (ev) {
    var oData = new FormData(form);
    var oReq = new XMLHttpRequest();
    oReq.open("POST", "http://localhost:7071/api/FhirConverter/cda/ccd.hbs", true);
    oReq.onload = function (oEvent) {
        if (oReq.status == 200) {
            AddLevel($("#resource"), "resource", JSON.parse(oReq.response).fhirResource);
        } else {
            console.log("Error " + oReq.status + " occurred when trying to upload your file.<br/>");
        }
    };
    var fileData = oData.get("file");
    fileData.text().then(text => {
        oReq.send(JSON.stringify({ "srcDataBase64": btoa(text) }));
    });
    ev.preventDefault();
}, false);