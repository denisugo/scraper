// ? If the string with the number has the following format xx xxx,
// ? The this function will help to convert this string to a number format

export default (str: string): number => {
  const assertion = new RegExp("&nbsp;");
  const num = assertion.exec(str)
    ? Number(str.split("&nbsp;").join(""))
    : Number(str.split(" ").join(""));
  return num;
};
