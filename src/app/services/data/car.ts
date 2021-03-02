export class Car{
  targa: string;
  brand: string;
  model: string;
  year: number;
  carType: CarType

  constructor(targa, brand, model, year, carType) {
    this.targa = targa;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.carType = carType;
  }
}

export class CarType{
  id: number;
  carTypeName: string;
  constructor(id, carTypeName) {
    this.id = id;
    this.carTypeName = carTypeName;
  }
}
