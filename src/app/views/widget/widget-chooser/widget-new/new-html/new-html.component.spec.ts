import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHtmlComponent } from './new-html.component';

describe('NewHtmlComponent', () => {
  let component: NewHtmlComponent;
  let fixture: ComponentFixture<NewHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
