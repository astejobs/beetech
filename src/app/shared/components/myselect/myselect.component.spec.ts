import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyselectComponent } from './myselect.component';

describe('MyselectComponent', () => {
  let component: MyselectComponent;
  let fixture: ComponentFixture<MyselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
