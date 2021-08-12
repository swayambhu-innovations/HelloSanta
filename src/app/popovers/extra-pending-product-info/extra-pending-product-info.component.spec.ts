import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExtraPendingProductInfoComponent } from './extra-pending-product-info.component';

describe('ExtraPendingProductInfoComponent', () => {
  let component: ExtraPendingProductInfoComponent;
  let fixture: ComponentFixture<ExtraPendingProductInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraPendingProductInfoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtraPendingProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
