//input is a number, should return a negative number
//if number is already negative no need to do anything
export default (input) => {
  input = Number(input);
  if (isNaN(input)) {
    return "Enter an integer";
  } else {
    if (input === 0) {
      return 0;
    } else {
      if (input < 0) {
        return input;
      } else {
        return input * -1;
      }
    }
  }
};
