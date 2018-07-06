import { inject, TestBed } from '@angular/core/testing';
import { Broadcaster, Logger } from 'ngx-base';
import { Contexts, Spaces } from 'ngx-fabric8-wit';
import { AUTH_API_URL, AuthenticationService, UserService } from 'ngx-login-client';
import { Subject } from 'rxjs';
import { AnalyticService } from './analytics.service';
import { Fabric8UIConfig } from './config/fabric8-ui-config';
import { NotificationsService } from './notifications.service';

let fakeAuthService = {
  getToken: function() {
    return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiY2xpZW50X3Nlc3Npb24iOiJURVNUU0VTU0lPTiIsInNlc3Npb25fc3RhdGUiOiJURVNUU0VTU0lPTlNUQVRFIiwiYWRtaW4iOnRydWUsImp0aSI6ImY5NWQyNmZlLWFkYzgtNDc0YS05MTk0LWRjM2E0YWFiYzUwMiIsImlhdCI6MTUxMDU3MTMxOSwiZXhwIjoxNTEwNTgwODI3fQ.l0m6EFvk5jbND3VOXL3gTkzTz0lYQtPtXS_6C24kPQk';
  },
  isLoggedIn: function() {
    return true;
  }
};

describe('Analytics Service', () => {

  let analyticService: AnalyticService;
  let broadcaster: Broadcaster;

  class BroadcasterTestProvider {
    static broadcaster = new Broadcaster();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnalyticService,
        {
          provide: AUTH_API_URL,
          useValue: 'https://auth.fabric8.io/api/'
        },
        {
          provide: AuthenticationService,
          useValue: fakeAuthService
        },
        Fabric8UIConfig,
        {
          provide: Broadcaster,
          useValue: BroadcasterTestProvider.broadcaster
        },
        UserService,
        Contexts,
        {
          provide: NotificationsService,
          useValue: { actionSubject: new Subject<any>() }
        },
        Spaces,
        Logger
      ]
    });
  });

  beforeEach(inject(
    [AnalyticService, Broadcaster],
    (service: AnalyticService, broadcast: Broadcaster) => {
      analyticService = service;
      broadcaster = broadcast;
    }
  ));

  it('Ensure AnalyticsService is injectable', () => {
    expect(analyticService.analytics).not.toBeTruthy();
  });
});
