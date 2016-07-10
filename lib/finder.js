"use babel"

const achievements = [
  {
    _id: "1",
    name: "Declaring a Variable",
    language: "JavaScript",
    description: "You declared your first variable in JavaScript!",
    points: 5,
    image: "quote",
    pattern: /const [a-zA-Z0-9_] =/
  }, {
    _id: "2",
    name: "Hello World!",
    language: "JavaScript",
    description: "You're on your way to becoming a JavaScript guru",
    points: 1,
    image: "octoface",
    pattern: /console\.log\((.*)\)/
  }, {
    _id: "3",
    name: "Callback Ninja",
    language: "JavaScript",
    description: "Callbacks let you handle asynchronous responses",
    points: 20,
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
  }, {
    _id: "5",
    name: "To Code or not to Code",
    language: "JavaScript",
    description: "You've used an IF statement",
    points: 10,
    image: "ruby",
    pattern: /if(.*)\((.*)\)(.*){/
  }, {
    _id: "6",
    name: "Sharing is Caring I",
    language: "JavaScript",
    description: "Exporting using module.exports",
    points: 15,
    image: "ruby",
    pattern: /module.exports = /
  }, {
    _id: "7",
    name: "Sharing is Caring II",
    language: "JavaScript",
    description: "Exporting CommonJS modules",
    points: 25,
    image: "ruby",
    pattern: /export const/
  }, {
    _id: "8",
    name: "Stay Classy",
    language: "JavaScript",
    description: "You've made your first class in JS",
    points: 10,
    image: "ruby",
    pattern: /class/
  }, {
    _id: "9",
    name: "Afunctionado I",
    language: "JavaScript",
    description: "You've used MAP! You're on your way to learning functional programming",
    points: 15,
    image: "ruby",
    pattern: /\.map\(/
  }, {
    _id: "10",
    name: "Afunctionado II",
    language: "JavaScript",
    description: "You've used REDUCE!",
    points: 15,
    image: "ruby",
    pattern: /\.reduce\(/
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
