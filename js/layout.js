window.onload = () => {
    $("drawer-toggle").onclick = setOpened;
    $("blocker").onclick = removeOpened;

    $("jebi").onclick = jebi;
    $("erwc").onclick = erwc;
}

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

function jebi() {
    jebiWindow = window.open("jebi.html", "제비 뽑기" , "width=400, height=600, top=200, left=300");
    return false;
}

function erwc() {
    erwcWindow = window.open("erwc.html", "푸드컵", "width=600, height=600, top=200, left=300");
    return false;
}

function successSearch(ajax) {
    removeElements();
    var result = JSON.parse(ajax.responseText);
    var container = document.createElement("div");
    container.addClassName("container");
    var h1 = document.createElement("h1");
    h1.innerText = "검색결과 : " + result.length + "건";
    container.appendChild(h1);
    for (var i = 0; i < result.length; i++) {
        var card = document.createElement("div");
        card.addClassName("card");
        var img = document.createElement("img");
        img.setAttribute("src", "http://placehold.it/360x360");
        card.appendChild(img);
        card.appendChild(document.createElement("hr"));
        var info = document.createElement("div");
        var title = document.createElement("h1");
        title.innerText = result[i].name;
        var address = document.createElement("p");
        address.innerText = result[i].address;
        info.appendChild(title);
        info.appendChild(address);
        card.appendChild(info);
        container.appendChild(card);
    }
    $$("main")[0].appendChild(container);
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