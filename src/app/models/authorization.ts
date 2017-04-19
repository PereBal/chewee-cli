export class Authorization {
  constructor(
    public accessToken: string,
    public tokenType: string,
    public expiresIn: number,
    public refreshToken: string,
    public scope: string,
    public userName: string
  ) { };

  serialize() {
    return JSON.stringify(this);
  }

  deserialize(JSONData) {
    const data = JSON.parse(JSONData);
    return new Authorization(
      data.accessToken,
      data.tokenType,
      data.expiresIn,
      data.refreshToken,
      data.scope,
      data.userName
    );
  }
}
