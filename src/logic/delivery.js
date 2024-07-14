export const calculateDeliveryCharge = total => {
  if (total < 50) return 4.95;
  if (total < 90) return 2.95;

  return 0;
};
