"use babel"

const achievements = [
  {
    _id: "1",
    name: "Declaring a Variable",
    language: "JavaScript",
    description: "You declared your first variable in JavaScript!",
    points: 50,
    image: "quote",
    pattern: /const [a-zA-Z0-9_] =/
  }, {
    _id: "2",
    name: "Hello World!",
    language: "JavaScript",
    description: "You're on your way to becoming a JavaScript guru",
    points: 50,
    image: "octoface",
    pattern: /console\.log\((.*)\)/
  }, {
    _id: "3",
    name: "Callback Ninja",
    language: "JavaScript",
    description: "Callbacks let you handle asynchronous responses",
    points: 50,
    image: "octoface",
    pattern: /\((.*)\)(.*)=>(.*)\{(.*)\}\)/m
  }, {
    _id: "4",
    name: "Use Promises",
    language: "JavaScript",
    description: "Sometimes promises work even better than callbacks",
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
