const events = {};

export const subscribe = (event, callback, customEvents = events) => {
  if (!customEvents[event]) {
    customEvents[event] = [];
  }
  customEvents[event].push(callback);
};

export const publish = (event, data = {}, customEvents = events) => {
  if (!customEvents[event]) return;
  customEvents[event].forEach(callback => callback(data));
};
