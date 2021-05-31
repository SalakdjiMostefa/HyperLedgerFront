export class Product {


  constructor(id: string, name: string, unitCost: number, imagePath: string) {
    this._id = id;
    this._name = name;
    this._unitCost = unitCost;
    this._imagePath = imagePath;
  }

  private _id: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _unitCost: number;

  get unitCost(): number {
    return this._unitCost;
  }

  set unitCost(value: number) {
    this._unitCost = value;
  }

  private _imagePath: string;

  get imagePath(): string {
    return this._imagePath;
  }

  set imagePath(value: string) {
    this._imagePath = value;
  }
}
