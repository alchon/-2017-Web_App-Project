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
    erwcWindow = window.open("erwc.html", "푸드컵", "width=600, height=600, top=200, left=300");
    return false;
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

var stores;

window.onload = () => {
    // $("drawer-toggle").onclick = setOpened;
    // $("blocker").onclick = removeOpened;
    // $("geolocation").onclick = getGeoLocation;

    // $("jebi").onclick = jebi;
    // $("erwc").onclick = erwc;

    // $("search").onclick = () => {
    //     new Ajax.Request("/api/restaruants/search",{
    //         method: "POST",
    //         parameters: {query: $("text").value},
    //         onSuccess: successSearch,
    //         onFailure: ajaxFailed,
    //         onException: ajaxFailed
    //     });
    // }
    // new Ajax.Request("/api/restaruants/",
    // {
    //     method: "get",
    //     onSuccess: (ajax) => {
    //         stores = JSON.parse(ajax.responseText);
    //         for(var i = 0; i < stores.length; i++) {
    //             var item = stores[i];
    //             const rect = document.createElement('rect');
    //             rect.setAttribute('x', item.x);
    //             rect.setAttribute('y', item.y);
    //             rect.setAttribute('fill', "#878787");
    //             rect.setAttribute('stroke', "#000000");
    //             rect.setAttribute('stroke-miterlimit', "10");
    //             rect.setAttribute('width', "18");
    //             rect.setAttribute('height', "18");
    //             if(item.is_rotated) {
    //                 rect.setAttribute('transform', 'matrix(0.7071 -0.7071 0.7071 0.7071 '+ item.rx +' '+ item.ry +')')
    //             }
    //             rect.classList.add('box');
    //             rect.id = ('b' + item.ID);
    //             document.querySelector('svg#layer_1').appendChild(rect);
    //         }
    //         var element = document.querySelector("svg#layer_1");
    //         var newHTML = element.innerHTML.substring(0, element.innerHTML.length);
    //         element.innerHTML = ''
    //         element.innerHTML = newHTML;
    //         event_handling();
    //     },
    //     onFailure: ajaxFailed,
    //     onException: ajaxFailed
    // });
}

function moveStore(ajax) {
    var info = JSON.parse(ajax.responseText);
    var store = info.store;
    var menus = info.menus;
    removeElements();

    console.log(info);

    var body = document.createElement("div");
    body.setAttribute("class", "body");

    var header = document.createElement("div");
    header.setAttribute("class", "header");

    var pictrue = document.createElement("div");
    pictrue.setAttribute("class", "pictrue");

    var img = document.createElement("img");
    img.setAttribute("src", "http://placehold.it/360x360");
    img.setAttribute("class", "main");

    var txt = document.createElement("div");
    txt.setAttribute("class", "txt");
    var original = document.createElement("p");
    original.setAttribute("id", "original");
    original.innerText = store.branch + " > " + store.sub_branch;
    var r_name = document.createElement("p");
    r_name.setAttribute("id", "r_name");
    r_name.innerText = store.name;
    var add = document.createElement("p");
    add.setAttribute("id", "add");
    add.innerText = store.address_1;
    var phone = document.createElement("p");
    phone.setAttribute("id", "phone");
    phone.innerText = store.tel;

    var menu = document.createElement("p");
    menu.setAttribute("id", "menu");
    menu.innerText = "MENU";
    var hr = document.createElement("hr");
    hr.setAttribute("class", "menu-hr");

    txt.appendChild(original);
    txt.appendChild(r_name);
    txt.appendChild(add);
    txt.appendChild(phone);
    pictrue.appendChild(img);
    header.appendChild(pictrue);
    header.appendChild(txt);
    body.appendChild(header);

    body.appendChild(menu);
    body.appendChild(hr);


    for (var i = 0; i < menus.length; i++) {
        var menucard = document.createElement("div");
        menucard.setAttribute("class", "menucard");

        var menu_name = document.createElement("span");
        menu_name.setAttribute("class", "menu_name");
        menu_name.innerText = menus[i].name;

        var menu_price = document.createElement("span");
        menu_price.setAttribute("class", "menu_price");
        menu_price.innerText = menus[i].price + "원";

        menucard.appendChild(menu_name);
        menucard.appendChild(menu_price);

        var card_hr = document.createElement("hr");
        card_hr.setAttribute("class", "card-hr");

        body.appendChild(menucard);
        body.appendChild(card_hr);
    }

    $$("main")[0].appendChild(body);
    function_name(store.ID);

}

function function_name(id) {
    new Ajax.Request("/api/replys/" + id, {
        method: "GET",
        onSuccess: (ajax) => {
            var replys = JSON.parse(ajax.responseText);
            console.log(replys);
            var divs = document.createElement("div");
            divs.setAttribute("class", "replys");
            for (var i = 0; i < replys.length; i++) {
                var div = document.createElement("div");
                div.setAttribute("class", "reply");

                var username = document.createElement("span");
                username.innerText = replys[i].username;
                username.setAttribute("class", "username");
                var reply = document.createElement("span");
                reply.innerText = replys[i].reply;
                reply.setAttribute("class", "reply");
                var created = document.createElement("span");
                created.innerText = replys[i].created;
                created.setAttribute("class", "created");
                var hr = document.createElement("hr");

                div.appendChild(username);
                div.appendChild(created);
                div.appendChild(reply);

                divs.appendChild(div);
                divs.appendChild(hr);
            }

            var comments = document.createElement("p");
            comments.setAttribute("id", "comments");
            comments.innerText = "COMMENTS";

            $$(".body")[0].appendChild(comments);
            var hr = document.createElement("hr");
            hr.setAttribute("class", "menu-hr");
            $$(".body")[0].appendChild(hr);

            $$(".body")[0].appendChild(divs);

            var form = document.createElement("form");
            var username = document.createElement("input");
            username.setAttribute("type", "text");
            username.setAttribute("name", "username");
            username.setAttribute("id", "username");
            var password = document.createElement("input");
            password.setAttribute("type", "password");
            password.setAttribute("name", "password");
            password.setAttribute("id", "password");
            var contents = document.createElement("textarea");
            contents.setAttribute("name", "contents");
            contents.setAttribute("id", "contents");
            var submit = document.createElement("input");
            submit.setAttribute("type", "submit");

            form.appendChild(username);
            form.appendChild(password);
            form.appendChild(contents);
            form.appendChild(submit);
            $$(".body")[0].appendChild(form);
        },
        onFailure: ajaxFailed,
        onException: ajaxFailed
    });
}

// function event_handling() {
//     var boxes = $$(".box");
//     for (var i = 0; i < boxes.length; i++) {
//         boxes[i].onmousemove = (event) => {
//             var x = event.pageX - ($("popup").getWidth()/2);
//             var y = event.pageY - 60;
//             popupRefresh(x,y);
//         }
//         boxes[i].onmouseover = (event) => {
//             var id = event.target.getAttribute("id").substring(1);
//             loadStore(stores[id-1]);
//         };
//         boxes[i].onmouseout = () => {
//             $("popup").setStyle({
//                 display: "none"
//             });
//         }
//         boxes[i].onclick = (event) => {
//             $("popup").setStyle({
//                 display: "none"
//             });
//             var id = event.target.getAttribute("id").substring(1);
//             new Ajax.Request("/api/restaruants/" + id,{
//                 method: "GET",
//                 onSuccess: moveStore,
//                 onFailure: ajaxFailed,
//                 onException: ajaxFailed
//             });
//         }
//     }
// }


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