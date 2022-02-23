export default (str: string | undefined): string => {
  if (typeof str === "string") return str;
  return "Unavailable";
};
