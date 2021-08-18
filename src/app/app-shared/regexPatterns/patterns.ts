class Patterns {
  public regexOnlyAlphaNumeric;
  public regexOnlyNumbers;
  public regexEmail;
  constructor() {
    // /^[^\s]+^[\w ]*[^\W_][\w ]*$/
    // This patter validate only numbers and letters
    // without white spaces on start/end of string
  this.regexOnlyAlphaNumeric = /^[\w ]*[^\W_][\w ]*$/
    // This pattern validate only number
  this.regexOnlyNumbers = /^[1-9][0-9]*$/;
    // This pattern validate email
    this.regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  }
}

export const patterns = new Patterns()
