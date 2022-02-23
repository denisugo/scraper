export default (rating: string | undefined): number => {
  try {
    const arrRating = rating!.split(",");
    if (arrRating.length === 2) return Number(arrRating[1]);
    else return Number(arrRating[0]) * 100;
  } catch (error) {}
  return 0;
};
