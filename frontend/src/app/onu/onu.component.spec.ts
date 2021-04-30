import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnuComponent } from './onu.component';

describe('OnuComponent', () => {
  let component: OnuComponent;
  let fixture: ComponentFixture<OnuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
