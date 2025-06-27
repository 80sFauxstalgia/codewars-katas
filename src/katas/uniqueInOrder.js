//Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements with the same value next to each other and preserving the original order of elements.

export default (input) => {
  if (typeof input === "string") {
    input = input.split("");
  }

  if (!input || input.length === 0) return [];

  let output = [input[0]];
  for (let i = 1; i < input.length; i++) {
    if (input[i] !== input[i - 1]) {
      output.push(input[i]);
    }
  }
  return output;
};
