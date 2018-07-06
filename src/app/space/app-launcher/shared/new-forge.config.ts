import { Location } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { Config } from 'ngx-forge-jyas';

import { FABRIC8_FORGE_API_URL } from '../../../shared/runtime-console/fabric8-ui-forge-api';

@Injectable()
export class NewForgeConfig extends Config {

  constructor(@Inject(FABRIC8_FORGE_API_URL) private apiUrl: string) {
    super();
    let settings = {backend_url: 'TO_BE_DEFINED'};

    if (apiUrl) {
      settings['backend_url'] = Location.stripTrailingSlash(apiUrl) + '/api/';
    }

    settings['origin'] = 'osio';

    this.settings = settings;
  }
}
