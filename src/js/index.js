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

function getGeoLocation() {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((success) => {
            console.log(success);
            new Ajax.Request("/ERICA_restaruant/php/api/restaruants/nearby",  {
                method: "GET", 
                parameters: {
                    lat: success.coords.latitude,
                    lng: success.coords.longitude
                },
                onSuccess: (ajax) => {
                    console.log(ajax.responseText);
                    const restaruants = JSON.parse(ajax.responseText);
                    const rects = $$('rect.box');
                    for(var i = 0; i < rects.length; i++) {
                        var item = rects[i];
                        console.log(item.id);
                        if(restaruants.indexOf(item.id.substring(1)) != -1) {
                            document.getElementById(item.id).classList.add('selected');                            
                        } else {
                            document.getElementById(item.id).classList.remove('selected');                                                        
                        }
                    }
                    var element = document.querySelector("svg#layer_1");
                    var newHTML = element.innerHTML.substring(0, element.innerHTML.length);
                    element.innerHTML = ''
                    element.innerHTML = newHTML
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

window.onload = () => {
    $("drawer-toggle").onclick = setOpened;
    $("blocker").onclick = removeOpened;
    $("geolocation").onclick = getGeoLocation;

    $("jebi").onclick = jebi;

    var stores;

    new Ajax.Request("/ERICA_restaruant/php/api/restaruants/",
    {
        method: "get",
        onSuccess: (ajax) => {
            stores = JSON.parse(ajax.responseText);
            for(var i = 0; i < stores.length; i++) {
                var item = stores[i];
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
            element.innerHTML = newHTML
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
            var id = event.target.getAttribute("id");
            loadStore(stores[parseInt(id.slice(1))]);
        };
        boxes[i].onmouseout = () => {
              $("popup").setStyle({
                display: "none"
            });
        }
    }
}