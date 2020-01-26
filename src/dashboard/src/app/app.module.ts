import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapWidgetComponent } from './map-widget/map-widget.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAddLayerComponent } from './side-menu/home-menu-panel/project-editor-panel/create-layer-panel/import-data-panel/dialog-add-layer/dialog-add-layer.component';
import { MatDialogModule, MatButtonModule, MatExpansionModule } from '@angular/material';
import { CentralStoreService } from './services/central-store.service';
import { ProjectEditorPanelComponent } from './side-menu/home-menu-panel/project-editor-panel/project-editor-panel.component';
import { SliderViewComponent } from './slider-view/slider-view.component';
import { SlideComponent } from './slider-view/slide/slide.component';
import { HomeMenuButtonComponent } from './side-menu/home-menu-panel/home-menu-button/home-menu-button.component';
import { SlideNavButtonComponent } from './slider-view/slide/slide-nav-button/slide-nav-button.component';
import { ExpandableViewComponent } from './expandable-view/expandable-view.component';
import { MapToolbarComponent } from './map-widget/map-toolbar/map-toolbar.component';
import { FormsModule } from '@angular/forms';
import { CreateLayerPanelComponent } from './side-menu/home-menu-panel/project-editor-panel/create-layer-panel/create-layer-panel.component';
import { HomeMenuPanelComponent } from './side-menu/home-menu-panel/home-menu-panel.component';
import { ImportDataPanelComponent } from './side-menu/home-menu-panel/project-editor-panel/create-layer-panel/import-data-panel/import-data-panel.component';
import { CopyExistingLayerPanelComponent } from './side-menu/home-menu-panel/project-editor-panel/copy-existing-layer-panel/copy-existing-layer-panel.component';
import { ProjectListPanelComponent } from './side-menu/home-menu-panel/project-list-panel/project-list-panel.component';
import { ProjectManagerMenuItem } from './side-menu/project-manager-menu-item/project-manager-menu-item.component';
import { DataManagerPanelComponent } from './side-menu/home-menu-panel/data-manager-panel/data-manager-panel.component';
import { SideMenuSectionComponent } from './side-menu/side-menu-section/side-menu-section.component';
import { ProceedInnerButtonComponent } from './side-menu/side-menu-section/proceed-inner-button/proceed-inner-button.component';
import { DataManagerViewComponent } from './data-manager-view/data-manager-view.component';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './effects';
import { reducers } from './reducers';
import { ManualPinLayerComponent } from './side-menu/home-menu-panel/project-editor-panel/create-layer-panel/manual-pin-layer/manual-pin-layer.component';
import { SelectFeatureComponent } from './side-menu/home-menu-panel/project-editor-panel/create-layer-panel/manual-pin-layer/select-feature/select-feature.component';
import { DesignAndBuildComponent } from './side-menu/home-menu-panel/project-editor-panel/create-layer-panel/manual-pin-layer/design-and-build/design-and-build.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MapWidgetComponent,
    SideMenuComponent,
    DialogAddLayerComponent,
    ProjectEditorPanelComponent,
    SliderViewComponent,
    SlideComponent,
    SlideNavButtonComponent,
    ExpandableViewComponent,
    MapToolbarComponent,
    CreateLayerPanelComponent,
    HomeMenuPanelComponent,
    HomeMenuButtonComponent,
    ImportDataPanelComponent,
    CopyExistingLayerPanelComponent,
    ProjectListPanelComponent,
    ProjectManagerMenuItem,
    DataManagerPanelComponent,
    SideMenuSectionComponent,
    ProceedInnerButtonComponent,
    DataManagerViewComponent,
    ManualPinLayerComponent,
    SelectFeatureComponent,
    DesignAndBuildComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects)
  ],
  providers: [CentralStoreService],
  bootstrap: [AppComponent],
  entryComponents: [DialogAddLayerComponent]
})
export class AppModule { }
