'use babel';

import CodefitnessView from './codefitness-view';
import { CompositeDisposable } from 'atom';
import { call } from './client'

export default {

  codefitnessView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.codefitnessView = new CodefitnessView(state.codefitnessViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.codefitnessView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'codefitness:toggle': () => this.toggle(),
      'core:save': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.codefitnessView.destroy();
  },

  serialize() {
    return {
      codefitnessViewState: this.codefitnessView.serialize()
    };
  },

  displayNotifications(achievements) {
    achievements.forEach((achievement) => {
      atom.notifications.addSuccess("Achievement Unlocked: " + achievement.title, {
        detail: achievement.description
      })
    })
  },

  toggle() {
    console.log("Codefitness was toggled!");
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      call(editor.getText()).then(this.displayNotifications)
    }
  }
};
