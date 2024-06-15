
// function gameLoop() {
//     //t e de la tp adica sus, adica cate patratele se numara de la marginea de sus pana la cap
//     let t = parseInt(cap.style.top);
//     //l vine de la left, adica stanga, adica cate patratele se numara de la marinea din stanga pana la cap
//     let l = parseInt(cap.style.left);
//     switch (directie) {
//         case "r":
//             l = l + bw;
//             break;
//         case "l":
//             l = l - bw;
//             break;
//         case "u":
//             t = t - bw;
//             break;
//         case "d":
//             t = t + bw;
//             break;
//     }
//     cap.style.top = `${t}px`;
//     cap.style.left = `${l}px`;
// }

// gameLoop()
// onKeyDown()
// function onKeyDown(e) {
//     switch (e.key) {
//         case "ArrowRight":
//             directie = "r";
//             break;
//         case "ArrowLeft":
//             directie = "l";
//             break;
//         case "ArrowUp":
//             directie = "u";
//             break;
//         case "ArrowDown":
//             directie = "d";
//             break

//     }

// }

//aici sunt datele de inceput ale jocului
const joc = document.getElementById("joc");
const btnReset = document.getElementById("btnReset");
console.log(btnReset);
let directie = "r";
let interval = 250;
let mancarea;
console.log(mancarea, "hai sa vedem cum e mancarea aici");
let sarpe = [];
let cap;
const w = 400;
const h = 600;
const bw = 10;
document.addEventListener("DOMContentLoaded", onLoad);
document.addEventListener("keydown", onKeyDown);

btnReset.addEventListener("click", onReset);
function onLoad() {
    creeazaSarpe(200, 50);
   
    genereazaMancare();
}
function onReset() {
    joc.innerHTML = "";
    sarpe.length = 0;

    btnReset.disabled = true;
    interval = 250;
    directie = 'r';
    creeazaSarpe(200, 50);
    genereazaMancare();
    timer = setInterval(gameLoop, interval)
}
//aici e functia care creaaza efectiv sarpele
function creeazaSarpe(left, top) {
    for (let i = 0; i < 4; i++) {
        let div = document.createElement("div");
        div.style.top = `${top}px`;
        div.style.left = `${left}px`;
        left = left - bw;
        sarpe.push(div);
        joc.appendChild(div);
    }
    cap = sarpe[0]
}
let timer = setInterval(gameLoop, interval);
console.log(timer)




function gameLoop() {
    //mai jos sunt stocare coordonatele capului
    let t = parseInt(cap.style.top);
    let l = parseInt(cap.style.left);
    console.log("Aici cand se ajunge RASPUND TOT EU, SE AJUNGE DE N ORI LA FIECARE 250milisecunde, deic si acest if(gameOver seexecuta de tot atatea ori) ")
    if (gameOver(t, l)) {
        console.log("eram curioasa de cate ori se ajunge")
        clearInterval(timer);
        console.log(btnReset);
        console.log(btnReset.disabled)
        btnReset.disabled = false;
        alert("Game Over");
        return;
    }
    if (cap.offsetLeft == mancarea.offsetLeft && cap.offsetTop == mancarea.offsetTop) {
        sarpe.splice(1, 0, mancarea);
        genereazaMancare();
    }
    //aici se salveaza coordonatele capului
    cap.oldTActual = parseInt(cap.style.top);
    cap.oldLActual = parseInt(cap.style.left);
    //aici se verifica directia dupa ce a intrat in functiune functia aia cu onKeyDown
    if (directie === "r") {
        console.log("de ce cacat daca eu apas sageata stanga, eu am directia tot r, pentru ca directia a ramas tot cum a fost adica r, nu am reasignat-o cu nimic altceva")
        l = l + bw;
    }
    else if (directie === "l") {
        l = l - bw;
    }
    else if (directie === "u") {
        t = t - bw;

    }

    else if (directie === "d") {
        t = t + bw;
    }
    cap.style.top = `${t}px`;
    cap.style.left = `${l}px`;
    console.log(cap.style.top);
    console.log(cap.style.left);

    for (let i = 1; i < sarpe.length; i++) {
        let prev = sarpe[i - 1];
        console.log(parseInt(sarpe[i].style.top), "ce val e asta")
        sarpe[i].oldTActual = parseInt(sarpe[i].style.top);
        console.log(sarpe[i].oldTActual, "tre sa o regasesc aici")

        sarpe[i].oldLActual = parseInt(sarpe[i].style.left);
        sarpe[i].style.top = `${prev.oldTActual}px`;
        sarpe[i].style.left = `${prev.oldLActual}px`;
    }
}


function gameOver(t, l) {
    for (let i = 1; i < sarpe.length; i++) {
        //aici jos este faza aia ca am 230px diferit de 230 
        // if (sarpe[i].offsetLeft != sarpe[i].style.left) {
        //     console.log("offsetLeft=" + sarpe[i].offsetLeft + " style.left=" + sarpe[i].style.left);
        // }

        if (sarpe[i].style.left == cap.style.left && sarpe[i].style.top == cap.style.top) {
            console.log(sarpe[i].offsetLeft, " se ajunge aici doar daca if a fost evaluat a fi true");
            return true;
        }
    }

    if (t > h || l < 0 || t < 0 || l >= w) {
        console.log(t > h || l < 0 || t < 0 || l >= w, "ce cacat e asta, inteleg ca o sa am intotdeauna true la return daca if e true si ca sa fie true trebuie macar o conditiile din alea de mai sus sa fie true si daca macar o conditie e true inseamna ca sarpele s-a lovit de pereti si imi da tot true si atunci se intra in corpul lui gameOver,aici o sa ajung cand dau de peretii ecranului");

        return t > h || l < 0 || t < 0 || l >= w;
    }
}
function genereazaMancare() {
    let d = document.createElement("div");
    let topdistance = 10 * genereazaNumar(0, h / 10 - 1);
    console.log(topdistance);
    let leftdistance = 10 * genereazaNumar(0, w / 10 - 1);
    console.log(leftdistance);
    d.style.top = `${topdistance}px`;
    d.style.left = `${leftdistance}px`;
    mancarea = d
    console.log(mancarea, "dar aici cum arata mancarea")
    joc.appendChild(d);
}
function genereazaNumar(min, max) {
    return Math.ceil(min + Math.random() * (max - min))
}
function onKeyDown(e) {
    if (e.key === "ArrowRight") {
        console.log(e.key, " ce naiba ma e si aici");
        //operator ternar
        // directie = directie != "l" ? "r" : directie;
        if (directie === "u" || directie === "d" || directie === "r")
            directie = "r"

        else if (directie === 'l')
            directie === "l"
    }
    else if (e.key === "ArrowLeft") {
  
        if (directie === "u" || directie === "d" || directie === "l") {
            directie = "l";
        }
        else if (directie === "r")
            directie = "r"

    }
    else if (e.key === "ArrowUp") {
        if (directie == "u" || directie == "l" || directie == "r") {
            directie = "u"
        }
        else if (directie == "d")
            directie = "d"
    }
    else if (e.key === "ArrowDown") {
        if (directie == "d" || directie == "r" || directie == "l") {
            directie = "d";
        }
        else if (directie == "u")
            directie = "u";
    }
}
