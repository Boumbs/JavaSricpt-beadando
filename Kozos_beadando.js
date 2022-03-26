const gamearea = document.querySelector('#gamearea')

///////////////////////////////////////////////////
//Teszt adatsorok
const arr = [
    [[3, 4], [4, 4], [5, 4]],
    [[1, 2], [1, 3]],
    [[9, 8], [8, 8], [7, 8], [6, 8]]
]

const arr1 = {
    harom: {
        x: [3, 4, 5],
        y: [4, 4, 4]
    }
}

const boats = {
    tizes: [5, 4, 3, 3, 2],
    nyolcas: [4, 3, 3, 2],
    hatos: [4, 3, 2],
    negyes: [3, 3, 2]
}
const arrTest = [[3, 4], [2, 4]]
const array = [[3, 4], [4, 2], [8, 9], [1, 3]]
const ures = []

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Ez a függvény a bemeneti táblamérettől függően legenerál egy hajólistát, amely a hajók méretét tartalmazza
function generateBoatLength(rowSize,colSize) {
    let sum = 0
    let listOfBoatLength = []
    while (sum < (rowSize*colSize*0.17)) {
        let number = random(4) + 2
        sum = sum + number
        listOfBoatLength.push(number)
    }
    listOfBoatLength.sort()
    listOfBoatLength.reverse()
    return listOfBoatLength
}



/////////////////////////////////////////////////////////////////////////////////////
// Itt van az a lista, amelyen próbálkoztam, de a későbbiekben egy másik függvény csinálja ezt
const order = [5, 4, 3, 3, 2]

// random függvény
function random(max) {
    return Math.floor(Math.random() * (max))
}

// Ez a függvény megnézi, hogy egy listák listájában (array) van-e olyan koordináta pár, ami az arrTest-ben benne van
// Ettől függően, ha van akkor igazat ad vissza, ha nincs akkor hamisat
function ArrayIsInArrayArray(arrayOriginal, arrTest) {
    let exit = false
    for (indexPairOfOriginal of arrayOriginal) {

        for (indexPairOfTest of arrTest) {


            if (indexPairOfOriginal[0] == indexPairOfTest[0] && indexPairOfOriginal[1] == indexPairOfTest[1]) {
                exit = true
                break
            }
        }
        if (exit) {
            break
        }
    }
    return exit
}


// Ez egy értelmetlen függvény: fog egy listák listáját és minden egyes listáját belerakja egy eredeti listába 
// A végeredmény egy listák listája (ezt meglehtne oldani valahogy elegánsabban de nem sikerült)
function BelePussolo(arrTemporary, arrOriginal) {
    for (i of arrTemporary) {
        arrOriginal.push(i)
    }
}


// Ez egy i hosszúságú kezdő indexpárú és végső indexpárű hajót tölt fel
//tehát a kezdő négyzettől a végső négyzetig feltölti a cellákat
function generateShipFromStartAndEnd(boatLength, startOfShipRow, startOfShipCol, endOfShipRow, endOfShipCol) {
    let boat = []
    if (startOfShipCol - endOfShipCol == 0) {
        if (startOfShipRow - endOfShipRow > 0) {
            for (let i = 0; i < boatLength; i++) {
                boat.push([endOfShipRow + i, endOfShipCol])
            }
        }
        else {
            for (let i = 0; i < boatLength; i++) {
                boat.push([startOfShipRow + i, endOfShipCol])
            }
        }
    }

    if (endOfShipRow - startOfShipRow == 0) {
        if (startOfShipCol - endOfShipCol > 0) {
            for (let i = 0; i < boatLength; i++) {
                boat.push([endOfShipRow, endOfShipCol + i])
            }
        }
        else {
            for (let i = 0; i < boatLength; i++) {
                boat.push([startOfShipRow, startOfShipCol + i])
            }
        }
    }
    return boat
}

// A legjobb: Ez legenerálja az egészet, szerintem lehetne rajta finomítani, hogy mindig más if sorrendekkel hajtsa végre
// Ez fog egy kezdő index párt, majd az adott hosszban, ahol lehetséges megadja a végső indexpárt is
// Ezek után feltölti a kettő közötti négyzeteket hajókkal 
// Majd leelenőrzi, hogy ezeket a négyzeteket használtuk-e már
// Ha igen, akkor ugyanúgy legenerálja 
// Ha nem, akkor hozzáfűzi az eredeti hajó listához
// Az if-ek változtásával elég sokat lehetne variálni, de azt nem tudtam megoldani
//Itt pl az order eredeti hajó listát paraméterként fogja kapni a függvény és a 9-es számokat is paraméterül fogja kapni,
// a tábla méretétől függően
// relatíve sok a ciklus, ezen lehetne javítani, de ez így eddig nem rossz kiindulás
// Az összes console.log()-ot ki lehet szedni, a debuggolas miatt volt bent

