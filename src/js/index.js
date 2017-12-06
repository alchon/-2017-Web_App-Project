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

window.onload = () => {
    $("drawer-toggle").onclick = setOpened;
    $("blocker").onclick = removeOpened;
    $("box").onmousemove = (event) => {
        popup(event.clientX, event.clientY);
    }
    $("box").onmouseover = () => {
        console.log(11);
        $("popup").setStyle({
            display: "block"
        });
    };
    $("box").onmouseout = () => {
          $("popup").setStyle({
            display: "none"
        });  
    }
}

function popup(x, y) {
    $("popup").setStyle({
        top:y-60,
        left:x-100
    });
}