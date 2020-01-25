import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignAndBuildComponent } from './design-and-build.component';

describe('DesignAndBuildComponent', () => {
  let component: DesignAndBuildComponent;
  let fixture: ComponentFixture<DesignAndBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignAndBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignAndBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
