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

function jebi() {
    // var x = window.innerWidth/4;
    // var y = window.innerHeight/4;
    // console.log(x);
    // console.log(y);
    // var specs = "width=400, htidht=600, top="+x+", left="+y;
    jebiWindow = window.open("jebi.html", "제비 뽑기" , "width=400, height=600, top=200, left=300");
    return false;
}

window.onload = () => {
    $("drawer-toggle").onclick = setOpened;
    $("blocker").onclick = removeOpened;

    $("jebi").onclick = jebi;

    var stores;

    new Ajax.Request("url",
    {
        method: "get",
        onSuccess: (ajax) => {
            stores = JSON.parse(ajax.responseText);
        },
        onFailure: ajaxFailed,
        onException: ajaxFailed
    });

    var boxes = $$(".box");
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].onmousemove = (event) => {
            var x = event.pageX - 100;
            var y = event.pageY - 60;
            popupRefresh(x,y);
        }
        boxes[i].onmouseover = (event) => {
            var store  = stores[event.target.getAttribute("id")];// id에 맞는 음식점
            loadStore(store);
        };
        boxes[i].onmouseout = () => {
              $("popup").setStyle({
                display: "none"
            });
        }
    }
}