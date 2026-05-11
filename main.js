// merci CHATgpt a pour aider 
var produit = [{
    name: "pc acer",
    img: "les images/images.jpg",
    prix: 3600,
    id: 1,
    quant: 1
}, {
    name: "air forc",
    img: "les images/téléchargement.webp",
    prix: 400,
    id: 2,
    quant: 1
}, {
    name: "samsung ultra 26",
    img: "les images/telephone.jpg",
    prix: 15000,
    id: 3,
    quant: 1,
}, {
    name: "sourie pc gamer",
    img: "les images/sourie.jpg",
    prix: 300,
    id: 4,
    quant: 1
}, {
    name: "tv samsung",
    img: "les images/téléchargement (1).jpg",
    prix: 2000,
    id: 5,
    quant: 1
}, {
    name: "t-shirt",
    img: "les images/téléchargement.jpg",
    prix: 150,
    id: 6,
    quant: 1
}]
var main = document.getElementById("main")
function read() {
    var arr = []
    for (let i = 0; i < produit.length; i++) { arr.push(i) }
    for (let x = 0; x < arr.length; x++) {
        let j = Math.floor(Math.random() * (x + 1));
        let d = arr[x]
        arr[x] = arr[j]
        arr[j] = d
    }
    let content = ""
    for (let i = 0; i < produit.length; i++) {
        content += `<div>
            <img src="${produit[arr[i]].img}" alt="">
            <h1>${produit[arr[i]].name}</h1>
            <h2>${produit[arr[i]].prix + "DH"}</h2>
            <button onclick="addtocard(${produit[arr[i]].id}) , opncard()">add</button>
        </div>`}
    main.innerHTML = content
}
read()
var select = document.getElementById('fil')
select.onchange = function () {
    let hf;
    if (select.value === "de") {
        hf = [...produit].sort((a, b) => b.prix - a.prix);
    }
    else if (select.value === "cr") {
        hf = [...produit].sort((a, b) => a.prix - b.prix);
    }
    else {
        read();
        return;
    }
    display(hf);
}
var add
if (localStorage.add != null) { add = JSON.parse(localStorage.add) }
else { add = [] }
var card = document.getElementById("card")
function addtocard(ide) {
    let found = false
    for (let i = 0; i < add.length; i++) {
        if (add[i].id === ide) {
            add[i].quant++
            found = true
            break
        }
    }
    if (!found) {
        for (let i = 0; i < produit.length; i++) {
            if (produit[i].id === ide) {
                add.push({ ...produit[i] })
                break
            }
        }
    }
    localStorage.add = JSON.stringify(add)
    tableafficher()
    gettotalprix()
}
tableafficher()

function tableafficher() {
    var table = document.getElementById("table")
    var tr = ""
    for (let i = 0; i < add.length; i++) {
        tr += `
             <tr>
                <td><img src="${add[i].img}"></td>
                <td>${add[i].name}</td>
                <td><span id="prix">${add[i].prix}</span>dh</td>
                <td id="quantité"><input onkeyup="gettotal(${i})" value="${add[i].quant}" min="1" onchange="gettotal(${i})" id="inpquan${i}" min="1" type="number">
                <td> <span id="tota${i}">${add[i].prix * add[i].quant}</span>dh</td>
                <td><button onclick="del(${i})" id="del">délete</button></td>
            </tr>
        `
    }
    table.innerHTML = tr
    gettotalprix()
}
var isCardOpen = false;
function opncard() {
    if (innerWidth < 1000) {
        card.style.left = "0"
    }
    else if (innerWidth > 1000) {
        card.style.left = "40%"
    }
    isCardOpen = true
}
function clo() {
    card.style.left = "100%"
    isCardOpen = false
}
window.onresize = () => {
    if (isCardOpen) {
        if (innerWidth < 1000) {
            card.style.left = "0"
        }
        else if (innerWidth > 1000) {
            card.style.left = "40%"
        }
    }
}
function del(id) {
    add.splice(id, 1)
    localStorage.add = JSON.stringify(add)
    tableafficher()
}
function gettotal(id) {
    var inpquan = document.getElementById(`inpquan${id}`)
    var tota = document.getElementById(`tota${id}`)
    if (inpquan.value > 0) {
        let tol = add[id].prix * Number(inpquan.value)
        tota.innerHTML = tol
        add[id].quant = Number(inpquan.value)
    }
    else {
        tota.innerHTML = add[id].prix
        add[id].quant = 1
    }
    localStorage.add = JSON.stringify(add)
    gettotalprix()
}

var val = document.getElementById("inputsearch")
function search() {
    let content = ""
    let ser = []
    for (let i = 0; i < produit.length; i++) {
        if (produit[i].name.toLowerCase().includes(val.value.toLowerCase())) {
            ser.push(produit[i])
        }
    }
    display(ser)
}

function display(data) {
    let content = ""
    for (let i = 0; i < data.length; i++) {
        content += `<div>
            <img src="${data[i].img}" alt="">
            <h1>${data[i].name}</h1>
            <h2>${data[i].prix + "DH"}</h2>
            <button onclick="addtocard(${data[i].id}) , opncard()">add</button>
        </div>`
    }
    main.innerHTML = content
}
function gettotalprix() {
    var totalprix = 0
    var totalpro = 0
    for (let i = 0; i < add.length; i++) {
        totalpro += add[i].quant
        totalprix += add[i].prix * add[i].quant
    }
    document.getElementById("totaltotal").innerHTML = totalprix
    document.getElementById("totalproduit").innerHTML = totalpro
}