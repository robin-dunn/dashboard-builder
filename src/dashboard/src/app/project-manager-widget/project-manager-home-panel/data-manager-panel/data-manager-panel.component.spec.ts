import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataManagerPanelComponent } from './data-manager-panel.component';

describe('DataManagerPanelComponent', () => {
  let component: DataManagerPanelComponent;
  let fixture: ComponentFixture<DataManagerPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataManagerPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataManagerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
