export default class carPlate {
  value: string;
  constructor(value: string) {
    if (!this.validate(value)) throw new Error("Invalid Car Plate");
    this.value = value;
  }
  validate(carPlate: string) {
    return String(carPlate)
      .toLowerCase()
      .match(/^[a-z]{3}[0-9]{4}$/);
  }
}