function generateBoat(boatLengthList) {
    // a végső hajó lista
    let boats = []
    // az order a legelején definiált gakorló listám
    for (let i = 0; i < boatLengthList.length; i++) {
        // a változókat létrehozom
        let temporaryBoat
        let stepIn = true
        let endOfShipCol
        let endOfShipRow
        let startOfShipRow
        let startOfShipCol
        let direction
        // Ameddig nincs megfelelő kezdő és vég indexpár addig folytatom a ciklust
        while (stepIn) {
            startOfShipRow = random(10)
            console.log(startOfShipRow)
            startOfShipCol = random(10)
            console.log(startOfShipCol)
            // itt az irányt randomizálom, ez is segíti, hogy randomabb legyen az if-ek meghívása
            direction = random(2)
            if (direction == 0) {
                // Minden egyes if-nél megvizsgálom, hogy melyik irányban lehet az adott hajót lerakni
                // Ha le lehet, akkor a végső cellát lerakom, majd kilépek, és a while ciklusbol is kiléptetem magam
                if (9 - startOfShipCol > order[i]) {
                    endOfShipCol = startOfShipCol + order[i]
                    endOfShipRow = startOfShipRow
                    stepIn = false
                    break
                }
                if (startOfShipCol > order[i]) {
                    endOfShipCol = startOfShipCol - order[i]
                    endOfShipRow = startOfShipRow
                    stepIn = false
                    break
                }
            }
            else {
                if (9 - startOfShipRow > order[i]) {
                    endOfShipRow = startOfShipRow + order[i]
                    endOfShipCol = startOfShipCol
                    stepIn = false
                    break
                }
                if (startOfShipRow > order[i]) {
                    endOfShipRow = startOfShipRow - order[i]
                    endOfShipCol = startOfShipCol
                    stepIn = false
                    break
                }
            }
        }
        console.log(startOfShipRow, startOfShipCol, endOfShipRow, endOfShipCol)
        // létrehozom a kezdő és végcella közötti cellákat, a hajók hosszának megfelelően
        temporaryBoat = generateShipFromStartAndEnd(boatLengthList[i], startOfShipRow, startOfShipCol, endOfShipRow, endOfShipCol)
        console.log(temporaryBoat)
        // itt azt vizsgálom, hogy az ideiglenes hajóm valakivel közös cellát foglal-e
        // Ha nem, akkor belerakom a végső listámba
        // Ha igen, akkor az egész for ciklust ujra futtatom, erre a hosszúságú hajóra
        // (ugye a for növelné az iterátort, de én abból levonok egyet akkor az megnövelve önmaga)
        if (ArrayIsInArrayArray(boats, temporaryBoat)) {
            i = i - 1
        }
        else {
            BelePussolo(temporaryBoat, boats)
            console.log(boats)
            console.log("hej")
        }
    }
    return boats
}



// Vége van a hajógenerálásnak
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////










function generateTable(row, col) {
    const table = document.createElement('table')

    for (let rowindex = 0; rowindex < row; rowindex++) {
        const tr = document.createElement('tr')
        for (let colindex = 0; colindex < col; colindex++) {
            const td = document.createElement('td')
            td.classList.add(`row${rowindex}`)
            td.classList.add(`col${colindex}`)
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    gamearea.appendChild(table)
}


function getCell(row, col) {
    return gamearea.querySelector(`.row${row}.col${col}`)
}


function rajzol(x, y, talalt) {

    if (talalt) {
        getCell(x, y).innerText = '💥'
    }

}

function lepesSzamlaloIr(szam) {
    const lepesek = gamearea.querySelector('#lepesSzamlalo')
    lepesek.innerText = szam
}
function talalatSzamlaloIr(szam) {
    const talalat = gamearea.querySelector('#talalatSzamlalo')
    talalat.innerText = szam
}

let indexPairs = [
    { row: 5, col: 7 },
    { row: 4, col: 8 }
]

function indexTarol(row, col) {
    indexPairs.push({ row: row, col: col })
}