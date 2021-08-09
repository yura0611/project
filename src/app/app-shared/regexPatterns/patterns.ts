class Patterns {
  public regexOnlyAlphaNumeric
  public regexOnlyNumbers
  constructor() {
    // This patter validate only numbers and letters
  this.regexOnlyAlphaNumeric = /^[^\s].*[\w\d][^\s]$/;
    // This pattern validate only number
  this.regexOnlyNumbers = /^[1-9][0-9]*$/;
  }
}

export const patterns = new Patterns()
