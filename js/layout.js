window.onload = () => {
    console.log(132123);
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