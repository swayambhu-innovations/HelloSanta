import { TestBed } from '@angular/core/testing';

import { EventSchedulerService } from './event-scheduler.service';

describe('EventSchedulerService', () => {
  let service: EventSchedulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventSchedulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
