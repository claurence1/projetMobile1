import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewRuleComponent } from './detail-view-rule.component';

describe('DetailViewRuleComponent', () => {
  let component: DetailViewRuleComponent;
  let fixture: ComponentFixture<DetailViewRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailViewRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailViewRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
