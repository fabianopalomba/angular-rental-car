export class SignUpInfo {
  name: string;
  surname: string;
  username: string;
  password: string;
  birthday: Date;

  constructor(name: string, surname:string, username: string, password: string, birthday: Date) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.password = password;
    this.birthday = birthday;
  }
}
