/*
function range(n){
    let t = []
    for(let i = 0; i < n; i++){
        t.push(i)
    }
    return t
}
for(const hindex of range(h)){
    
}
*/

const gamearea = document.querySelector('#gamearea')

const gamedata = {
    endOfGame: true,
    spaceship: 0,
    asteroids: [
        {
            w: 2,
            h: 3
        },
        {
            w: 5,
            h: 7
        }
    ],
    maxw: 0,
    maxh: 0
}

function gameStart(w, h){
    gamedata.endOfGame = false
    gamedata.maxw = w
    gamedata.maxh = h
    gamedata.spaceship = Math.floor(w/2)
    generateGameTable(w, h)
    drawSpaceship(gamedata.spaceship)
}

function gameStep(){
    stepAsteroids()
    if(checkDeath()){
        drawBoom(gamedata.spaceship)
        gamedata.endOfGame = true
    }
}

function checkDeath(){
    return gamedata.asteroids.some(a => a.h == 0 && a.w == gamedata.spaceship)
}

function moveShipRight(){
    if(gamedata.spaceship == gamedata.maxw - 1) return

    clearCell(gamedata.spaceship, 0)
    gamedata.spaceship++
    drawSpaceship(gamedata.spaceship)
}

function moveShipLeft(){
    if(gamedata.spaceship == 0) return

    clearCell(gamedata.spaceship, 0)
    gamedata.spaceship--
    drawSpaceship(gamedata.spaceship)
}

function stepAsteroids(){
    for(const asteroid of gamedata.asteroids){
        clearCell(asteroid.w, asteroid.h)
        asteroid.h--
        if(asteroid.h > -1) drawAsteroid(asteroid.w, asteroid.h)
    }
    gamedata.asteroids = gamedata.asteroids.filter(asteroid => asteroid.h > -1)
    //gamedata.asteroids.forEach(asteroid => {clearCell(asteroid.w, asteroid.h)})
}

////////////////////////////////////////////
//esemény

document.addEventListener('keydown', event => {
    if(gamedata.endOfGame) return
    if(event.key == 'ArrowRight') moveShipRight()
    if(event.key == 'ArrowLeft') moveShipLeft()
})

////////////////////////////////////////////
//nézet

function getCell(w, h){
    return gamearea.querySelector(`.row${h}.col${w}`)
}

function clearCell(w, h){
    getCell(w, h).innerText = ''
}

function drawSpaceship(w, h = 0){
    getCell(w, h).innerText = '👾'
}

function drawBoom(w, h = 0){
    getCell(w, h).innerText = '💥'
}

function drawAsteroid(w, h){
    getCell(w, h).innerText = '🍪'
}

function generateGameTable(w, h){
    const table = document.createElement('table')

    for(let hindex = 0; hindex < h; hindex++){
        const tr = document.createElement('tr')
        for(let windex = 0; windex < w; windex++){
            const td = document.createElement('td')
            td.classList.add(`row${hindex}`)
            td.classList.add(`col${windex}`)
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    gamearea.appendChild(table)
}