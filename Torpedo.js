const gameArea = document.querySelector("#gameArea")

const gameData = {
    boats: [],
    matrix: [],
    nrows: 0,
    ncols: 0,
    indexPairs: [],
    maxtalalat: 0,
    maxlepes: 0,
    endGame: false,
    listOfBoatLength: []
}


//BENJÁMIN/Zsombor
/////////////////////////////////////////////////////////////////////////////////////
// Itt van az a lista, amelyen próbálkoztam, de a későbbiekben egy másik függvény csinálja ezt
function generateBoatLength(rowSize, colSize) {
    let NumOfCells = rowSize * colSize
    let listOfBoatLength = []
    if (NumOfCells >= 36) {
        let sum = 0
        console.log("hej")
        
        while (sum < (NumOfCells * 0.17)) {
            let number = random(4) + 2
            sum = sum + number
            listOfBoatLength.push(number)
        }
        listOfBoatLength.sort()
        listOfBoatLength.reverse()
    }
    if (NumOfCells < 36 && NumOfCells >= 16) {
        listOfBoatLength = [2, 2]

    }
    if (NumOfCells < 16 && NumOfCells >= 8) {
        listOfBoatLength = [1, 1]
    }
    if (NumOfCells < 8) {
        listOfBoatLength = [1]
    }
    
    return listOfBoatLength
}

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

function generateBoat() {
    // a végső hajó lista
    let boats = []
    // az order a legelején definiált gakorló listám
    for (let i = 0; i < gameData.listOfBoatLength.length; i++) {
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
                if ((gameData.ncols - 1) - startOfShipCol > gameData.listOfBoatLength[i]) {
                    endOfShipCol = startOfShipCol + gameData.listOfBoatLength[i]
                    endOfShipRow = startOfShipRow
                    stepIn = false
                    break
                }
                if (startOfShipCol > gameData.listOfBoatLength[i]) {
                    endOfShipCol = startOfShipCol - gameData.listOfBoatLength[i]
                    endOfShipRow = startOfShipRow
                    stepIn = false
                    break
                }
            }
            else {
                if ((gameData.nrows - 1) - startOfShipRow > gameData.listOfBoatLength[i]) {
                    endOfShipRow = startOfShipRow + gameData.listOfBoatLength[i]
                    endOfShipCol = startOfShipCol
                    stepIn = false
                    break
                }
                if (startOfShipRow > gameData.listOfBoatLength[i]) {
                    endOfShipRow = startOfShipRow - gameData.listOfBoatLength[i]
                    endOfShipCol = startOfShipCol
                    stepIn = false
                    break
                }
            }
        }
        console.log(startOfShipRow, startOfShipCol, endOfShipRow, endOfShipCol)
        // létrehozom a kezdő és végcella közötti cellákat, a hajók hosszának megfelelően
        temporaryBoat = generateShipFromStartAndEnd(gameData.listOfBoatLength[i], startOfShipRow, startOfShipCol, endOfShipRow, endOfShipCol)
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
//2. generál egy paraméterként megkapott méretű véletlenszerű mátrixot 
//(tömbök tömbje), amit feltölt hajókkal egy lista alapján
function generateMatrix(boats, nrows, ncols) {
    let matrix = []
    for (let i = 0; i < nrows; i++) {
        matrix[i] = []
        for (let j = 0; j < ncols; j++) {
            matrix[i][j] = 0
        }
    }

    for (const boat of boats) {
        matrix[boat[1]][boat[0]] = 1
        gameData.maxtalalat = gameData.maxtalalat + 1
    }
    return matrix
}

//3. megmondja, hogy egy mátrix adott helyén található-e hajó
function hitOrNot(matrix, guessX, guessY) {
    if (matrix[guessY][guessX] === 1) {
        return true
    } else {
        return false
    }
}

function newElem(element, parent) {
    const e = document.createElement(element)
    parent.appendChild(e)
    return e
}

