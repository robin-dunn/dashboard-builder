import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapWidgetComponent } from './map-widget/map-widget.component';
import { ProjectManagerWidgetComponent } from './project-manager-widget/project-manager-widget.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAddLayerComponent } from './project-manager-widget/dialog-add-layer/dialog-add-layer.component';
import { MatDialogModule, MatButtonModule, MatExpansionModule } from '@angular/material';
import { CentralStoreService } from './services/central-store.service';
import { ProjectEditorPanelComponent } from './project-manager-widget/project-editor-panel/project-editor-panel.component';
import { SliderViewComponent } from './slider-view/slider-view.component';
import { SlideComponent } from './slider-view/slide/slide.component';
import { HomeMenuButtonComponent } from './project-manager-widget/project-manager-home-panel/home-menu-button/home-menu-button.component';
import { SlideNavButtonComponent } from './slider-view/slide/slide-nav-button/slide-nav-button.component';
import { ExpandableMenuItemComponent } from './slider-view/expandable-menu-item/expandable-menu-item.component';
import { MapToolbarComponent } from './map-widget/map-toolbar/map-toolbar.component';
import { FormsModule } from '@angular/forms';
import { CreateLayerPanelComponent } from './project-manager-widget/create-layer-panel/create-layer-panel.component';
import { ProjectManagerHomePanelComponent } from './project-manager-widget/project-manager-home-panel/project-manager-home-panel.component';
import { ImportDataPanelComponent } from './project-manager-widget/import-data-panel/import-data-panel.component';
import { CopyExistingLayerPanelComponent } from './project-manager-widget/copy-existing-layer-panel/copy-existing-layer-panel.component'

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
    ExpandableMenuItemComponent,
    MapToolbarComponent,
    CreateLayerPanelComponent,
    ProjectManagerHomePanelComponent,
    ImportDataPanelComponent,
    CopyExistingLayerPanelComponent
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
