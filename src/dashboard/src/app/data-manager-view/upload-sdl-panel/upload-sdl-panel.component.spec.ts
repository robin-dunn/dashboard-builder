import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSdlPanelComponent } from './upload-sdl-panel.component';

describe('UploadSdlPanelComponent', () => {
  let component: UploadSdlPanelComponent;
  let fixture: ComponentFixture<UploadSdlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSdlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSdlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
