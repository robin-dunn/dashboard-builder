import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseExistingLayerPanelComponent } from './use-existing-layer-panel.component';

describe('UseExistingLayerPanelComponent', () => {
  let component: UseExistingLayerPanelComponent;
  let fixture: ComponentFixture<UseExistingLayerPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseExistingLayerPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseExistingLayerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
