import { TestBed } from '@angular/core/testing';

import { VendorPanelGuard } from './vendor-panel.guard';

describe('VendorPanelGuard', () => {
  let guard: VendorPanelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VendorPanelGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
