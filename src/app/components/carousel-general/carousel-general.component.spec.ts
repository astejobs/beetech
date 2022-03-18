import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselGeneralComponent } from './carousel-general.component';

describe('CarouselGeneralComponent', () => {
  let component: CarouselGeneralComponent;
  let fixture: ComponentFixture<CarouselGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
