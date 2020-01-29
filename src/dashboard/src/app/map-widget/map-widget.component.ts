import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as L from 'leaflet';
import { IWidgetConfig } from '../../../../models/widgetConfig';
import { MapService } from './map.service';
import { Store } from '@ngrx/store';
import * as MainActions from "../main.actions";
import { AppState } from '../reducers';
import { MainState } from '../main.reducer';
import { MapPin } from '../models/mapPin';

@Component({
  selector: 'app-map-widget',
  templateUrl: './map-widget.component.html',
  styleUrls: ['./map-widget.component.css']
})
export class MapWidgetComponent implements OnInit, AfterViewInit {

  @Input()
  widgetConfig:IWidgetConfig;

  @ViewChild('mapRef') mapRef: ElementRef

  public cursor: string = "default";

  private map: any;
  private tool: string;

  constructor(private store:Store<AppState>, private mapService: MapService) {
    this.store.subscribe(state => {
      this.tool = state.main.tool;
      this.cursor = this.tool === "manualPins" ? "crosshair" : "default";
    });
  }

  ngOnInit() {
    //this.store = this.mapService.createStore();
    if (!this.widgetConfig) { return; }
   /* for (const widgetId of this.widgetConfig.subjectWidgets) {
      this.store.subscribe(layersMetadata => {
          // Get layer GeoJson for current map window bounds
          if (layersMetadata.layers && layersMetadata.layers.length > 0) {
            this.mapService.getLayerGeoJson$(layersMetadata.layers[0].id as string)
              .subscribe(response => {
                // TODO: render GeoJson on the map
                if (response.ok) {
                  let geoJson = response.body as any;
                  if (geoJson.metadata) {
                    let metadata = geoJson.metadata;
                    let centreX = (metadata.minX + metadata.maxX) / 2;
                    let centreY = (metadata.minY + metadata.maxY) / 2;
                    let centreLatLng = new L.LatLng(centreY, centreX);
                    this.map.panTo(centreLatLng);
                  }
                }
              });
          }
        });
    }
        */

    // Draw the layers on the map
  }

  ngAfterViewInit() {
    this.initMap();

    // Force map re-render to ensure all map tiles rendered. 
    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }

  private initMap(): void {

    const me = this;

    me.map = L.map(this.mapRef.nativeElement, {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(me.map);

    me.map.on('click', function(e) {
      if (me.tool === "manualPins") {
        me.store.dispatch(new MainActions.AddMapPin({ lat: e.latlng.lat, lng: e.latlng.lng }))
        L.circle([e.latlng.lat, e.latlng.lng], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(me.map);
      }
    });
  }

  private onMapClick(event) {
    console.log(event);
  }
}
