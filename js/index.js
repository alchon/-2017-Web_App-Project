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
    title.innerText = store.name;

    var category = document.createElement("p");
    category.innerText = store.branch + " > " + store.sub_branch;
    
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
    jebiWindow = window.open("jebi.html", "제비 뽑기" , "width=400, height=600, top=200, left=300");
    return false;
}

function erwc() {
    erwcWindow = window.open("erwc.html", "음식 월드컵", "width=600, height=500, top=200, left=300");
    return false;
}

function getGeoLocation() {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((success) => {
            console.log(success);
            new Ajax.Request("/api/restaruants/nearby",  {
                method: "GET", 
                parameters: {
                    lat: success.coords.latitude,
                    lng: success.coords.longitude
                },
                onSuccess: (ajax) => {
                    const restaruants = JSON.parse(ajax.responseText);
                    const rects = $$('rect.box');
                    for(var i = 0; i < rects.length; i++) {
                        var item = rects[i];
                        if(restaruants.indexOf(item.id.substring(1)) != -1) {
                            document.getElementById(item.id).classList.add('selected');                            
                        } else {
                            document.getElementById(item.id).classList.remove('selected');                                                        
                        }
                    }
                    var element = document.querySelector("svg#layer_1");
                    var newHTML = element.innerHTML.substring(0, element.innerHTML.length);
                    element.innerHTML = ''
                    element.innerHTML = newHTML;
                    event_handling();
                },
                onFailure: ajaxFailed,
                onException: ajaxFailed
            }
        );
        }, (failure) => {  
            console.error(failure);
        })
    } else {
        alert('지오로케이션이 지원되지 않는 환경입니다.');
        return;
    }
}

function removeElements() {
    while ($$("main")[0].firstChild){
        $$("main")[0].removeChild($$("main")[0].firstChild);
    }
}

// function successSearch(ajax) {
//     removeElements();
//     var result = JSON.parse(ajax.responseText);
//     var container = document.createElement("div");
//     container.addClassName("container");
//     var h1 = document.createElement("h1");
//     h1.innerText = "검색결과 : " + result.length + "건";
//     container.appendChild(h1);
//     for (var i = 0; i < result.length; i++) {
//         var card = document.createElement("div");
//         card.addClassName("card");
//         var img = document.createElement("img");
//         img.setAttribute("src", "http://placehold.it/360x360");
//         card.appendChild(img);
//         card.appendChild(document.createElement("hr"));
//         var info = document.createElement("div");
//         var title = document.createElement("h1");
//         title.innerText = result[i].name;
//         var address = document.createElement("p");
//         address.innerText = result[i].address;
//         info.appendChild(title);
//         info.appendChild(address);
//         card.appendChild(info);
//         container.appendChild(card);
//     }
//     $$("main")[0].appendChild(container);
// }

function successSearch(ajax) {
    const restaruants = JSON.parse(ajax.responseText);
    const rects = $$('rect.box');
    for(var i = 0; i < rects.length; i++) {
        var item = rects[i];
        if(restaruants.indexOf(item.id.substring(1)) != -1) {
            document.getElementById(item.id).classList.add('selected');
        } else {
            document.getElementById(item.id).classList.remove('selected');
        }
    }
    var element = document.querySelector("svg#layer_1");
    var newHTML = element.innerHTML.substring(0, element.innerHTML.length);
    element.innerHTML = ''
    element.innerHTML = newHTML;
    event_handling();
}

var stores;

window.onload = () => {
    $("drawer-toggle").onclick = setOpened;
    $("blocker").onclick = removeOpened;
    $("geolocation").onclick = getGeoLocation;

    $("jebi").onclick = jebi;
    $("erwc").onclick = erwc;

    $

    $("search").onclick = () => {
        new Ajax.Request("/api/restaruants/search",{
            method: "POST",
            parameters: {query: $("text").value},
            onSuccess: successSearch,
            onFailure: ajaxFailed,
            onException: ajaxFailed
        });
    }
    new Ajax.Request("/api/restaruants/",
    {
        method: "get",
        onSuccess: (ajax) => {
            stores = JSON.parse(ajax.responseText);
            for(var i = 0; i < stores.length; i++) {
                var item = stores[i];
                console.log(item);
                const rect = document.createElement('rect');
                rect.setAttribute('x', item.x);
                rect.setAttribute('y', item.y);
                rect.setAttribute('fill', "#878787");
                rect.setAttribute('stroke', "#000000");
                rect.setAttribute('stroke-miterlimit', "10");
                rect.setAttribute('width', "18");
                rect.setAttribute('height', "18");
                if(item.is_rotated) {
                    rect.setAttribute('transform', 'matrix(0.7071 -0.7071 0.7071 0.7071 '+ item.rx +' '+ item.ry +')')
                }
                rect.classList.add('box');
                rect.id = ('b' + item.ID);
                document.querySelector('svg#layer_1').appendChild(rect);
            }
            var element = document.querySelector("svg#layer_1");
            var newHTML = element.innerHTML.substring(0, element.innerHTML.length);
            element.innerHTML = ''
            element.innerHTML = newHTML;
            event_handling();
        },
        onFailure: ajaxFailed,
        onException: ajaxFailed
    });
}

function event_handling() {
    var boxes = $$(".box");
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].onmousemove = (event) => {
            var x = event.pageX - 100;
            var y = event.pageY - 60;
            popupRefresh(x,y);
        }
        boxes[i].onmouseover = (event) => {
            var id = event.target.getAttribute("id").substring(1);
            loadStore(stores[id]);
        };
        boxes[i].onmouseout = () => {
              $("popup").setStyle({
                display: "none"
            });
        }
    }
}