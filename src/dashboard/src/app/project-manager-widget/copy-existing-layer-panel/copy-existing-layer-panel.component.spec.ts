import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyExistingLayerPanelComponent } from './copy-existing-layer-panel.component';

describe('CopyExistingLayerPanelComponent', () => {
  let component: CopyExistingLayerPanelComponent;
  let fixture: ComponentFixture<CopyExistingLayerPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyExistingLayerPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyExistingLayerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
