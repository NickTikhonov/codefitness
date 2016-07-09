"use babel"

const achievements = [
  {
    title: "Declaring a Variable",
    language: "JavaScript",
    description: "Wow, you're doing so well",
    points: 50,
    image: "http://findicons.com/files/icons/2773/pictonic_free/512/prog_nodejs02.png",
    pattern: /const [a-zA-Z0-9_] =/
  }, {
    title: "Hello World!",
    language: "JavaScript",
    description: "You're on your way to becoming a JavaScript guru",
    points: 50,
    image: "http://findicons.com/files/icons/2773/pictonic_free/512/prog_nodejs02.png",
    pattern: /console\.log\("[a-zA-Z0-9 ]*"\)/
  }, {
    title: "Balls!",
    language: "JavaScript",
    description: "You wrote balls",
    points: 50,
    image: "http://findicons.com/files/icons/2773/pictonic_free/512/prog_nodejs02.png",
    pattern: /balls/
  }
]

export const find = (text) => {
  const passed = achievements.filter((each) => {
    return each.pattern.test(text)
  })

  return passed
}
