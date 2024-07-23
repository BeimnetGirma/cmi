// Trims text to a specified number of words
function trimExcerpt(text: string, limit = 20) {
  const words = text.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + "...";
  }
  return text;
}
export { trimExcerpt };
