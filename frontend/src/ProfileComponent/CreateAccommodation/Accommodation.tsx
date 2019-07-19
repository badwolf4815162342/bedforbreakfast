class Accommodation {
  _id: string | undefined; //tslint:disable-line
  isActive: boolean;
  country: string;
  streetName: string;
  streetNumber: string;
  zipCode: string;
  city: string;
  description: string;
  district: string;
  numberOfBeds: number;
  pictures: File[];
  constructor(
    _id: string | undefined, //tslint:disable-line
    isActive: boolean,
    country: string,
    streetName: string,
    streetNumber: string,
    zipCode: string,
    city: string,
    description: string,
    district: string,
    numberOfBeds: number,
    pictures: File[],
  ) {
    this._id = _id;
    this.isActive = isActive;
    this.country = country;
    this.streetName = streetName;
    this.streetNumber = streetNumber;
    this.zipCode = zipCode;
    this.city = city;
    this.description = description;
    this.district = district;
    this.numberOfBeds = numberOfBeds;
    this.pictures = pictures;
  }
}

export default Accommodation;
