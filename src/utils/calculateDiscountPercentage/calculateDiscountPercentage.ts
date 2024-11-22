export const calculateDiscountPercentage = (
  originalPrice: number,
  discountedPrice: number
) => {
  const discountAmount = originalPrice - discountedPrice;
  const discountPercentage = (discountAmount / originalPrice) * 100;
  return discountPercentage.toFixed(0);
};
