import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataManagerToolbarComponent } from './data-manager-toolbar.component';

describe('DataManagerToolbarComponent', () => {
  let component: DataManagerToolbarComponent;
  let fixture: ComponentFixture<DataManagerToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataManagerToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataManagerToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
