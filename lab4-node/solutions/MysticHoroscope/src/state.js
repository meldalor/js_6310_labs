const userStates = new Map();

export const getState = (chatId) => {
  return userStates.get(chatId);
};

export const setState = (chatId, state) => {
  userStates.set(chatId, state);
};

export const clearState = (chatId) => {
  userStates.delete(chatId);
};

export const _clearAllStates = () => {
  userStates.clear();
};