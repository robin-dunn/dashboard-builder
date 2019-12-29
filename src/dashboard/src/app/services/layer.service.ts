import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LayerStore } from "./layerStore";

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  stores: { [id: string] : LayerStore } = {};
  subjects: { [id: string] : Subject<LayerStore> } = {};
  eventBroadcaster = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  public broadcastEvent(event: any) {
  }

  public createStore(storeId: string) {
    this.stores[storeId] = new LayerStore();
    this.subjects[storeId] = new Subject<LayerStore>();
  }

  public getStore$(storeId: string): Observable<LayerStore> {
    return this.subjects[storeId];
  }

  public getLayers(storeId: string) {
    this.http.get("/api/layer")
      .subscribe(responseBody => {
        if (!this.stores.hasOwnProperty(storeId)) {
          this.stores[storeId] = new LayerStore();
        };
        this.stores[storeId].layers = responseBody as string[];
      });
  }

  public uploadLayer$(uploadFile: File, storeId: string): Observable<HttpResponse<Object>> {

    let httpResponseSubject = new Subject<HttpResponse<Object>>();

    let formData = new FormData();
    formData.append("uploads[]", uploadFile, uploadFile.name);

    this.http.post('/api/layer', formData,  {observe: 'response'})
      .subscribe(response => {
        if (response.status === 201) {
          let store = this.stores[storeId];
          store.layers = store.layers.concat([response.body as any]);
          console.log("STORES", this.stores);
        }
        httpResponseSubject.next(response);
      });

    return httpResponseSubject;
  }
}
