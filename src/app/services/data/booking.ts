import {Car, CarType} from './car';
import {User} from './auth/user';

export class Booking{
  id?: number;
  approved? : boolean;
  user: User;
  initialDate: Date;
  finalDate: Date;
  car: Car;

  constructor(user, initialDate, finalDate, car, approved?,id?) {
    this.user = user;
    this.initialDate = initialDate;
    this.finalDate = finalDate;
    this.car = car;
    this.approved = approved;
    this.id = id;
  }

}
