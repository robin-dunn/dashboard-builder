import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataManagerViewComponent } from './data-manager-view.component';

describe('DataManagerViewComponent', () => {
  let component: DataManagerViewComponent;
  let fixture: ComponentFixture<DataManagerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataManagerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataManagerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
