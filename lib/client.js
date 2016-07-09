"use babel"

import { find } from "./finder"

const DO_ANALYSIS = true

export const call = (code) => {
  return new Promise((resolve, reject) => {
    if (!DO_ANALYSIS) {
      resolve([{
        title: "Hello World!",
        language: "JavaScript",
        description: "You're on your way to becoming a JavaScript guru",
        points: 50,
        image: "http://findicons.com/files/icons/2773/pictonic_free/512/prog_nodejs02.png"
      }])
    } else {
      resolve(find(code))
    }
  })
}
