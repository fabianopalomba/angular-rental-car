export class User {
  id?: number;
  name: string;
  surname: string;
  username: string;
  birthday: Date;
  roles?: string[];

  constructor(id: number, name: string, surname:string, username: string, birthday: Date, roles: string[]) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.birthday = birthday;
    this.roles = roles;
  }
}
