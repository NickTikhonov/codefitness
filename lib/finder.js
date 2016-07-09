"use babel"

const achievements = [
  {
    name: "Declaring a Variable",
    language: "JavaScript",
    description: "You declared your first variable in JavaScript!",
    points: 50,
    image: "quote",
    pattern: /const [a-zA-Z0-9_] =/
  }, {
    name: "Hello World!",
    language: "JavaScript",
    description: "You're on your way to becoming a JavaScript guru",
    points: 50,
    image: "octoface",
    pattern: /console\.log\((.*)\)/
  }, {
    name: "Use Promises",
    language: "JavaScript",
    description: "You used a promise, a sweet JavaScript feature",
    points: 50,
    image: "ruby",
    pattern: /new Promise\(/
  }
]

export const find = (text) => {
  const passed = achievements.filter((each) => {
    return each.pattern.test(text)
  })

  return {
    pendingAchievements: passed
  }
}
