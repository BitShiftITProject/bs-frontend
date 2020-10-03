let canvas = {
  widthRatio: 5,
  heightRatio: 7,
  borderRatio: 0.1,
  colour: { h: 0, s: 0, v: 1 },
  width: 0,
  height: 0
}

let backgroundSettings = {
  colour: { h: 0, s: 0.0, v: 0.9 }
}

let params = {
  numberOfLines: 150,
  lineSegments: 33,
  lineStepLength: 10,
  noiseScale: 300,
  strokeWeight: 3,
  hueStart: 165,
  hueEnd: 330,
  opacity: 0.5,
  animationSpeed: 180,
  showText: true
}

let drawingCommands = {
  redraw: function () {
    drawArt()
  },
  regenerate: function () {
    noiseSeed(random(0, 1000))
    drawArt()
  }
}

//! dat.GUI Code !//
let gui = new dat.GUI()

let backgroundFolder = gui.addFolder('Background')
backgroundFolder
  .addColor(backgroundSettings, 'colour')
  .name('Colour')
  .onChange(function () {
    drawArt()
  })

let canvasFolder = gui.addFolder('Canvas')
canvasFolder
  .add(canvas, 'widthRatio', 0.1, 20)
  .name('Width')
  .onChange(function () {
    drawArt()
  })
canvasFolder
  .add(canvas, 'heightRatio', 0.1, 20)
  .name('Height')
  .onChange(function () {
    drawArt()
  })
canvasFolder
  .add(canvas, 'borderRatio', 0, 1)
  .name('Border')
  .onChange(function () {
    drawArt()
  })
canvasFolder
  .addColor(canvas, 'colour')
  .name('Colour')
  .onChange(function () {
    drawArt()
  })

let paramsFolder = gui.addFolder('Parameters')
paramsFolder
  .add(params, 'numberOfLines', 1, 1000)
  .name('Lines')
  .onChange(function () {
    drawArt()
  })

paramsFolder
  .add(params, 'lineSegments', 1, 100)
  .name('Segments')
  .onChange(function () {
    drawArt()
  })
paramsFolder
  .add(params, 'lineStepLength', 1, 100)
  .name('Step Length')
  .onChange(function () {
    drawArt()
  })
paramsFolder
  .add(params, 'noiseScale', 1, 1000)
  .name('Noise Scale')
  .onChange(function () {
    drawArt()
  })
paramsFolder
  .add(params, 'strokeWeight', 0, 10)
  .name('Weight')
  .onChange(function () {
    drawArt()
  })
paramsFolder
  .add(params, 'hueStart', 0, 360, 1)
  .name('Hue Start')
  .onChange(function () {
    drawArt()
  })
paramsFolder
  .add(params, 'hueEnd', 0, 360, 1)
  .name('Hue End')
  .onChange(function () {
    drawArt()
  })
paramsFolder
  .add(params, 'opacity', 0, 1)
  .name('Opacity')
  .onChange(function () {
    drawArt()
  })

gui
  .add(params, 'showText')
  .name('Show Text')
  .onChange(function () {
    drawArt()
  })
gui
  .add(params, 'animationSpeed', 1, 600, 1)
  .name('Speed')
  .onChange(function () {
    drawArt()
  })
gui.add(drawingCommands, 'regenerate').name('Generate New')

function drawArt() {
  drawBackground()
  drawCanvas()
  drawText()
}

function draw() {
  drawArt()
}

function drawCanvas() {
  noStroke()
  fill(canvas.colour.h, canvas.colour.s, canvas.colour.v)

  updateCanvasHeightAndWidth()

  push()
  translate(windowWidth / 2, windowHeight / 2)
  rect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)

  let xStart = -canvas.width / 2
  let xEnd = xStart + canvas.width
  let yStart = -canvas.height / 2

  strokeWeight(params.strokeWeight)

  for (let i = 0; i < params.numberOfLines; i++) {
    stroke(lerp(params.hueStart, params.hueEnd, i / params.numberOfLines), 0.9, 0.7, params.opacity)

    let position = [xStart, yStart + (i / params.numberOfLines) * canvas.height]
    let nextPosition = []
    beginShape()
    vertex(position[0], position[1])
    noFill()
    params.lineStepLength = canvas.width / params.lineSegments
    for (let j = 0; j < params.lineSegments; j++) {
      let movementAngle = lerp(
        PI / 4,
        (PI * 3) / 4,
        noise(
          position[0] / params.noiseScale,
          position[1] / params.noiseScale,
          frameCount / params.animationSpeed
        )
      )
      nextPosition = [
        position[0] + params.lineStepLength * sin(movementAngle),
        position[1] + params.lineStepLength * cos(movementAngle)
      ]
      vertex(nextPosition[0], nextPosition[1])
      //line(position[0], position[1], nextPosition[0], nextPosition[1]);
      position = [nextPosition[0], nextPosition[1]]
    }
    endShape()
  }

  pop()
}

function updateCanvasHeightAndWidth() {
  if (canvas.widthRatio > canvas.heightRatio) {
    canvas.width = windowWidth - windowWidth * canvas.borderRatio
    canvas.height = (canvas.width * canvas.heightRatio) / canvas.widthRatio
    if (canvas.height > windowHeight - windowHeight * canvas.borderRatio) {
      canvas.height = windowHeight - windowHeight * canvas.borderRatio
      canvas.width = (canvas.height * canvas.widthRatio) / canvas.heightRatio
    }
  } else {
    canvas.height = windowHeight - windowHeight * canvas.borderRatio
    canvas.width = (canvas.height * canvas.widthRatio) / canvas.heightRatio
    if (canvas.width > windowWidth - windowWidth * canvas.borderRatio) {
      canvas.width = windowWidth - windowWidth * canvas.borderRatio
      canvas.height = (canvas.width * canvas.widthRatio) / canvas.heightRatio
    }
  }
}

function drawBackground() {
  background(backgroundSettings.colour.h, backgroundSettings.colour.s, backgroundSettings.colour.v)
}

//! P5JS Functions !//
function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB, 360, 1, 1, 1)
  frameRate(60)

  textSize(22)
  textAlign(CENTER)
  textStyle(BOLD)
  textFont('Courier New')

  strokeJoin(ROUND)

  drawArt()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  drawArt()
}

function drawText() {
  if (params.showText) {
    noStroke()

    fill(0)
    text('CURVES ON CANVAS', windowWidth / 2, windowHeight - 28)
  }
}

/*
function easeInOutQuad(x) {
  return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
}

function mirroredEaseInOutQuad(x) {
  if (x < 0.5){
    x += 0.5;
    let y = 1 - pow(-2 * x + 2, 2) / 2;
    return y - 0.5;
    
  } else {
    x -= 0.5;
    return 2 * x * x + 0.5;
  }
}*/
