//An isogram is a word that has no repeating letters,
//  consecutive or non-consecutive.
// Implement a function that determines whether a string that
//  contains only letters is an isogram.
//  Assume the empty string is an isogram. Ignore letter case.
export default (input) => {
  input = input.toLowerCase().split("");
  let seen = {};
  for (let letter of input) {
    if (seen[letter]) {
      return false;
    }
    seen[letter] = true;
  }
  return true;
};
