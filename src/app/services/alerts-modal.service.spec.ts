import { TestBed } from '@angular/core/testing';

import { AlertsModalService } from './alerts-modal.service';

describe('AlertsModalService', () => {
  let service: AlertsModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
