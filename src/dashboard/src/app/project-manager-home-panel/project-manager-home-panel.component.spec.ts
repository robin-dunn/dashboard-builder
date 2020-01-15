import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagerHomePanelComponent } from './project-manager-home-panel.component';

describe('ProjectManagerHomePanelComponent', () => {
  let component: ProjectManagerHomePanelComponent;
  let fixture: ComponentFixture<ProjectManagerHomePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManagerHomePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManagerHomePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
