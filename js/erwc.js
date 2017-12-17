let total_candidates = null
let chosen = null
let x = -1
let y = -1
let is_started = false
window.onload = () => {
    $('start').onclick = (e) => {
        new Ajax.Request("/api/restaruants/",{
            method: "GET",
            onSuccess: (ajax) => {
                stores = JSON.parse(ajax.responseText)
                initiate(stores)
            },
            onFailure: ajaxFailed,
            onException: ajaxFailed
        })
    }
}

function initiate(stores) {
    total_candidates = []
    chosen = []
    while(total_candidates.length < 16) total_candidates.push(stores.splice(Math.floor(Math.random() * stores.length)))
    $('start').innerText = 'Restart'
    $('left').onclick = () => choose('x')
    $('right').onclick = () => choose('y')
    add_candidate()
    is_started = true;
}

function add_candidate() {
    if(chosen.length == total_candidates.length) {
        total_candidates = chosen
        chosen = []
    }
    if(chosen.length == 1) {
        finalize()
        return
    }
    x = Math.floor(Math.random() * total_candidates.length)
    do {
        y = Math.floor(Math.random() * total_candidates.length)
    } while(x != y)
    new Ajax.Request("/api/restaruants/" + total_candidates[x], {
        method: 'GET',
        onSuccess: (ajax) => {
            store = JSON.parse(ajax.responseText)
            $('left').innerText = store
        }
    })
    new Ajax.Request("/api/restaruants/" + total_candidates[y], {
        method: 'GET',
        onSuccess: (ajax) => {
            store = JSON.parse(ajax.responseText)
            $('left').innerText = store
        }
    })
}

function choose(a) {
    if(is_started) {
        chosen.push(total_candidates.splice((a == 'x') ? x : y))
        total_candidates.splice((a == 'x') ? y : x)
        add_candidate()
    }
}

function finalize() {
    alert('Winner: ' + total_candidates)
}

function ajaxFailed(ajax) {
    console.error(ajax)
}