const WIDTH = 1001
const HEIGHT = 702 
const MAP_HEIGHT = HEIGHT + HEIGHT // twice!
const MAP_WIDTH = WIDTH + WIDTH // twice
const MAX_TRANSLATE_X = WIDTH
const MIN_TRANSLATE_X = 0
const MAX_TRANSLATE_Y = HEIGHT
const MIN_TRANSLATE_Y = 0
const MIN_RECT_WIDTH = 100
const MIN_RECT_HEIGHT = 20
const HANDLE_R_INACTIVE = 6
const HANDLE_R_ACTIVE = 12
let data = [
        {
          "id": 0,
          "x": 328.325863714925,
          "y": 227.30644718374307,
          "width": 106.23724699872507,
          "height": 75.40303155579356,
          "x2": 328.325863714925,
          "y2": 227.30644718374307,
          "width2": 106.23724699872507,
          "height2": 75.40303155579356

        },
        {
          "id": 1,
          "x": 619.990689877467,
          "y": 87.81301844041658,
          "width": 121.83063630676082,
          "height": 37.1594970733531,
          "x2": 619.990689877467,
          "y2": 87.81301844041658,
          "width2": 121.83063630676082,
          "height2": 37.1594970733531
        },
        {
          "id": 2,
          "x": 68.94862797023686,
          "y": 395.9400673674784,
          "width": 53.86475208853567,
          "height": 62.21567001967418,
          "x2": 68.94862797023686,
          "y2": 395.9400673674784,
          "width2": 53.86475208853567,
          "height2": 62.21567001967418
        },
      ]
/*
*/


