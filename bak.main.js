const MAP_HEIGHT = 702 * 2
const MAP_WIDTH = 1001 * 2 // MAP_HEIGHT * Math.sqrt(2)
const MAX_TRANSLATE_X = MAP_WIDTH / 2
const MIN_TRANSLATE_X = 0
const MAX_TRANSLATE_Y = MAP_HEIGHT / 2
const MIN_TRANSLATE_Y = 0
const MIN_RECT_WIDTH = 100
const MIN_RECT_HEIGHT = 20
const HANDLE_R_INACTIVE = 6
const HANDLE_R_ACTIVE = 12
let data = []
/*
let data = [{
        id: 1,
        x: 100 + (Math.random() * 300),
        y: 100 + (Math.random() * 300),
        width: 50 + (Math.random() * 100),
        height: 50 + (Math.random() * 100)
    },
    {
        id: 2,
        x: 100 + (Math.random() * 300),
        y: 100 + (Math.random() * 300),
        width: 50 + (Math.random() * 100),
        height: 50 + (Math.random() * 100)
    },
    {
        id: 3,
        x: 100 + (Math.random() * 300),
        y: 100 + (Math.random() * 300),
        width: 50 + (Math.random() * 100),
        height: 50 + (Math.random() * 100)
    }
]
*/

const height = 702
const width = 1001
const svg = d3.select("svg")
const g = svg.append("g")
g.append("rect")
    .style("fill", "white")
    .attr("x", MIN_TRANSLATE_X)
    .attr("y", MIN_TRANSLATE_Y)
    .attr("width", MAP_WIDTH)
    .attr("height", MAP_HEIGHT)



function resizerHover() {
    console.log(' old ')
    let el = d3.select(this),
        isEntering = d3.event.type === "mouseenter"
    el
        .classed("hovering", isEntering)
        .attr(
            "r",
            isEntering || el.classed("resizing") ?
            HANDLE_R_ACTIVE : HANDLE_R_INACTIVE
        )
}


function topHover() {
    console.log(' top ')
    let el = d3.select(this),
        isEntering = d3.event.type === "mouseenter"
    el
        .classed("hovering", isEntering)
        .attr(
            "r",
            isEntering || el.classed("resizing") ?
            HANDLE_R_ACTIVE : HANDLE_R_INACTIVE
        )
}

function bottomHover() {
    console.log(' top ')
    let el = d3.select(this),
        isEntering = d3.event.type === "mouseenter"
    el
        .classed("hovering", isEntering)
        .attr(
            "r",
            isEntering || el.classed("resizing") ?
            HANDLE_R_ACTIVE : HANDLE_R_INACTIVE
        )
}

function rectResizeStartEnd() {
    let el = d3.select(this),
        isStarting = d3.event.type === "start"
    d3.select(this)
        .classed("resizing", isStarting)
        .attr(
            "r",
            isStarting || el.classed("hovering") ?
            HANDLE_R_ACTIVE : HANDLE_R_INACTIVE
        )
}

function rectResizing(d) {

    let dragX = Math.max(
        Math.min(d3.event.x, MAX_TRANSLATE_X),
        MIN_TRANSLATE_X
    )

    let dragY = Math.max(
        Math.min(d3.event.y, MAX_TRANSLATE_Y),
        MIN_TRANSLATE_Y
    )

    if (d3.select(this).classed("topleft")) {

        let newWidth = Math.max(d.width + d.x - dragX, MIN_RECT_WIDTH)

        d.x += d.width - newWidth
        d.width = newWidth

        let newHeight = Math.max(d.height + d.y - dragY, MIN_RECT_HEIGHT)

        d.y += d.height - newHeight
        d.height = newHeight

    } else {

        d.width = Math.max(dragX - d.x, MIN_RECT_WIDTH)
        d.height = Math.max(dragY - d.y, MIN_RECT_HEIGHT)

    }

    factory.render()
}

function rectMoveStartEnd(d) {
    console.log(' old ')
    d3.select(this).classed("moving", d3.event.type === "start")
}

function rectMoving(d) {

    let dragX = Math.max(
        Math.min(d3.event.x, MAX_TRANSLATE_X - d.width),
        MIN_TRANSLATE_X
    )

    let dragY = Math.max(
        Math.min(d3.event.y, MAX_TRANSLATE_Y - d.height),
        MIN_TRANSLATE_Y
    )

    d.x = dragX
    d.y = dragY

    factory.render()
}

/////// /////////// //////// 

class Factory {

    add() {
        data.push({
            id: data.length,
            x: Math.random() * (width - 300),
            y: Math.random() * (height - 300),
            width: 40 + Math.random() * 100,
            height: 20 + Math.random() * 100
        })
        factory.render()
    }
    
    remove() {
        if ( data.length > 0 ) {
            const killed = data.pop()
            console.log('killed ' + killed)
            factory.render()
        }
    }
    

    render() {
        let rects = g
            .selectAll("g.rectangle")
            .data(data, function(d) {
                return d
            })

        rects.exit().remove()

        let newRects =
            rects.enter()
            .append("g")
            .classed("rectangle", true)

        newRects
            .append("rect")
            .classed("bg", true)
            .attr("fill", "#ff6633")
            .attr("opaque", 0.3)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .call(d3.drag()
                .container(g.node())
                .on("start end", (d) => {
                    console.log('start end! ')
                })
                .on("drag", rectMoving)
            )

        newRects.append("text")
            .text(function(d) {
                return d.id
            })
            .attr("transform", function(d, i) {
                return "translate(" + [10, 30] + ")"
            })

        newRects.append("text")
            .text(function(d) {
                return d.x.toFixed(0)
            })
            .attr("transform", function(d, i) {
                return "translate(" + [10, 44] + ")"
            })

        newRects
            .append("g")
            .classed("circles", true)
            .each(function(d) {
                let circleG = d3.select(this)

                circleG
                    .append("circle")
                    .classed("topleft", true)
                    .attr("r", HANDLE_R_INACTIVE)
                    .on("mouseenter mouseleave", topHover)
                    .call(d3.drag()
                        .container(g.node())
                        .subject(function() {
                            return {
                                x: d3.event.x,
                                y: d3.event.y
                            }
                        })
                        .on("start end", rectResizeStartEnd)
                        .on("drag", rectResizing)
                    )

                circleG
                    .append("circle")
                    .classed("bottomright", true)
                    .attr("r", HANDLE_R_INACTIVE)
                    .on("mouseenter mouseleave", bottomHover)
                    .call(d3.drag()
                        .container(g.node())
                        .subject(function() {
                            return {
                                x: d3.event.x,
                                y: d3.event.y
                            }
                        })
                        .on("start end", rectResizeStartEnd)
                        .on("drag", rectResizing)
                    )
            })

        let allRects = newRects.merge(rects)

        allRects
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")"
            })

        allRects
            .select("rect.bg")
            .attr("height", function(d) {
                return d.height
            })
            .attr("width", function(d) {
                return d.width
            })

        allRects
            .select("circle.bottomright")
            .attr("cx", function(d) {
                return d.width
            })
            .attr("cy", function(d) {
                return d.height
            })

    }
}
let factory = new Factory()
factory.render()
