import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapWidgetComponent } from './map-widget/map-widget.component';
import { ProjectManagerWidgetComponent } from './project-manager-widget/project-manager-widget.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAddLayerComponent } from './project-manager-widget/dialog-add-layer/dialog-add-layer.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { CentralStoreService } from './services/central-store.service';
import { CreateProjectComponent } from './project-manager-widget/create-project/create-project.component';
import { SliderComponent } from './slider/slider.component';
import { ProjectManagerHomeComponent } from './project-manager-widget/project-manager-home/project-manager-home.component';
import { SlideComponent } from './slider/slide/slide.component';

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
    ProjectManagerHomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [CentralStoreService],
  bootstrap: [AppComponent],
  entryComponents: [DialogAddLayerComponent]
})
export class AppModule { }
