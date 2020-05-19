import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSoporteComponent } from './chat-soporte.component';

describe('ChatSoporteComponent', () => {
  let component: ChatSoporteComponent;
  let fixture: ComponentFixture<ChatSoporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatSoporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
