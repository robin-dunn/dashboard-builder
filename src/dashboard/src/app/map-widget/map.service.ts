import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MapStore } from './mapStore';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  store: MapStore;
  storeSubject: Subject<MapStore>;

  constructor(private http: HttpClient) { }

  public createStore(): Subject<MapStore> {
    this.store = new MapStore();
    this.storeSubject = new Subject<MapStore>();
    return this.storeSubject;
  }

  public getLayerGeoJson$(layerId: string): Observable<HttpResponse<Object>> {
    return this.http.get("/api/layer/geojson/" + layerId, { observe: "response" });
  }
}
