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
    ACTIVE = d.id


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
let ACTIVE = -1 

function rectMoveStart(d) {
    //  Save off orig location data - later on this
    d.x2 = d.x
    d.y2 = d.y
    d.width2 = d.width
    d.height2 = d.height
    ACTIVE = d.id
}

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
    
    show() {
        console.log( JSON.stringify(data))
    }

    remove() {
        if ( data.length > 0 ) {
            const killed = data.pop()
            factory.render()
        }
    }
    test() {
        data = [{"id":0,"x":397.325863714925,"y":289.3064471837431,"width":265.04077446866876,"height":157.42689021860065,"x2":397.325863714925,"y2":289.3064471837431,"width2":106.23724699872507,"height2":75.40303155579356},{"id":1,"x":771.990689877467,"y":185.81302606981112,"width":121.83063630676082,"height":37.1594970733531,"x2":619.990689877467,"y2":87.81301844041658,"width2":121.83063630676082,"height2":37.1594970733531},{"id":2,"x":109.94862797023686,"y":324.9400673674784,"width":53.86475208853567,"height":62.21567001967418,"x2":68.94862797023686,"y2":395.9400673674784,"width2":53.86475208853567,"height2":62.21567001967418},{"id":3,"x":117.45279557376531,"y":190.02707827254102,"width":53.22282715953401,"height":60.146081552364265,"x2":117.45279557376531,"y2":202.02707827254102,"width2":53.22282715953401,"height2":60.146081552364265},{"id":4,"x":287.59357010277967,"y":167.56555973012289,"width":41.68229753755175,"height":44.577877420908536,"x2":287.59357010277967,"y2":167.56555973012289,"width2":41.68229753755175,"height2":44.577877420908536},{"id":5,"x":118.76914833880426,"y":82.56212047405415,"width":53.29777543321499,"height":81.65259010043911,"x2":114.76914833880426,"y2":118.56212047405415,"width2":53.29777543321499,"height2":81.65259010043911},{"id":6,"x":537.4588713497235,"y":66.28740544645568,"width":122.26128872309005,"height":113.1848991043268,"x2":511.4588713497235,"y2":86.28741307585021,"width2":122.26128872309005,"height2":113.1848991043268},{"id":7,"x":113.33370167033755,"y":265.3141507500985,"width":92.84839378844077,"height":56.19711780292057,"x2":128.33370167033755,"y2":288.3141507500985,"width2":92.84839378844077,"height2":56.19711780292057},{"id":8,"x":621.3216668079388,"y":351.87412749097143,"width":91.89003304690286,"height":87.91644021808044,"x2":372.3216973255168,"y2":291.87412749097143,"width2":91.89003304690286,"height2":87.91644021808044},{"id":9,"x":417.5199375050393,"y":434.8589364975349,"width":78.84535199197134,"height":24.574238559307688,"x2":335.5199375050393,"y2":397.8589364975349,"width2":78.84535199197134,"height2":24.574238559307688}]

        //data = [{"id":0,"x":397.325863714925,"y":289.3064471837431,"width":265.04077446866876,"height":157.42689021860065,"x2":397.325863714925,"y2":289.3064471837431,"width2":106.23724699872507,"height2":75.40303155579356},{"id":1,"x":771.990689877467,"y":185.81302606981112,"width":121.83063630676082,"height":37.1594970733531,"x2":619.990689877467,"y2":87.81301844041658,"width2":121.83063630676082,"height2":37.1594970733531},{"id":2,"x":109.94862797023686,"y":324.9400673674784,"width":53.86475208853567,"height":62.21567001967418,"x2":68.94862797023686,"y2":395.9400673674784,"width2":53.86475208853567,"height2":62.21567001967418},{"id":3,"x":117.45279557376531,"y":190.02707827254102,"width":53.22282715953401,"height":60.146081552364265,"x2":117.45279557376531,"y2":202.02707827254102,"width2":53.22282715953401,"height2":60.146081552364265},{"id":4,"x":287.59357010277967,"y":167.56555973012289,"width":41.68229753755175,"height":44.577877420908536,"x2":287.59357010277967,"y2":167.56555973012289,"width2":41.68229753755175,"height2":44.577877420908536},{"id":5,"x":118.76914833880426,"y":82.56212047405415,"width":53.29777543321499,"height":81.65259010043911,"x2":114.76914833880426,"y2":118.56212047405415,"width2":53.29777543321499,"height2":81.65259010043911},{"id":6,"x":537.4588713497235,"y":66.28740544645568,"width":122.26128872309005,"height":113.1848991043268,"x2":511.4588713497235,"y2":86.28741307585021,"width2":122.26128872309005,"height2":113.1848991043268},{"id":7,"x":113.33370167033755,"y":265.3141507500985,"width":92.84839378844077,"height":56.19711780292057,"x2":128.33370167033755,"y2":288.3141507500985,"width2":92.84839378844077,"height2":56.19711780292057},{"id":8,"x":621.3216668079388,"y":351.87412749097143,"width":91.89003304690286,"height":87.91644021808044,"x2":372.3216973255168,"y2":291.87412749097143,"width2":91.89003304690286,"height2":87.91644021808044},{"id":9,"x":417.5199375050393,"y":434.8589364975349,"width":78.84535199197134,"height":24.574238559307688,"x2":335.5199375050393,"y2":397.8589364975349,"width2":78.84535199197134,"height2":24.574238559307688}]
        factory.render()
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
                    doBehavior(d, 'newRects')
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
                let handles = d3.select(this)

                handles
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
                            doBehavior(d, 'topleft')

                        })
                    )

                handles
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
                            doBehavior(d, 'bottomright')
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




function isHigher(y1, y2) {
    return y1 < y2 
}
function isLower(y1, y2) {
    return y1 > y2 
}


function doBehavior(d, caller) {
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
    } else {
        snapLogic(d, 'doBehavior')
    }
}





function snapLogic(d, caller) {
    const y1 = d.y
    const x1 = d.x
    const y2 = d.y + d.height
    const x2 = d.x + d.width
    data.forEach((box, i ) => {
        let n = false 
        let s = false
        let e = false
        let w = false 
    
        if ( box.id !== d.id ) {
            const _y1 = box.y
            const _x1 = box.x
            const _y2 = box.y + box.height
            const _x2 = box.x + box.width
            
            // RIGHT 
            if ( x1 > _x1 && x1 < _x2 ) {
                w = true 
            } 
            // LEFT
            if ( x1 < _x1 && x2 < _x2 && x2 > x1  ) {
                e = true 
            } 
            // ABOVE 
            if ( isHigher(y1,_y1) && isHigher(y2, _y2 ) && isLower(y2, _y1) && isHigher(y2, _y2)) {
                n = true 
            } 
            // BELOW 
            if ( isLower(y1,_y1) && isHigher(y1, _y2 ) && isLower(y2, _y2))  {
                s = true 
            }

            if ( w === true && n === true ) {
                d.height = box.y - d.y
            }
            if ( w === true && s === true ) {
                const num = box.y + box.height
                const delta = d.y - num
                d.y = num
                d.height += delta
            }
            if ( e === true && n === true ) {
                d.height = box.y - d.y
            }

            if ( e === true && s === true ) {
                const num = box.y + box.height
                const delta = d.y - num
                d.y = num
                d.height += delta
            }
        }
    })
    factory.render()
}


// /////////////////// 
const svg = d3.select("svg")
let chart = svg.append("g")
let factory = new Factory(svg)
factory.render()
