function capFirstLetter(str: string) {
  return str.charAt(0).toUpperCase().trim() + str.slice(1).toLowerCase();
}

export default capFirstLetter;
