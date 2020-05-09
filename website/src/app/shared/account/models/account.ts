export class Account {
  private username: string;
  private password: string;
  private emailAddress: string;

  constructor(username: string, password: string, emailAddress: string) {
    this.username = username;
    this.password = password;
    this.emailAddress = emailAddress;
  }
}
