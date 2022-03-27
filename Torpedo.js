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
    listOfBoatLength: [],
    talalatszam: 0,
    lepesszam: 0
}


//BENJÁMIN/Zsombor
/////////////////////////////////////////////////////////////////////////////////////
function generateBoatLength(rowSize, colSize) {
    let NumOfCells = rowSize * colSize
    let listOfBoatLength = []
    if (NumOfCells >= 36) {
        let sum = 0
        
        
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


// A függvény fog egy listák listáját és minden egyes listáját belerakja egy eredeti listába 
// A végeredmény egy listák listája
function BelePussolo(arrTemporary, arrOriginal) {
    for (i of arrTemporary) {
        arrOriginal.push(i)
    }
}


// Ez egy i hosszúságú kezdő indexpárú és végső indexpárú hajót tölt fel
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
            startOfShipRow = random(gameData.nrows)
            
            startOfShipCol = random(gameData.ncols)
            
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
        
        // létrehozom a kezdő és végcella közötti cellákat, a hajók hosszának megfelelően
        temporaryBoat = generateShipFromStartAndEnd(gameData.listOfBoatLength[i], startOfShipRow, startOfShipCol, endOfShipRow, endOfShipCol)
        
        // itt azt vizsgálom, hogy az ideiglenes hajóm valakivel közös cellát foglal-e
        // Ha nem, akkor belerakom a végső listámba
        // Ha igen, akkor az egész for ciklust ujra futtatom, erre a hosszúságú hajóra
        // (ugye a for növelné az iterátort, de én abból levonok egyet akkor az megnövelve önmaga)
        if (ArrayIsInArrayArray(boats, temporaryBoat)) {
            i = i - 1
        }
        else {
            BelePussolo(temporaryBoat, boats)
            
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

// eltárol egy kapott indexpárt egy listába.
function indexTarol(row, col) {
    gameData.indexPairs.push({ row: row, col: col })
}


function tipp(guessRow, guessCol) {
    if (!gameData.endGame) {
        if (indexparListabanE(guessRow, guessCol)) {
            return "Ezt már tippelted"
        }
        else {
            indexTarol(guessRow, guessCol)
            let talalt = hitOrNot(gameData.matrix, guessRow, guessCol)
            
            rajzol(guessRow, guessCol, talalt)
            if (talalt) {
                
                talalatSzamlaloIr(gyozelemCheck())
                //lepesSzamlaloIr(veresegCheck())
                console.log("Eltaláltál egy hajót.")
            }
            else {
                lepesSzamlaloIr(veresegCheck())
                console.log("Nem talált.")
            }

        }

    }
}




//Virág
// megmondja, hogy egy kapott indexpár benne van-e egy listában.

function indexparListabanE(x, y) {
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

function lepesSzamlalo(){
    gameData.lepesszam++
}
function veresegCheck() {
    lepesSzamlalo()
    if (gameData.lepesszam == gameData.maxlepes) {
        console.log("A játéknak vége.")
        alert("Sajnos elérted a max tippelési lehetőséget, így vesztettél, StartGame() függvény segítségével újrakezdheted a játékot")
        gameData.endGame = true
        
    }
    return gameData.lepesszam
}


// növel egy találatszámlálót, és ha az elért egy megadott értéket, kiír egy üzenetet, hogy vége a játéknak (győzelem)

function talalatSzamlalo(){
    gameData.talalatszam++
}
function gyozelemCheck() {
    talalatSzamlalo()
    if ( gameData.talalatszam == gameData.maxtalalat) {
        console.log("A játéknak vége. Győzelem!")
        alert("Győztél, a játéknak vége! StartGame() paranccsal újrakezdheted")
        gameData.endGame = true
        
    }
    return  gameData.talalatszam
}

//kirajzolgatom a szamlalokat
function SzamlalokKiiras(){
    const talalinfo = document.createElement('div')
    talalinfo.innerText = "Találatok:"
    gameArea.appendChild(talalinfo)
    talalinfo.style.fontFamily = "'Courier New', Courier, monospace"
    const talalat = document.createElement('div')
    gameArea.appendChild(talalat)
    talalat.classList.add('talal')
    talalat.innerText = 0
    talalat.style.border = "1px solid black"
    talalat.style.width = "80px"
    talalat.style.height = "50px"
    talalat.style.textAlign = "center"
    talalat.style.fontSize = "45px"
    talalat.style.fontFamily = "'Courier New', Courier, monospace"
    const lepesinfo = document.createElement('div')
    lepesinfo.innerText = "Lépések:"
    gameArea.appendChild(lepesinfo)
    lepesinfo.style.fontFamily = "'Courier New', Courier, monospace"
    const lepesek = document.createElement('div')
    gameArea.appendChild(lepesek)
    lepesek.classList.add('lep')
    lepesek.innerText = 0
    lepesek.style.border = "1px solid black"
    lepesek.style.width = "80px"
    lepesek.style.height = "50px"
    lepesek.style.textAlign = "center"
    lepesek.style.fontSize = "45px"
    lepesek.style.fontFamily = "'Courier New', Courier, monospace"
}

function lepesSzamlaloIr(szam) {
    const lepesek = gameArea.querySelector(`.lep`)
    lepesek.innerText = szam
}

function talalatSzamlaloIr(szam) {
    const talalat = gameArea.querySelector(`.talal`)
    talalat.innerText = szam
}

function resetGame() {
    gameArea.innerHTML=''
    gameData.endGame = false
    gameData.lepesszam = 0
    gameData.talalatszam = 0
}

function startGame(nrows, ncols, maxSteps) {
    resetGame()
    //itt kene majd a bemenet eventlistenerrel
    gameData.nrows = nrows
    gameData.ncols = ncols
    gameData.maxlepes = maxSteps
    gameData.listOfBoatLength = generateBoatLength(nrows,ncols)
    gameData.boats = generateBoat()
    
    gameData.matrix = generateMatrix(gameData.boats, nrows, ncols)
    generateGameArea(gameData.matrix)
    SzamlalokKiiras()

}