const initialState = {
  basket: [],
  total: 0,
  activeCampaigns: [],
  deliveryFee: 0,
};

const state = { ...initialState };

export const getState = () => state;

export const setState = (key, value) => {
  if (state[key] === undefined) return;
  state[key] = value;
};
