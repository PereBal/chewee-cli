export class User {
  constructor (
    public username: string,
    public email: string,
    public name: string,
    public first_name: string,
    public last_name: string
  ) { }

  toJSON() {
    return JSON.stringify(this);
  }
}
