import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as L from 'leaflet';
import { IWidgetConfig } from '../../../../models/widgetConfig';
import { DashboardService } from '../services/dashboard.service';
import { LayerService } from '../services/layer.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-map-widget',
  templateUrl: './map-widget.component.html',
  styleUrls: ['./map-widget.component.css']
})
export class MapWidgetComponent implements OnInit, AfterViewInit {

  @Input()
  widgetConfig:IWidgetConfig;

  @ViewChild('mapRef') mapRef: ElementRef

  private map: any;

  constructor(private dashboardService: DashboardService,
    private layerService: LayerService) { }

  ngOnInit() {
    for (const widgetId of this.widgetConfig.subjectWidgets) {
      this.layerService.getStore$(widgetId).subscribe(layersMetadata => {
          // Get layer GeoJson for current map window bounds
          if (layersMetadata.layers && layersMetadata.layers.length > 0) {
            this.layerService.getLayerGeoJson$(widgetId, layersMetadata.layers[0].id as string)
              .subscribe(response => {
                // TODO: render GeoJson on the map
                console.log("LAYER GEOJSON", response.body);
              });
          }
        });
    }

    // Draw the layers on the map
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {

    this.map = L.map(this.mapRef.nativeElement, {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
}
