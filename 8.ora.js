function delegate(parent, child, when, what){
    function eventHandlerFunction(event){
        let eventTarget  = event.target;
        let eventHandler = this;
        let closestChild = eventTarget.closest(child);

        if(eventHandler.contains(closestChild)){
            what(event, closestChild);
        }
    }

    parent.addEventListener(when, eventHandlerFunction);
}

const canvas = document.querySelector('canvas')
const brush  = canvas.getContext('2d')
brush.lineJoin = 'round'

function transformX(x){
    return x - canvas.getBoundingClientRect().x
}

function transformY(y){
    return y - canvas.getBoundingClientRect().y
}

const brushInfo = {
    prev: {
        x: 0,
        y: 0
    },
    current: {
        x: 0,
        y: 0
    },
    pressure: false
}

canvas.addEventListener('mousedown', event => {
    brushInfo.pressure = true
})
canvas.addEventListener('mouseup', event => {
    brushInfo.pressure = false
})
canvas.addEventListener('mouseleave', event => {
    brushInfo.pressure = false
})

canvas.addEventListener('mousemove', event => {
    //console.log(transformX(event.clientX), transformY(event.clientY))
    
    brushInfo.current.x = transformX(event.clientX),
    brushInfo.current.y = transformY(event.clientY)

    if(brushInfo.pressure){
        brush.beginPath()
        brush.moveTo(brushInfo.prev.x, brushInfo.prev.y)
        brush.lineTo(brushInfo.current.x, brushInfo.current.y)
        brush.closePath()
        brush.stroke()
    }

    brushInfo.prev.x = transformX(event.clientX)
    brushInfo.prev.y = transformY(event.clientY)
})

const colors = document.querySelector('#colors')
function setColor(event, elem){
    colors.querySelector('.selected').classList.remove('selected')
    elem.classList.add('selected')
    brush.strokeStyle = elem.dataset.color
}
delegate(colors, 'td', 'click', setColor)

const widths = document.querySelector('#widths')
function setWidth(event, elem){
    widths.querySelector('.selected').classList.remove('selected')
    elem.classList.add('selected')
    brush.lineWidth = elem.dataset.width
}
delegate(widths, 'td', 'click', setWidth)