import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApOrdersOptionsItemComponent } from './ap-orders-options-item.component';

describe('ApOrdersOptionsItemComponent', () => {
  let component: ApOrdersOptionsItemComponent;
  let fixture: ComponentFixture<ApOrdersOptionsItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApOrdersOptionsItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApOrdersOptionsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
