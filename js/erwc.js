let total_candidates = null
let chosen = null
let x = -1
let y = -1
let is_started = false
window.onload = () => {
    $('start').onclick = initiate
}

function initiate() {
    total_candidates = []
    chosen = []
    while(total_candidates.length < 16) {
        let i = -1
        do {
            i = Math.floor(Math.random() * 85) + 1
        } while(total_candidates.indexOf(i) != -1)
        total_candidates.push(i)
    } 
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
    } while(x == y)
    console.log(x)
    console.log(y)
    new Ajax.Request("/api/restaruants/" + total_candidates[x], {
        method: 'GET',
        onSuccess: (ajax) => {
            store = JSON.parse(ajax.responseText)
            console.log(store)
            $('left').innerText = store.store.name
        }
    })
    new Ajax.Request("/api/restaruants/" + total_candidates[y], {
        method: 'GET',
        onSuccess: (ajax) => {
            store = JSON.parse(ajax.responseText)
            console.log(store)
            $('right').innerText = store.store.name
        }
    })
}

function choose(a) {
    if(is_started) {
        console.log(a)
        console.log(x)
        console.log(y)
        chosen.push(total_candidates.splice(((a == 'x') ? x : y))[0], 1)
        total_candidates.splice(((a == 'x') ? y : x), 1)
        console.log(chosen)
        console.log(total_candidates)
        add_candidate()
    }
}

function finalize() {
    alert('Winner: ' + total_candidates)
    is_started = false
}

function ajaxFailed(ajax) {
    console.error(ajax)
}