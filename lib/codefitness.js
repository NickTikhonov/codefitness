'use babel';

import CodefitnessView from './codefitness-view';
import { CompositeDisposable } from 'atom';

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
      'codefitness:toggle': () => this.toggle()
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

  toggle() {
    console.log('Codefitness was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
