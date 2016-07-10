"use babel"

export const setIntervalX = (callback, delay, repetitions) => {
  let x = 0;
  let intervalID = window.setInterval(() => {
     callback();
     if (++x === repetitions) {
         window.clearInterval(intervalID);
     }
  }, delay);
}
