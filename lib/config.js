"use babel"

const Configstore = require("configstore")
const conf = new Configstore("codefitness", {unlocked: []})

export const unlocked = (achievement) => {
  const stored = conf.get("unlocked").find((each) => {
    return each._id === achievement._id
  })

  if(stored) {
    return true
  } else {
    return false
  }
}

export const store = (achievement) => {
  if (!unlocked(achievement)) {
    all = conf.get("unlocked")
    all.push(achievement)
    conf.set("unlocked", all)
  }
}

export const clearStore = () => {
  conf.clear()
  conf.set("unlocked", [])
}
