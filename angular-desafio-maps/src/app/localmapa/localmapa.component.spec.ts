import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalmapaComponent } from './localmapa.component';

describe('LocalmapaComponent', () => {
  let component: LocalmapaComponent;
  let fixture: ComponentFixture<LocalmapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalmapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalmapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
