export class User {
  constructor(public email: string,
              public password: string,
              public street1: string,
              public street2: string,
              public city: string,
              public state: string,
              public zipcode: string,
              // public address = new Address(street1, street2, city, state, zipcode),
  ) {
  }
}
