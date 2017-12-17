var names = [];
var wc16 = [];
var wc8 = [];
var wc4 = [];
var wc2 = [];
var wc1 = [];
var check = [];

window.onload = () => {
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
    start();
}

function pick() {
    for(var i=0; i<16; i++) {
        while(true) {
            var index = Math.floor(Math.random()*(names.length));
            if(check.indexOf(index) != -1) {
                check.push(index);
                wc16.push(names[index]);
                break;
            }
        }
    }
}

function start() {
    pick();
    var item = 16;
    var p_l = document.createElement("p");
    var p_r = document.createElement("p");
    var p_t = document.createElement("p");
    while(true) {
        if(item == 16) {
            p_t.innerText = "8강";
            document.querySelector("#round").appendChild(p_t);
            for(var i=0; i<16; i+=2) {
                p_l.innerText = "";
                p_l.innerText = wc16[i];
                p_r.innerText = "";
                p_r.innerText = wc16[i+1];
                document.querySelector("#left").appendChild(p_l);
                document.querySelector("#right").appendChild(p_r);
                $("left").onclick = () => {
                    wc8.push(wc16[i]);
                }
                $("right").onclick = () => {
                    wc8.push(wc16[i+1]);
                }
            }
            item = 8;
        }
        else if(item == 8) {
            p_t.innerText = "4강";
            document.querySelector("#round").appendChild(p_t);
            for(var i=0; i<8; i+=2) {
                p_l.innerText = "";
                p_l.innerText = wc8[i];
                p_r.innerText = "";
                p_r.innerText = wc8[i+1];
                document.querySelector("#left").appendChild(p_l);
                document.querySelector("#right").appendChild(p_r);
                $("left").onclick = () => {
                    wc4.push(wc8[i]);
                }
                $("right").onclick = () => {
                    wc4.push(wc8[i+1]);
                }
            }
            item = 4;
        }
        else if(item == 4){
            p_t.innerText = "준결승";
            document.querySelector("#round").appendChild(p_t);
            for(var i=0; i<4; i+=2) {
                p_l.innerText = "";
                p_l.innerText = wc4[i];
                p_r.innerText = "";
                p_r.innerText = wc4[i+1];
                document.querySelector("#left").appendChild(p_l);
                document.querySelector("#right").appendChild(p_r);
                $("left").onclick = () => {
                    wc2.push(wc4[i]);
                }
                $("right").onclick = () => {
                    wc2.push(wc4[i+1]);
                }
            }
            item = 2;
        }
        else if (item == 2) {
            p_t.innerText = "결승";
            document.querySelector("#round").appendChild(p_t);
            for(var i=0; i<2; i+=2) {
                p_l.innerText = "";
                p_l.innerText = wc2[i];
                p_r.innerText = "";
                p_r.innerText = wc2[i+1];
                document.querySelector("#left").appendChild(p_l);
                document.querySelector("#right").appendChild(p_r);
                $("left").onclick = () => {
                    wc1.push(wc2[i]);
                }
                $("right").onclick = () => {
                    wc1.push(wc2[i+1]);
                }
            }
            item = 1;
        }
        else if(item == 1){
            p_t.innerText = "우승";
            document.querySelector("#round").appendChild(p_t);
            $("left").addClassName("hidden");
            $("right").addClassName("hidden");
            var p_f = document.createElement("p");   
            p_f.innerText = wc1[0];
            document.querySelector("#finish").appendChild(p_t);
        }
    }
}