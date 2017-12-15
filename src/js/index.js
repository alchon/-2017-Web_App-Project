function setOpened() {
    var drawer = document.getElementById("drawer");
    var blocker = document.getElementById("blocker");
    drawer.classList.add("opened");
    blocker.classList.add("opened");
}

function removeOpened() {
    if(location.hash != "#drawer"){
        var drawer = document.getElementById("drawer");
        var blocker = document.getElementById("blocker");
        drawer.classList.remove("opened");
        blocker.classList.remove("opened");
    }
}

function getStore(event) {
    new Ajax.Request("url",
    {
        method: "get",
        parameters: {id : event.target.getAttribute("id")},
        onSuccess: (ajax) => {
            return JSON.parse(ajax.responseText);
        },
        // onSuccess: loadStore,
        onFailure: ajaxFailed,
        onException: ajaxFailed
    });
}

function loadStore(store) {
    while ($("popup").firstChild){
        $("popup").removeChild($("popup").firstChild);
    }

    var title = document.createElement("h1");
    title.innerText = store.title;

    var category = document.createElement("p");
    category.innerText = store.category;
    
    $("popup").appendChild(title);
    $("popup").appendChild(category);

    $("popup").setStyle({
        display: "block"
    });
}

function ajaxFailed(ajax, exception) {
    var errorMessage = "Error making Ajax request:\n\n";
    if (exception) {
        errorMessage += "Exception: " + exception.message;
    } else {
        errorMessage += "Server status:\n" + ajax.status + " " + ajax.statusText + 
                        "\n\nServer response text:\n" + ajax.responseText;
    }
    console.log(errorMessage);
}

function popupRefresh(x, y) {
    $("popup").setStyle({
        top:y,
        left:x
    });
}


window.onload = () => {
    $("drawer-toggle").onclick = setOpened;
    $("blocker").onclick = removeOpened;

    var boxes = $$(".box");
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].onmousemove = (event) => {
            var x = event.pageX - 100;
            var y = event.pageY - 60;
            popupRefresh(x,y);
        }
        boxes[i].onmouseover = (event) => {
            // var store = getStore(event);
            // loadStore(store);
            $("popup").setStyle({
                display: "block"
            });
        };
        boxes[i].onmouseout = () => {
              $("popup").setStyle({
                display: "none"
            });
        }
    }
}