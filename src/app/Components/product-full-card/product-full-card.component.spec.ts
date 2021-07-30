import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFullCardComponent } from './product-full-card.component';

describe('ProductFullCardComponent', () => {
  let component: ProductFullCardComponent;
  let fixture: ComponentFixture<ProductFullCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFullCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFullCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
