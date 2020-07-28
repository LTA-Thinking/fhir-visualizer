function AddLevel(parent, parentId, jsonObject) {
    var parentAccordionId = parentId + "-accordion";

    parent.append("<div id=\"" + parentAccordionId + "\">");
    for (const [key, value] of Object.entries(jsonObject)) {
        if (Array.isArray(value)) {
            AddCard(parent, parentId, parentAccordionId, key, "");
            AddArray($("#" + parentId + "-" + key + "-card"), parentId + "-" + key, value);
        }
        else if (typeof value === "object") {
            AddCard(parent, parentId, parentAccordionId, key, "");
            AddLevel($("#" + parentId + "-" + key + "-card"), parentId + "-" + key, value);
        }
        else {
            AddCardHeader(parent, key, value);
        }
        
    }
    parent.append("</div>");
}

function AddCard(parent, parentId, accordionId, key, value) {
    parent.append(
        "<div class=\"card\">"
        + "<div class=\"card-header\">"
        + "<h5 class=\"mb-0\">"
        + "<button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#" + parentId + "-" + key + "\" aria-expanded=\"true\" aria-controls=\"collapseOne\">"
        + key
        + "</button>"
        + "</h5>"
        + "</div>"
        + "<div id=\"" + parentId + "-" + key + "\" class=\"collapse show\" aria-labelledby=\"headingOne\" data-parent=\"#" + accordionId + "\">"
        + "<div class=\"card-body\" id=\"" + parentId + "-" + key + "-card\">"
        + value
        + "</div>"
        + "</div>"
        + "</div>");
}


function AddCardHeader(parent, key, value) {
    parent.append(
        "<div class=\"card\">"
        + "<div class=\"card-header\">"
        + "<h5 class=\"mb-0\">"
        + key + ": " + value
        + "</h5>"
        + "</div>");
}

function AddArray(parent, parentId, jsonArray) {
    var parentListId = parentId + "-list";

    parent.append("<ul class=\"list-group\" id=\"" + parentListId + "\">");
    for (let index = 0; index < jsonArray.length; index++) {
        var value = jsonArray[index];
        var itemId = parentId + "-" + index;
        if (Array.isArray(value)) {
            AddListElement(parent, itemId, "");
            AddArray($("#" + itemId), itemId, value);
        }
        else if (typeof value === "object") {
            AddListElement(parent, itemId, "");
            AddLevel($("#" + itemId), itemId, value);
        }
        else {
            AddListElement(parent, itemId, value);
        }
        
    }
    parent.append("</ul>");
}

function AddListElement(parent, id, value) {
    parent.append("<li class=\"list-group-item\" id=\"" + id + "\">" + value + "</li>");
}
