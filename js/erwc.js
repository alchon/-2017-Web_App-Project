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
    if(total_candidates.length == 0) {
        total_candidates = chosen
        $('round').innerText = chosen.length + "강";
        chosen = []
        if(total_candidates.length == 1) {
            finalize()
            return
        }
    }
    x = Math.floor(Math.random() * total_candidates.length)
    do {
        y = Math.floor(Math.random() * total_candidates.length)
    } while(x == y)
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
        const win = total_candidates[((a == 'x') ? x : y)]
        const lose = total_candidates[((a == 'x') ? y : x)]
        console.log(win + ' ' + lose)
        chosen.push(total_candidates.splice(total_candidates.indexOf(win), 1)[0])
        total_candidates.splice(total_candidates.indexOf(lose), 1)
        console.log(chosen)
        console.log(total_candidates)
        add_candidate()
    }
}

function finalize() {
    // alert('Winner: ' + total_candidates[0])
    is_started = false
    new Ajax.Request('/api/restaruants/' + total_candidates[0], {
        method: 'GET', 
        onSuccess: (ajax) => {
            // $('round').innerText = JSON.parse(ajax.responseText).store.name
            alert('Winner: ' + JSON.parse(ajax.responseText).store.name);
        }
    })
}

function ajaxFailed(ajax) {
    console.error(ajax)
}