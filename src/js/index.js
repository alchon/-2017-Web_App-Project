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

function loadStore(ajax) {
    while ($("popup").firstChild){
        $("popup").removeChild($("popup").firstChild);
    }

    var store = JSON.parse(ajax.responseText);

    var title = document.createElement("h1");
    title.innerText = store.title;

    var category = document.createElement("p");
    category.innerText = store.category;
    
    $("popup").appendChild(title);
    $("popup").appendChild(category);
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

function wrapWindowByMask() {
    // 화면의 높이와 너비
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    // 마스크의 높이와 너비를 화면의 높이와 너비로 설정
    $('.mask').css({'width':maskWidth, 'height':maskHeight});
    // fade 애니메이션 : 80%의 불투명으로 변함
    $('.mask').fadeTo("slow", 0.8);
    // 레이어 팝업을 가운데로 띄우기
    var left = ($(window).scrollLeft()+($(window).width()-$('.window').width())/2);
    var top = ($(window).scrollTop()+($(window).height()-$('.window').height())/2);
    // css 스타일 변경
    $('.window').css({'left':left, 'top':top, 'position':'absolute'});
    // 레이어 팝업 띄우기
    $('.window').show();
}

window.onload = () => {
    $("drawer-toggle").onclick = setOpened;
    $("blocker").onclick = removeOpened;
    

    // 12/12일 오전 1시에 하다맘

    // $('.showMask').click(function(e){
    //     // preventDefault는 href의 링크 기본 행동을 막는 기능입니다.
    //     e.preventDefault();
    //     wrapWindowByMask();
    // });
    
    $$('.showMask')[0].onclick = function(e) {
        // preventDefault는 href의 링크 기본 행동을 막는 기능입니다.
        e.preventDefault();
        wrapWindowByMask();
    }

    // 닫기(close)를 눌렀을 때 작동합니다.
    $$('.window .close')[0].onclick = function (e) {
        e.preventDefault();
        $$('.mask, .window')[0].hide();
    };

    // 뒤 검은 마스크를 클릭시에도 모두 제거하도록 처리합니다.
    $('.mask').click(function () {
        $(this).hide();
        $('.window').hide();
    });

    var boxes = $$(".box");
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].onmousemove = (event) => {
            var x = event.pageX - 100;
            var y = event.pageY - 60;
            popupRefresh(x,y);
            // popup(event.pageX, event.pageY);
        }
        boxes[i].onmouseover = (event) => {
            var store = getStore(event);
            
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