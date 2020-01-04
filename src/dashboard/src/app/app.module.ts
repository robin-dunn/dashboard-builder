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
import { CreateProjectComponent } from './project-manager-widget/create-project/create-project.component';
import { SliderComponent } from './slider/slider.component';
import { SlideComponent } from './slider/slide/slide.component';
import { HomeMenuButtonComponent } from './project-manager-widget/home-menu-button/home-menu-button.component';
import { SlideNavButtonComponent } from './slider/slide/slide-nav-button/slide-nav-button.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MapWidgetComponent,
    ProjectManagerWidgetComponent,
    DialogAddLayerComponent,
    CreateProjectComponent,
    SliderComponent,
    SlideComponent,
    HomeMenuButtonComponent,
    SlideNavButtonComponent
  ],
  imports: [
    BrowserModule,
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
