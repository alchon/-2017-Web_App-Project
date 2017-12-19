var stores;
var map;
var previous;

let store_id;
window.onpageshow = (event) => {
    if (event.persisted && previous) {
        removeElements("main");
        $$("main")[0].appendChild(previous);
    }
}

window.onload = () => {
    $("drawer-toggle").onclick = setOpened;
    $("blocker").onclick = removeOpened;
    $("jebi").onclick = jebi;
    $("erwc").onclick = erwc;
    $("logo").onclick = logoClick;

    map = document.querySelector("svg#layer_1");
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

function logoClick() {
    location.reload();
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
    if (!document.querySelector("svg#layer_1")) {
        removeElements("main");
        $$("main")[0].appendChild(map);
    }
    const restaruants = JSON.parse(ajax.responseText);
    const rects = $$('rect.box');
    for(var i = 0; i < rects.length; i++) {
        var item = rects[i];
        document.getElementById(item.id).classList.remove("selected");
        if(restaruants.indexOf(item.id.substring(1)) != -1) {
            document.getElementById(item.id).classList.add('search');
        } else {
            document.getElementById(item.id).classList.remove('search');
        }
    }
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
                    if (!document.querySelector("svg#layer_1")) {
                        removeElements("main");
                        $$("main")[0].appendChild(map);
                    }
                    const restaruants = JSON.parse(ajax.responseText);
                    const rects = $$('rect.box');
                    for(var i = 0; i < rects.length; i++) {
                        var item = rects[i];
                        document.getElementById(item.id).classList.remove('search');
                        if(restaruants.indexOf(item.id.substring(1)) != -1) {
                            document.getElementById(item.id).classList.add('selected');
                        } else {
                            document.getElementById(item.id).classList.remove('selected');
                        }
                    }
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
                map.appendChild(rect);
            }
            var newmap = map.innerHTML.substring(0, map.innerHTML.length);
            map.innerHTML = ''
            map.innerHTML = newmap;
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
            window.location = "#" + id
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

function moveStore(ajax) {
    var info = JSON.parse(ajax.responseText);
    var store = info.store;
    var menus = info.menus;
    previous = $$("main")[0].firstChild;
    removeElements("main");

    console.log(info);

    var body = document.createElement("div");
    body.setAttribute("class", "body");

    var header = document.createElement("div");
    header.setAttribute("class", "header");

    var pictrue = document.createElement("div");
    pictrue.setAttribute("class", "pictrue");

    var img = document.createElement("img");
    img.setAttribute("src", "https://placehold.it/360x360");
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
    store_id = id;
    new Ajax.Request("/api/replys/" + id, {
        method: "GET",
        onSuccess: (ajax) => {
            var replys = JSON.parse(ajax.responseText);
            console.log(replys);
            var divs = document.createElement("div");
            divs.setAttribute("class", "replys");

            var comments = document.createElement("p");
            comments.setAttribute("id", "comments");
            comments.innerText = "COMMENTS";

            $$(".body")[0].appendChild(comments);
            var hr = document.createElement("hr");
            hr.setAttribute("class", "menu-hr");
            $$(".body")[0].appendChild(hr);

            const reply_area = document.createElement('div');
            reply_area.id = 'reply-area';
            divs.appendChild(reply_area);

            $$(".body")[0].appendChild(divs);

            var form = document.createElement("div");
            form.id = 'reply-form'
            var username = document.createElement("input");
            username.setAttribute("type", "text");
            username.setAttribute("name", "username");
            username.setAttribute("id", "username");
            username.setAttribute("placeholder", "username");
            var password = document.createElement("input");
            password.setAttribute("type", "password");
            password.setAttribute("name", "password");
            password.setAttribute("id", "password");
            password.setAttribute("placeholder", "password");
            var contents = document.createElement("textarea");
            contents.setAttribute("name", "contents");
            contents.setAttribute("id", "contents");
            contents.setAttribute("placeholder", "내용을 입력하세요.");
            var submit = document.createElement("button");
            submit.innerText = '댓글 작성';
            submit.onclick = submit_reply

            form.appendChild(username);
            form.appendChild(password);
            form.appendChild(contents);
            form.appendChild(submit);

            console.log(form);
            $$(".body")[0].appendChild(form);

            load_comment(replys)
        },
        onFailure: ajaxFailed,
        onException: ajaxFailed
    });
}

function load_comment(replys) {
    document.getElementById('reply-area').innerHTML = ''
    for (var i = 0; i < replys.length; i++) {
        var div = document.createElement("div");
        var d  = new Date(Number.parseFloat(replys[i].created) * 1000);
        var hr = document.createElement("hr");

        div.setAttribute("class", "reply");
        div.innerText = replys[i].username + '님 (' + d.getMonth() + '월 ' + d.getDay() + ' 일) : ' + replys[i].reply

        const img = document.createElement('img');
        img.setAttribute('src', '/img/x-mark.png');
        img.setAttribute('alt', 'DeleteReply');
        img.setAttribute('your-id', replys[i].id)
        img.setStyle({
            float: 'right',
            width: '13px'
        })

        img.onclick = delete_reply

        div.appendChild(img);

        
        document.getElementById('reply-area').appendChild(div);
        document.getElementById('reply-area').appendChild(hr);
    }
}


function delete_reply(e) {
    const input_password = prompt('Type your password')
    console.log(input_password);
    if(!input_password) {
        console.log('No password')
        return;
    }
    var selected_id = e.target.getAttribute('your-id');
    axios.delete('/api/replys/' + store_id + '/' + selected_id, {
        password: input_password
    })
    .then((ajax) => {
        const result = ajax.data;
        if(result.success) {
            new Ajax.Request('/api/replys/' + store_id, {
                method: 'GET', 
                onSuccess: (ajax) => load_comment(JSON.parse(ajax.responseText)),
                onFailure: ajaxFailed
            })
        } else {
            alert('비밀번호가 틀립니다');
        }
    })
    .catch((err) => {
        ajaxFailed(null, err)
    })
}

function submit_reply() {
    console.log('Called');
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const contents = document.getElementById('contents').value
    
    new Ajax.Request('/api/replys' , {
        method: 'POST',
        parameters: {
            store_id: store_id ,
            username: username,
            password: password,
            contents: contents
        },
        onSuccess:(ajax) => {
            console.log(ajax);
            new Ajax.Request('/api/replys/' + store_id, {
                method: 'GET', 
                onSuccess: (ajax) => load_comment(JSON.parse(ajax.responseText)),
                onFailure: ajaxFailed
            })
        },
        onFailure: ajaxFailed
    })
}

function removeElements(query) {
    while ($$(query)[0].firstChild){
        $$(query)[0].removeChild($$(query)[0].firstChild);
    }
}


function ajaxFailed(ajax, exception) {
    var errorMessage = "Error making Ajax request:\n\n";
    if (exception) {
        errorMessage += "Exception: " + exception + " on line " + exception.lineNumber;
    } else {
        errorMessage += "Server status:\n" + ajax.status + " " + ajax.statusText + 
                        "\n\nServer response text:\n" + ajax.responseText;
    }
    console.log(errorMessage);
}