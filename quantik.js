const gameTable = document.querySelector('#table')
const shapes = document.querySelector('#shapes')
const gameChanger = document.querySelector('#gameChanger')
const gameArea = document.querySelector('#gameArea')
const startPage = document.querySelector('#startPage')


function drawTable() {
    let table = document.createElement('table')

    for (let i = 0; i < 4; i++) {
        let tr = document.createElement('tr')
        for (let j = 0; j < 4; j++) {
            let td = document.createElement('td')
            td.setAttribute('data-row', i)
            td.setAttribute('data-col', j)
            td.setAttribute('class', "empty")
            if ((i == 0 || i == 1) && (j == 0 || j == 1)) {
                td.style.backgroundColor = "yellow"
            }
            else if ((i == 2 || i == 3) && (j == 2 || j == 3)) {
                td.style.backgroundColor = "yellow"
            }
            else {
                td.style.backgroundColor = "red"
            }
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    gameTable.appendChild(table)
}












delegate(shapes, 'img', 'dragstart', (event, target) => {
    target.className = " hold"
    gameData.tempSrc = target.src
    gameData.tempValue = target.dataset.shape




    //Itt kéne:
    //Elmentjük a az img értékét ideiglenesen a dragstartnál (mindig újramentjük, így egy újabb dragstartnál kitörlődik az előző)
    //Majd a drop függvénynél az ellenőrzések után az ideiglenes érték bekerül a PutValues függvénnyel 
    // Továbbá a tempPlayer és és az ideiglenes értékek segítségével levonjuk a megfelelő spanban az értéket, ha kell elmozdíthatatlanná tesszük
    //Végül meghívjuk a gameStepper függvényt ami mindent leléptet és kitöröl ha kell

})
delegate(shapes, 'img', 'dragend', (event, target) => {
    if (target.nextElementSibling.innerText!="0") {
    target.className = "fill"
    }
    else {
        target.className= "zero"
    }

})



delegate(gameTable, 'td', 'dragover', (event, target) => {
    event.preventDefault()
    console.log("hover")
})

delegate(gameTable, 'td', 'dragenter', (event, target) => {
    if (possiblePlace(target.dataset.row, target.dataset.col)) {
        event.preventDefault()
        target.className = "hovered"
        console.log("enter")
    }
})

delegate(gameTable, 'td', 'dragleave', (event, target) => {
    target.className = "empty"
    console.log("leave")
})
delegate(gameTable, 'td', 'drop', (event, target) => {
    if (possiblePlace(target.dataset.row, target.dataset.col)) {
        target.appendChild(makeImg())
        target.className = "fill"
        putValues(target.dataset.row, target.dataset.col)
        shapesCounter()
        setTimeout(
        gameStepper,0)
    }
})

function makeImg(td) {
    let img = document.createElement('img')
    img.src = gameData.tempSrc
    img.setAttribute('draggable', 'false')
    return img
}






function delegate(parent, child, when, what) {
    function eventHandlerFunction(event) {
        let eventTarget = event.target;
        let eventHandler = this;
        let closestChild = eventTarget.closest(child);

        if (eventHandler.contains(closestChild)) {
            what(event, closestChild);
        }
    }

    parent.addEventListener(when, eventHandlerFunction);
}

const gameData = {
    rows: [
        [],
        [],
        [],
        []
    ],
    cols: [
        [],
        [],
        [],
        []
    ],
    squers: [
        [],
        [],
        [],
        []
    ],
    tempValue: "",
    tempIndex: [2, 1],
    tempPlayer: "első",
    tempSrc: 0,
    temp1Name: "",
    temp2Name: ""
}

function checkSome(x) {
    return gameData.tempValue == x
}
function possiblePlace(x, y) {
    const row = gameData.rows[x].some(checkSome)
    const col = gameData.cols[y].some(checkSome)
    let squer
    if ((x == 0 || x == 1) && (y == 0 || y == 1)) {
        squer = gameData.squers[0].some(checkSome)
    }
    else if ((x == 0 || x == 1) && (y == 2 || y == 3)) {
        squer = gameData.squers[1].some(checkSome)
    }
    else if ((x == 2 || x == 3) && (y == 0 || y == 1)) {
        squer = gameData.squers[2].some(checkSome)
    }
    else {
        squer = gameData.squers[3].some(checkSome)
    }

    if (row == true || col == true || squer == true) {
        return false
    }
    else {
        return true
    }

}

function putValues(x, y) {
    gameData.tempIndex[0] = x
    gameData.tempIndex[1] = y
    gameData.rows[x].push(gameData.tempValue)
    gameData.cols[y].push(gameData.tempValue)
    if ((x == 0 || x == 1) && (y == 0 || y == 1)) {
        gameData.squers[0].push(gameData.tempValue)
    }
    else if ((x == 0 || x == 1) && (y == 2 || y == 3)) {
        gameData.squers[1].push(gameData.tempValue)
    }
    else if ((x == 2 || x == 3) && (y == 0 || y == 1)) {
        gameData.squers[2].push(gameData.tempValue)
    }
    else {
        gameData.squers[3].push(gameData.tempValue)
    }
}

function checkWin(x, y) {
    console.log("win")
    const row = gameData.rows[x].length == 4
    const col = gameData.cols[y].length == 4
    let squer
    if ((x == 0 || x == 1) && (y == 0 || y == 1)) {
        squer = gameData.squers[0].length == 4
    }
    else if ((x == 0 || x == 1) && (y == 2 || y == 3)) {
        squer = gameData.squers[1].length == 4
    }
    else if ((x == 2 || x == 3) && (y == 0 || y == 1)) {
        squer = gameData.squers[2].length == 4
    }
    else {
        squer = gameData.squers[3].length == 4
    }

    if (row == true || col == true || squer == true) {
        return true
    }
    else {
        return false
    }
}

function gameStepper() {
    if (checkWin(gameData.tempIndex[0], gameData.tempIndex[1])) {
        if (gameData.tempPlayer == "első") {
            setTimeout(
                ()=>alert(`${gameData.temp1Name} győzőtt! Gratulálunk`),
                0
            )
            
        }
        else {
            setTimeout(
                () =>  alert(`${gameData.temp2Name} győzőtt! Gratulálunk`),
                0);
           
        }
        endGame()
    }
    else {

        if (gameData.tempPlayer == "első") {
            enableDraggable()
            gameData.tempPlayer = "második"
            let player = gameChanger.querySelector('#kettes')
            player.src = "kepek/babu-zold2.png"
            player = gameChanger.querySelector('#egyes')
            player.src = "kepek/babujo.png"
            disableDraggable()
        }
        else {
            enableDraggable()
            gameData.tempPlayer = "első"
            let player = gameChanger.querySelector('#egyes')
            player.src = "kepek/babu-piros.png"
            player = gameChanger.querySelector('#kettes')
            player.src = "kepek/babujo.png"
            disableDraggable()
        }


    }

}

function shapesCounter() {
    const span = getImg().nextElementSibling
    let num = parseInt(span.innerText)
    if (num > 0) {
        if (num > 1) {
            num -= 1
            span.innerText = num
        }
        else {
            num -= 1
            span.innerText = num
            console.log("lehetetlenítés")
            img=getImg()
            console.log(img)
            //img.setAttribute('draggable', 'false')
            img.classList.add('zero')

        }
    }
}

function disableDraggable() {

    const shapes = getOtherPlayerShapes()

    for (shape of shapes) {
        shape.setAttribute('draggable', 'false')
    }
}

function enableDraggable() {
    const shapes = getOtherPlayerShapes()

    for (shape of shapes) {
        if (shape.className != "zero") {
            shape.setAttribute('draggable', 'true')
        }
    }
}

function getImg() {
    return shapes.querySelector(`#${gameData.tempPlayer} img[data-shape="${gameData.tempValue}"]`)
}

function getOtherPlayerShapes() {
    let otherShapes
    if (gameData.tempPlayer == "első") {
        otherShapes = shapes.querySelectorAll('#második img')
    }
    else {
        otherShapes = shapes.querySelectorAll('#első img')
    }
    return otherShapes
}

const button = startPage.querySelector('#button')
button.addEventListener('click', startGame)

function startGame() {
    startPage.setAttribute('hidden', 'true')
    gameArea.removeAttribute('hidden')
    drawTable()
    settingNames()
    const player = gameChanger.querySelector('#egyes')
    player.src = "kepek/babu-piros.png"
    gameData.tempIndex = [0, 0]
    gameData.tempValue = ""
    gameData.tempPlayer = "első"
    disableDraggable()
}

function endGame() {
    startPage.removeAttribute('hidden')
    gameArea.setAttribute('hidden', 'true')
    for (img of gameChanger.querySelectorAll('img')) {
        img.src = "kepek/babujo.png"
    }
    for (x of gameData.cols) {
        x.length = 0
    }
    for (z of gameData.rows) {
        z.length = 0
    }
    for (k of gameData.squers) {

        k.length = 0
    }
    for (shape of shapes.querySelectorAll('#shapes img')) {
        shape.setAttribute('draggable', 'true')
        shape.nextElementSibling.innerText = 2
    }
    gameTable.innerText = ""
    settingBackNames()


}

function settingNames() {
    const elso = startPage.querySelector("#elso")
    const masodik = startPage.querySelector("#masodik")

    const nev1 = gameChanger.querySelector('#egyes').nextElementSibling
    const nev2 = gameChanger.querySelector('#kettes').nextElementSibling

    const h31 = shapes.querySelector('#első h3')
    const h32 = shapes.querySelector('#második h3')

    nev1.innerText = elso.value
    nev2.innerText = masodik.value
    gameData.temp1Name = elso.value
    gameData.temp2Name = masodik.value
    h31.innerText=elso.value
    h32.innerText=masodik.value

}

function settingBackNames() {
    const elso = startPage.querySelector("#elso")
    const masodik = startPage.querySelector("#masodik")

    elso.value = "1.Játékos"
    masodik.value = "2.Játékos"
}

//Beírok mindent
//StartGame: létrehozza a táblát, és mindent kitöröl, minden tiszta, mint újratöltésnél
//Megragadja az első elemet: az elem értékét (pl. négyzet) elmentem ideiglenesen
//Ha nincs ott semmi, ha be lehet helyezni, akkor a hovered stílus lesz, ha felette tartjuk
//Ha beleengedjük és hovered stílus volt, tehát bele kerülhet oda, akkor az adott koordináták is elmentődnek
//A shapeCounter segítségével elmentődnek az alakzatok
//Majd a koordináták segítségével a tempÉrtket belehelyezzük a gameData-ba
//Ezek után ellenőrizzük a nyereséget, ha nem nyert a léptetés következik, ha nyert akkor a tempPlyer marad, aki nyert, majd minden törlődik és visszaugrik
//H a nem nyert, akkor a léptetés során a feloldjuk a  shapeZárlatot, játékost váltunk és újra shapeZárlat lesz
//