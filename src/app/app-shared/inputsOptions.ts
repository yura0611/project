 class InputsOptions {
  constructor(public titleLength, public descriptionLength) {
    this.titleLength = titleLength;
    this.descriptionLength = descriptionLength;
  }
}

export const options = new InputsOptions(200, 800);
