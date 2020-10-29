import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricRequestComponent } from './historic-request.component';

describe('HistoricRequestComponent', () => {
  let component: HistoricRequestComponent;
  let fixture: ComponentFixture<HistoricRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
