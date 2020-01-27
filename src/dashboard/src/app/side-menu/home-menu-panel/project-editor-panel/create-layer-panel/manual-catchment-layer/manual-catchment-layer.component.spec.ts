import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualCatchmentLayerComponent } from './manual-catchment-layer.component';

describe('ManualCatchmentLayerComponent', () => {
  let component: ManualCatchmentLayerComponent;
  let fixture: ComponentFixture<ManualCatchmentLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualCatchmentLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualCatchmentLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
