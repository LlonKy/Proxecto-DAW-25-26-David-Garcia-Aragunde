import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangesComponent } from './exchanges.component';

describe('ExchangesComponent', () => {
  let component: ExchangesComponent;
  let fixture: ComponentFixture<ExchangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExchangesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
