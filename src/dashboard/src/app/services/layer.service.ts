import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LayerStore } from "./layerStore";
import { CentralStoreService } from './central-store.service';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  stores: { [id: string] : LayerStore } = {};
  subjects: { [id: string] : Subject<LayerStore> } = {};

  constructor(
    private centralStoreService: CentralStoreService,
    private http: HttpClient) {
  }

  public createStore(storeId: string): Subject<LayerStore> {
    this.stores[storeId] = new LayerStore();
    this.centralStoreService.registerStore(this.constructor.name, storeId, this.stores[storeId]);
    this.subjects[storeId] = new Subject<LayerStore>();
    return this.subjects[storeId];
  }

  public getStore$(storeId: string): Observable<LayerStore> {
    return this.subjects[storeId];
  }

  private mutateStore(storeId: string, mutation: any) {
    mutation(this.stores[storeId]);
    this.subjects[storeId].next(this.stores[storeId]);
    console.log(this.centralStoreService.centralStore);
  }

  public getLayers(storeId: string) {
    this.http.get("/api/layer")
      .subscribe(responseBody => {
        this.mutateStore(storeId, store => store.layers = responseBody as Object[]);
      });
  }

  public getLayerGeoJson$(storeId: string, layerId: string): Observable<HttpResponse<Object>> {
    return this.http.get("/api/layer/geojson/" + layerId, { observe: "response" });
  }

  public uploadLayer$(uploadFile: File, storeId: string): Observable<HttpResponse<Object>> {

    let httpResponseSubject = new Subject<HttpResponse<Object>>();

    let formData = new FormData();
    formData.append("uploads[]", uploadFile, uploadFile.name);

    this.http.post('/api/layer', formData,  {observe: 'response'})
      .subscribe(response => {
        if (response.status === 201) {
          this.mutateStore(storeId, store => store.layers = store.layers.concat([response.body as any]));
        }
        httpResponseSubject.next(response);
      });

    return httpResponseSubject;
  }
}
