'use babel';

import { CompositeDisposable } from 'atom'
import _ from "underscore-plus"

import CodefitnessView from './codefitness-view'
import { call } from './client'
import { vibe, animate } from './effects'
import { unlocked, store, clearStore } from './config'

export default {

  codefitnessView: null,
  modalPanel: null,
  subscriptions: null,
  editor: null,
  canvas: null,
  canvasContext: null,
  particles:[],

  activate(state) {
    this.codefitnessView = new CodefitnessView(state.codefitnessViewState);
    this.editor = atom.workspace.getActiveTextEditor()

    this.canvas = this.codefitnessView.getElement()
    this.canvasContext = canvas.getContext("2d")
    this.canvasContext.fillStyle = "rgba(247,220,62,1.0)"

    this.coin = new Image();
    this.coin.src = "https://t7.rbxcdn.com/ec32d38e95a89a2a79b8372d68c45548"

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    const analyzeThrottled = _.throttle(this.analyze.bind(this), 5000)

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'codefitness:toggle': () => clearStore(),
      'core:save': () => this.analyze(),
      'keyup': () => analyzeThrottled()
    }));

    window.requestAnimationFrame(this.onFrame.bind(this))
    console.log("Activate called")
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.codefitnessView.destroy();

    console.log("Deactivate called")
  },

  serialize() {
    return {
      codefitnessViewState: this.codefitnessView.serialize()
    };
  },

  drawSprite(x, y) {
    this.canvasContext.drawImage(this.coin,x,y, 70, 70 * (this.coin.height / this.coin.width));
  },

  clearSprites() {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },

  showNotifications(achievements) {
    achievements.forEach((achievement) => {
      atom.notifications.addSuccess("Achievement Unlocked: " + achievement.name, {
        detail: achievement.description,
        icon: achievement.image
      })
    })
  },

  showEffects(achievements) {
    if (achievements.length > 0) {
      vibe()

      // let first = achievements[0]
      // let text = this.editor.getText()
      // let match = first.pattern.exec(text)
      // if (match) {
      //   atom.notifications.addSuccess("Match found at index " + match.index)
      //
      //   let substring = this.editor.getText().substring(0, match.index)
      //   let matches = (substring.match(/\n/g) || [])
      //   let row = matches.length + 1
      //
      //   substring = this.editor.getText().substring(0, match.index)
      //   let newlineMatch
      //   let patt = /\n/g
      //   let lastNewlineIndex = 0
      //   while (newlineMatch = patt.exec(substring)) {
      //     lastNewlineIndex = newlineMatch.index
      //   }
      //
      //   let column = match.index - lastNewlineIndex
      //
      //   let v = atom.views.getView(this.editor)
      //   screenPos = v.pixelPositionForScreenPosition({
      //     top: column,
      //     left: row
      //   })
      //
      //   console.log(screenPos)
      //
      // }
      this.populateParticles(600,200)
    }
  },


  onFrame() {
    this.clearSprites()

    var particle
    let newParticles = []
    this.particles.forEach((particle) => {
      if (particle.alpha > 0.1) {
        if (particle.timeout > 0) {
          particle.timeout--
        } else {
          particle.dy += 1
          particle.x += particle.dx
          particle.y += particle.dy
          particle.alpha *= 0.99

          if (particle.y >= this.canvas.height) {
            particle.y = this.canvas.height - 1
            particle.dy = -particle.dy * 0.75
          }

          this.drawSprite(particle.x, particle.y)
        }

        newParticles.push(particle)
      }
    })

    this.particles = newParticles
    window.requestAnimationFrame(this.onFrame.bind(this))
  },

  populateParticles(x, y) {
    for (var i = 0; i < 100; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: 0,
        dx: 20*Math.random()-10,
        dy: 20*Math.random()-20,
        alpha: 1.0,
        timeout: 50 + (Math.random() * 100)
      })
    }
  },

  handleResponse(response) {
    const newAchievements = (response.pendingAchievements.filter((each) => {
      console.log(each)
      return !unlocked(each)
    }))

    newAchievements.forEach((each) => {
      store(each)
    })

    console.log(newAchievements)

    this.showNotifications(newAchievements)
    this.showEffects(newAchievements)
  },

  analyze() {
    console.log("Analyze called")
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      this.editor = editor
      const language = editor.getGrammar().name
      const code = editor.getText()
      call(language, code).then(this.handleResponse.bind(this))
    }
  }
};
