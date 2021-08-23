import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApDashboardOrderItemComponent } from './ap-dashboard-order-item.component';

describe('ApDashboardOrderItemComponent', () => {
  let component: ApDashboardOrderItemComponent;
  let fixture: ComponentFixture<ApDashboardOrderItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApDashboardOrderItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApDashboardOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
