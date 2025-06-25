export default function filter_list(input) {
  // Return a new array with the strings filtered out
  return input.filter((item) => typeof item === "number");
}
