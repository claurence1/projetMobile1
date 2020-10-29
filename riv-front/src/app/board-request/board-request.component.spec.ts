import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardRequestComponent } from './board-request.component';

describe('BoardRequestComponent', () => {
  let component: BoardRequestComponent;
  let fixture: ComponentFixture<BoardRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
