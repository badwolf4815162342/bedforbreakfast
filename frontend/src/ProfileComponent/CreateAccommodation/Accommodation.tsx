class Accommodation {
  _id: string; //tslint:disable-line
  country: string;
  streetName: string;
  streetNumber: string;
  zipCode: string;
  city: string;
  description: string;
  numberOfBeds: number;
  constructor(
    _id: string, //tslint:disable-line
    country: string,
    streetName: string,
    streetNumber: string,
    zipCode: string,
    city: string,
    description: string,
    numberOfBeds: number,
  ) {
    this._id = _id;
    this.country = country;
    this.streetName = streetName;
    this.streetNumber = streetNumber;
    this.zipCode = zipCode;
    this.city = city;
    //TODO: longitude and latitude
    this.description = description;
    this.numberOfBeds = numberOfBeds;
    //TODO: pictures
  }
}

export default Accommodation;
