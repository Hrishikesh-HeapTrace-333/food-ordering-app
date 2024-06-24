import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandTotalBarComponent } from './grand-total-bar.component';

describe('GrandTotalBarComponent', () => {
  let component: GrandTotalBarComponent;
  let fixture: ComponentFixture<GrandTotalBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrandTotalBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrandTotalBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
