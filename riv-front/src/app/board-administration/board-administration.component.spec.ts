import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAdministrationComponent } from './board-administration.component';

describe('BoardAdministrationComponent', () => {
  let component: BoardAdministrationComponent;
  let fixture: ComponentFixture<BoardAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
