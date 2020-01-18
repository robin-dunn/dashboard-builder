import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapWidgetComponent } from './map-widget/map-widget.component';
import { ProjectManagerWidgetComponent } from './side-menu-widget/project-manager-widget.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAddLayerComponent } from './side-menu-widget/project-manager-home-panel/project-editor-panel/create-layer-panel/import-data-panel/dialog-add-layer/dialog-add-layer.component';
import { MatDialogModule, MatButtonModule, MatExpansionModule } from '@angular/material';
import { CentralStoreService } from './services/central-store.service';
import { ProjectEditorPanelComponent } from './side-menu-widget/project-manager-home-panel/project-editor-panel/project-editor-panel.component';
import { SliderViewComponent } from './slider-view/slider-view.component';
import { SlideComponent } from './slider-view/slide/slide.component';
import { HomeMenuButtonComponent } from './side-menu-widget/project-manager-home-panel/home-menu-button/home-menu-button.component';
import { SlideNavButtonComponent } from './slider-view/slide/slide-nav-button/slide-nav-button.component';
import { ExpandableViewComponent } from './expandable-view/expandable-view.component';
import { MapToolbarComponent } from './map-widget/map-toolbar/map-toolbar.component';
import { FormsModule } from '@angular/forms';
import { CreateLayerPanelComponent } from './side-menu-widget/project-manager-home-panel/project-editor-panel/create-layer-panel/create-layer-panel.component';
import { ProjectManagerHomePanelComponent } from './side-menu-widget/project-manager-home-panel/project-manager-home-panel.component';
import { ImportDataPanelComponent } from './side-menu-widget/project-manager-home-panel/project-editor-panel/create-layer-panel/import-data-panel/import-data-panel.component';
import { CopyExistingLayerPanelComponent } from './side-menu-widget/project-manager-home-panel/project-editor-panel/copy-existing-layer-panel/copy-existing-layer-panel.component';
import { ProjectListPanelComponent } from './side-menu-widget/project-manager-home-panel/project-list-panel/project-list-panel.component';
import { ProjectManagerMenuItem } from './side-menu-widget/project-manager-menu-item/project-manager-menu-item.component';
import { DataManagerPanelComponent } from './side-menu-widget/project-manager-home-panel/data-manager-panel/data-manager-panel.component';
import { SideMenuSectionComponent } from './side-menu-widget/side-menu-section/side-menu-section.component';
import { ProceedInnerButtonComponent } from './side-menu-widget/side-menu-section/proceed-inner-button/proceed-inner-button.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MapWidgetComponent,
    ProjectManagerWidgetComponent,
    DialogAddLayerComponent,
    ProjectEditorPanelComponent,
    SliderViewComponent,
    SlideComponent,
    HomeMenuButtonComponent,
    SlideNavButtonComponent,
    ExpandableViewComponent,
    MapToolbarComponent,
    CreateLayerPanelComponent,
    ProjectManagerHomePanelComponent,
    ImportDataPanelComponent,
    CopyExistingLayerPanelComponent,
    ProjectListPanelComponent,
    ProjectManagerMenuItem,
    DataManagerPanelComponent,
    SideMenuSectionComponent,
    ProceedInnerButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule
  ],
  providers: [CentralStoreService],
  bootstrap: [AppComponent],
  entryComponents: [DialogAddLayerComponent]
})
export class AppModule { }
