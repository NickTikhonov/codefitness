'use babel'

import _ from "underscore-plus"
import { setIntervalX } from "./utils"

export const shake = () => {
  const editor = document.getElementsByTagName("atom-workspace")[0]
  const intensity = 1 + 2 * Math.random()
  const x = intensity * ((Math.random() > 0.5) ? -1: 1)
  const y = intensity * ((Math.random() > 0.5) ? -1: 1)
  editor.style.transform = `translate3d(${x}px, ${y}px, 0px)`

  setTimeout(() => {
    editor.style.transform = ""
  }, 75)
}

export const vibe = () => {
  setIntervalX(() => {
    shake()
  }, 80, 5)
}
