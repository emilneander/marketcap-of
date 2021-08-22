export const vibrate = (duration) => {
  if (!window) {
    return;
  }

  if (!window.navigator) {
    return;
  }

  if (!window.navigator.vibrate) {
    return;
  }

  window.navigator.vibrate(duration);
};
