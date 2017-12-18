var map;
window.onload = () => {

    $("search").onclick = () => {
        new Ajax.Request("/api/restaruants/search",{
            method: "POST",
            parameters: {query: $("text").value},
            onSuccess: successSearch,
            onFailure: ajaxFailed,
            onException: ajaxFailed
        });
    }

    $("geolocation").onclick = getGeoLocation;

    draw_map();
}

function successSearch(ajax) {
    const restaruants = JSON.parse(ajax.responseText);
    const rects = $$('rect.box');
    for(var i = 0; i < rects.length; i++) {
        var item = rects[i];
        if(restaruants.indexOf(item.id.substring(1)) != -1) {
            document.getElementById(item.id).classList.add('search');
        } else {
            document.getElementById(item.id).classList.remove('search');
        }
    }
    var element = document.querySelector("svg#layer_1");
    var newHTML = element.innerHTML.substring(0, element.innerHTML.length);
    element.innerHTML = ''
    element.innerHTML = newHTML;
    event_handling();
}

function getGeoLocation() {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((success) => {
            console.log(success);
            new Ajax.Request("/api/restaruants/nearby", {
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
                    // var element = document.querySelector("svg#layer_1");
                    // var newHTML = element.innerHTML.substring(0, element.innerHTML.length);
                    // element.innerHTML = ''
                    // element.innerHTML = newHTML;
                    // event_handling();
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

function draw_map() {
    new Ajax.Request("/api/restaruants/",
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
            var x = event.pageX - ($("popup").getWidth()/2);
            var y = event.pageY - 60;
            popupRefresh(x,y);
        }
        boxes[i].onmouseover = (event) => {
            var id = event.target.getAttribute("id").substring(1);
            loadStore(stores[id-1]);
        };
        boxes[i].onmouseout = () => {
            $("popup").setStyle({
                display: "none"
            });
        }
        boxes[i].onclick = (event) => {
            $("popup").setStyle({
                display: "none"
            });
            var id = event.target.getAttribute("id").substring(1);
            new Ajax.Request("/api/restaruants/" + id,{
                method: "GET",
                onSuccess: moveStore,
                onFailure: ajaxFailed,
                onException: ajaxFailed
            });
        }
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

function popupRefresh(x, y) {
    $("popup").setStyle({
        top:y,
        left:x
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

