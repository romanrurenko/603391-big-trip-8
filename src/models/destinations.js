
export class ModelDestinations {
  constructor(data) {
    this.data = data;
  }

  static parseDestinations(data) {
    return new ModelDestinations(data);
  }

}
