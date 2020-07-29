import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemtemOptionsComponent } from './temtem-options.component';

describe('TemtemOptionsComponent', () => {
  let component: TemtemOptionsComponent;
  let fixture: ComponentFixture<TemtemOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemtemOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemtemOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
