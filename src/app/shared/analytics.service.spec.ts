import { TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { Broadcaster } from 'ngx-base';
import { Contexts, Spaces } from 'ngx-fabric8-wit';
import { UserService } from 'ngx-login-client';
import { Observable } from 'rxjs';

import { AnalyticService } from './analytics.service';
import { Fabric8UIConfig } from './config/fabric8-ui-config';
import { loggedInUser } from './context.service.mock';
import { NotificationsService } from './notifications.service';

describe('Analytic Service:', () => {
  let mockRouter: any;
  let mockBroadcaster: any;
  let mockUserService: any;
  let mockNotifications: any;
  let analyticService: AnalyticService;
  let mockNotificationsService: jasmine.SpyObj<NotificationsService>;

  beforeEach(() => {
    mockRouter = jasmine.createSpy('Router');
    mockBroadcaster = jasmine.createSpyObj('Broadcaster', ['broadcast']);
    mockUserService = jasmine.createSpyObj('UserService', ['getUserByUserId']);
    mockUserService.getUserByUserId.and.returnValue(Observable.of(loggedInUser));
    mockUserService.loggedInUser = Observable.of(loggedInUser);
    mockNotifications = jasmine.createSpy('Notifications');
    mockNotificationsService = jasmine.createSpyObj<NotificationsService>('NotificationsService', ['message']);
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: Router, useValue: mockRouter
        },
        {
          provide: Broadcaster, useValue: mockBroadcaster
        },
        {
          provide: UserService, useValue: mockUserService
        },
        {
          provide: NotificationsService, useValue: mockNotificationsService
        },
        AnalyticService,
        Contexts,
        Spaces,
        Fabric8UIConfig
      ]
    });
    analyticService = TestBed.get(AnalyticService);
  });

  it('analytics should be defined', () => {
    // given
    window.analytics = {
        'invoked': ''
    };
    let anayticsData = analyticService.analytics;
    expect(anayticsData).toBeDefined();
  });

});
