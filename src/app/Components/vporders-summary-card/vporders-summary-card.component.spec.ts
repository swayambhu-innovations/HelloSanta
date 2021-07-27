import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VPOrdersSummaryCardComponent } from './vporders-summary-card.component';

describe('VPOrdersSummaryCardComponent', () => {
  let component: VPOrdersSummaryCardComponent;
  let fixture: ComponentFixture<VPOrdersSummaryCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VPOrdersSummaryCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VPOrdersSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
