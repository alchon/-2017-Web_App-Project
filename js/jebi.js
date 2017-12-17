var names = [];
var check = 1;
window.onload = () => {
    $('out').onclick = outClick;
    $('more').onclick = moreClick;
    $('img').onclick = jebiClick;
    new Ajax.Request("/ERICA_restaurant/php/api/restaurants", {
        method: "get",
        onSuccess : (ajax) => {
            var data = JSON.parse(ajax.responseText);
            for(var i=0; i<data.length; i++) {
                names.push(data[i].name);
            }
        },
        onFailure: ajaxFailed,
        onException: ajaxFailed
    })
}

function jebiClick() {
    if(check) {
        $("img").addClassName("hidden");
        ShowStores();
        check = 0;
    }
    // getStores_JSON();
}

function moreClick() {
    location.reload();
    check = 1;
}

function outClick() {
    window.close();
}

function ShowStores() {
    var index = Math.floor(Math.random()*(names.length));
    var name = names[index];
    var p = document.createElement("p");
    var p2 = document.createElement("p");
    p.innerText = name;
    p2.innerText = "어떠세요??";
    document.querySelector("#img").appendChild(p);
    document.querySelector("#img").appendChild(p2);
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
