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
          "height": 75.40303155579356
        },
        {
          "id": 1,
          "x": 619.990689877467,
          "y": 87.81301844041658,
          "width": 121.83063630676082,
          "height": 37.1594970733531
        },
        {
          "id": 2,
          "x": 68.94862797023686,
          "y": 395.9400673674784,
          "width": 53.86475208853567,
          "height": 62.21567001967418
        },
        {
          "id": 3,
          "x": 429.46618327338905,
          "y": 8.006352657135043,
          "width": 70.44597197287858,
          "height": 52.026350775294624
        },
        {
          "id": 4,
          "x": 550.5441265621055,
          "y": 160.19025129696217,
          "width": 111.38693994736497,
          "height": 105.76879925873662
        }
      ]
/*
*/


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
    constructor() {
    
        // set the background - not _needed_ but Lockton will
        // likely want to set 'current moneys'
        chart.append("rect")
        .style("fill", "red")
        .attr("width", MAP_WIDTH)
        .attr("y", HEIGHT - 300)
        .attr("height", HEIGHT - 300)


    }

    add() {
        data.push({
            id: data.length,
            x: Math.random() * (WIDTH - 300),
            y: Math.random() * (HEIGHT - 300),
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
                        .container(chart.node())
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
                        .container(chart.node())
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

/*

const g = svg.append("g")
g.append("rect")
    .style("fill", "white")
    .attr("x", MIN_TRANSLATE_X)
    .attr("y", MIN_TRANSLATE_Y)
    .attr("width", MAP_WIDTH)
    .attr("height", MAP_HEIGHT)
*/ 

const svg = d3.select("svg")
let chart = svg.append("g")

let factory = new Factory(svg)

factory.render()