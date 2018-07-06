import { Injectable } from '@angular/core';

import { AuthHelperService } from 'ngx-forge-jyas';

@Injectable()
export class AuthAPIProvider extends AuthHelperService {

  constructor(private apiUrl: string) {
    super();
  }

  getAuthApiURl(): any {
    return this.apiUrl;
  }
}
