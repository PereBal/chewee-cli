import { Response } from '@angular/http';

export class ProcessedResponse {
  constructor(
    public response: any,
    public object: any
  ) {};

  toJSON() {
    return JSON.stringify(this);
  }
}
