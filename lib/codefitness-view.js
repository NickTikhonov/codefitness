'use babel';

export default class CodefitnessView {

  constructor(serializedState) {
    this.canvas = this.setupCanvas()
  }

  serialize() {}

  destroy() {
    this.canvas.remove()
  }

  getElement() {
    return this.canvas
  }

  setupCanvas () {
    canvas = document.createElement("canvas")
    canvas.classList.add("canvas-overlay")
    document.getElementsByTagName("atom-workspace")[0].appendChild(canvas)
    canvas = document.getElementsByClassName("canvas-overlay")[0]
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    return canvas
  }
}
