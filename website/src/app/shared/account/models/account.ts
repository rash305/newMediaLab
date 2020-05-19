export class Account {
  username: string;
  password: string;
  emailAddress: string;

  constructor(username: string, password: string, emailAddress: string) {
    this.username = username;
    this.password = password;
    this.emailAddress = emailAddress;
  }
}