//Kinézet!!
//kirajzol egy megadott méretű táblázatot az oldalra, aminek a cellái üresek (vagy például a kékek, mint a víz)
function generateGameArea(matrix) {

    //table, tr, th
    table = newElem("table", gameArea)
    let i = 0
    let j = 0
    for (const cols of matrix) {
        tr = newElem("tr", table)

        j = 0
        for (const rows of cols) {
            td = newElem("td", tr)
            td.classList.add(`row${i}`)
            td.classList.add(`col${j}`)
            j++
        }
        i++
    }
}

//ZSOMBOR

function getCell(row, col) {
    return gameArea.querySelector(`.row${row}.col${col}`)
}


function rajzol(x, y, talalt) {
    console.log(getCell(x, y))
    if (talalt) {
        getCell(x, y).innerText = '💥'
    }
    else {
        getCell(x, y).style.backgroundColor = "DarkCyan"
    }

}

function lepesSzamlaloIr(szam) {
    const lepesek = gameArea.querySelector('#lepesSzamlalo')
    lepesek.innerText = szam
}
function talalatSzamlaloIr(szam) {
    const talalat = gameArea.querySelector('#talalatSzamlalo')
    talalat.innerText = szam
}

//nem kinézet!!

function indexTarol(row, col) {
    gameData.indexPairs.push({ row: row, col: col })
}

//Virág

// eltárol egy kapott indexpárt egy listába.

/* function IndexparTarol(x, y) { //kövi lövések eltárolása
    lovesek[lovesek.length - 1] = { xtengely: x, ytengely: y }
    return lovesek
} */

// megmondja, hogy egy kapott indexpár benne van-e egy listában.

function indexparListabanE(x, y) { //nem értem itt mit nézünk
    let eredmeny = false
    for (const loves of gameData.indexPairs) {
        if (loves.row == x && loves.col == y) {
            eredmeny = true
            break
        }
        else {
            eredmeny = false
        }
    }
    return eredmeny
}

// növel egy lépésszámlálót, és ha az egy megadott értékhez ér, kiír egy üzenetet, hogy vége a játéknak (vereség)



function veresegCheck() {
    lepesszam += 1
    console.log("Nem sikerült eltalálnod a hajót")
    if (lepesszam == maxlepes) {
        console.log("A játéknak vége.")
        gameData.endGame = true
        return lepesszam
    }
    return lepesszam
}

// növel egy találatszámlálót, és ha az elért egy megadott értéket, kiír egy üzenetet, hogy vége a játéknak (győzelem)



function gyozelemCheck() { //minden új tippel nő a lépésszámláló
    talalatszam += 1
    console.log("Ügyes vagy, a világ legfosabb játékában eltalál egy hajót")
    if (talalatszam == maxtalalat) {
        console.log("A játéknak vége. Győzelem!")
        gameData.endGame = true
        return talalatszam
    }
    return talalatszam
}





function startGame(nrows, ncols, maxSteps) {
    //itt kene majd a bemenet eventlistenerrel
    gameData.nrows = nrows
    gameData.ncols = ncols
    gameData.maxlepes = maxSteps
    gameData.listOfBoatLength = generateBoatLength(nrows,ncols)
    gameData.boats = generateBoat()
    
    gameData.matrix = generateMatrix(gameData.boats, nrows, ncols)
    generateGameArea(gameData.matrix)

}
function tipp(guessRow, guessCol) {
    if (!gameData.endGame) {
        if (indexparListabanE(guessRow, guessCol)) {
            return "Ezt már tippelted gyökér"
        }
        else {
            indexTarol(guessRow, guessCol)
            let talalt = hitOrNot(gameData.matrix, guessRow, guessCol)
            console.log(guessCol)
            rajzol(guessRow, guessCol, talalt)
            if (talalt) {
                rajzol(guessRow, guessCol, talalt)
                talalatSzamlaloIr(gyozelemCheck())
            }
            else {
                lepesSzamlaloIr(veresegCheck())
            }

        }

    }
}