function resizerHover() {
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

function rectResizeStartEnd(d) {

    //  Save off orig location data - later on this
    d.x2 = d.x
    d.y2 = d.y
    d.width2 = d.width
    d.height2 = d.height


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

function pretty(d) {

    let out = 'id: ' + d.id
    out += ' x: ' + d.x.toFixed(0)
    out += ' y: ' + d.y.toFixed(0)
    out += ' w: ' + d.width.toFixed(0)
    out += ' h: ' + d.height.toFixed(0)
    try {
        // might not exist yet 
        out += "\t\t| orig -> "
        out += ' x2: ' + d.x2.toFixed(0)
        out += ' y2: ' + d.y2.toFixed(0)
        out += ' w2: ' + d.width2.toFixed(0)
        out += ' h2: ' + d.height2.toFixed(0)
    
    } catch ( ignore) {}
    return out

}

function rectMoveStart(d) {
    //  Save off orig location data - later on this
    d.x2 = d.x
    d.y2 = d.y
    d.width2 = d.width
    d.height2 = d.height
    console.log('start ' + JSON.stringify( d , null, 2 ))
}
/*
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
*/


function bisectNorthSouth(boxes, item) {
    // target x1 and x2
    const tX1 = item.x
    const tX2 = this.relativeXtoAbsX(item)
    // collect them up
    let hits = {}
    // roll through and look
    boxes.forEach((box) => {
        if (item.id !== box.id) {
            const x1 = box.x
            const x2 = this.relativeXtoAbsX(box)

            if ((x1 > tX1) && (x2 > tX1)) {
                // Too far to the left
                // console.log( 'ns _LEFT\t', x1, '\ttX1\t', tX1, ' x2\t', x2, ' tX2\t', tX2, box.label ) 

            } else if ((x1 < tX2) && (x2 < tX2)) {
                // console.log( 'ns RIGHT\t', x1, '\ttX1\t', tX1, ' x2\t', x2, ' tX2\t', tX2, box.label ) 
                // Too far to the right 
            } else {
                // console.log( 'ns ___OK\t', x1, '\ttX1\t', tX1, ' x2\t', x2, ' tX2\t', tX2, box.label ) 
                hits[box.id] = box.label
            }
        }
    })
    // return [] of the ids of the boxes 
    return Object.keys(hits)
}


function bisectEastWest(boxes, item) {
    // target y1 and y2
    const tY1 = item.y
    const tY2 = this.relativeYtoAbsY(item)
    // collect them up
    let hits = {}
    // roll through and look
    boxes.forEach((box) => {
        if (item.id !== box.id) {
            const y1 = box.y
            const y2 = this.relativeYtoAbsY(box)

            if ((y1 < tY1) && (y2 < tY1)) {
                // console.log( 'ew ABOVE\t', y1, '\ttY1\t', tY1, ' y2\t', y2, ' tY2\t', tY2, box.label ) 
            } else if ((y1 > tY2) && (y2 > tY2)) {
                // console.log( 'ew UNDER\t', y1, '\ttY1\t', tY1, ' y2\t', y2, ' tY2\t', tY2, box.label ) 
            } else {
                // console.log( 'ew ___OK\t', y1, '\ttY1\t', tY1, ' y2\t', y2, ' tY2\t', tY2, box.label ) 
                hits[box.id] = box.label
            }
        }
    })
    // return [] of the ids of the boxes 
    return Object.keys(hits)
}

/////// /////////// //////// 

class Factory {
    constructor() {
    
        // // set the background - not _needed_ but maybe they will
        // // want to set 'current moneys'
        // chart.append("rect")
        // .style("fill", "red")
        // .attr("width", MAP_WIDTH)
        // .attr("y", HEIGHT - 300)
        // .attr("height", HEIGHT - 300)


    }
    

    add() {
        const id = data.length
        const x = Math.random() * (WIDTH - 300)
        const y = Math.random() * (HEIGHT - 300)
        const width = 40 + (Math.random() * 100)
        const height = 20 + (Math.random() * 100)
        data.push({
            id,
            x,
            y,
            width,
            height,
            x2: x,
            y2: y,
            width2: width,
            height2: height
        })
        factory.render()
    }
    
    remove() {
        if ( data.length > 0 ) {
            const killed = data.pop()
            factory.render()
        }
    }

    render() {
    


        let rects = chart
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
                .container(chart.node())
                .on("start", rectMoveStart)
                .on("drag", rectMoving)
                .on("end", (d) => {
                    sayHi(d, 'newRects')
                })
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
                        .container(chart.node())
                        .subject(function() {
                            return {
                                x: d3.event.x,
                                y: d3.event.y
                            }
                        })
                        .on("start end", rectResizeStartEnd)
                        .on("drag", rectResizing)
                        .on("end", (d) => {
                        
                            console.log( 'circleG ! caller=' )
                            sayHi(d)
                        })
                    )

                circleG
                    .append("circle")
                    .classed("bottomright", true)
                    .attr("r", HANDLE_R_INACTIVE)
                    .on("mouseenter mouseleave", bottomHover)
                    .call(d3.drag()
                        .container(chart.node())
                        .subject(function() {
                            return {
                                x: d3.event.x,
                                y: d3.event.y
                            }
                        })
                        .on("start end", rectResizeStartEnd)
                        .on("drag", rectResizing)
                        .on("end", (d) => {
                            sayHi(d, 'circle handle 298')
                        })
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

const svg = d3.select("svg")
let chart = svg.append("g")
let factory = new Factory(svg)
factory.render()

function sayHi(d, caller) {
    // The handles are inner objects, so they don't have great access to 'this'
    // Therefore they reach out of the entire tower object graph into this function
    //
    // QED: It is acting like a static method 
    //
    // step1: See if no pacman AND no overlap
    // leave it where the human put it
    // step2: See if it pacmans any other box 
    // - snap back
    // step3: See if it overlaps 
    // - snap to nearest good spot
        
    let box = undefined
    data.forEach((info, i) => {
        if ( info.id === d.id) {
            box = data[i]
        }
    })
    let snapback = false
    let snapto = false
    data.forEach((item) => {
        // need snapback because pacman?
        if ( box.x < item.x && ( box.x + box.width ) > ( item.x + item.width )) {
            if ( box.y < item.y && ( box.y + box.height ) > ( item.y + item.height )) {
                snapback = true 
            }
        }
        // need snapto because overlap?
        if ( item.x <= box.x && box.x <= item.x + this.width &&
                item.y <= box.y && box.y <= item.y + item.height ) {

                }

    


    })

    if ( snapback === true ) {
        d.x = d.x2
        d.y = d.y2
        d.width = d.width2 
        d.height = d.height2 
        factory.render() 
    }
}

function rectMoving(d) {
    // The handles are inner objects, so they don't have great access to 'this'
    // Therefore they reach out of the entire tower object graph into this function
    //
    // QED: It is acting like a static method 

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



