import { TestBed } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import {
    DependencyCheck
} from 'ngx-forge';

import { AppLauncherDependencyCheckService } from './app-launcher-dependency-check.service';


function initTestBed() {
  TestBed.configureTestingModule({
    imports: [HttpModule],
    providers: [
        AppLauncherDependencyCheckService,
        {
            provide: XHRBackend, useClass: MockBackend
        }
    ]
  });
}

describe('Service: AppLauncherDependencyCheckService', () => {
  let appLauncherDependencyCheckService: AppLauncherDependencyCheckService;
  let mockService: MockBackend;
  let dependencyCheck = {
    mavenArtifact: 'booster-mission-runtime',
    groupId: 'io.openshift.booster',
    projectName: 'app-test-1',
    projectVersion: '1.0.0',
    spacePath: '/myspace'
  } as DependencyCheck;

  beforeEach(() => {
    initTestBed();
    appLauncherDependencyCheckService = TestBed.get(AppLauncherDependencyCheckService);
    mockService = TestBed.get(XHRBackend);
  });

  it('Get project dependencies', () => {
    mockService.connections.subscribe((connection: any) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: JSON.stringify(dependencyCheck),
            status: 200
          })
        ));
    });
    appLauncherDependencyCheckService.getDependencyCheck().subscribe((val) => {
        expect(val).toEqual(dependencyCheck);
    });
  });

  it('validate Project Name', () => {
    let valProjectName = appLauncherDependencyCheckService.validateProjectName(dependencyCheck.projectName);
    expect(valProjectName).toBeTruthy();
  });

  it('validate validateArtifact Id', () => {
    let valArtifactId = appLauncherDependencyCheckService.validateArtifactId(dependencyCheck.mavenArtifact);
    expect(valArtifactId).toBeTruthy();
  });

  it('validate validateGroupId', () => {
    let valGroupId = appLauncherDependencyCheckService.validateGroupId(dependencyCheck.groupId);
    expect(valGroupId).toBeTruthy();
  });

  it('validate validateProjectVersion', () => {
    let valProjectVersion = appLauncherDependencyCheckService.validateProjectVersion(dependencyCheck.projectVersion);
    expect(valProjectVersion).toBeTruthy();
  });

});
