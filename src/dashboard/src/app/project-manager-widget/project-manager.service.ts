import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ProjectManagerStore } from "./ProjectManagerStore";
import { CentralStoreService } from '../services/central-store.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {

  store: ProjectManagerStore;
  storeSubject: Subject<ProjectManagerStore>;

  constructor(
    private centralStoreService: CentralStoreService,
    private http: HttpClient) {

    this.store = new ProjectManagerStore();
    //this.centralStoreService.registerStore(this.constructor.name, storeId, this.store);
    this.storeSubject = new Subject<ProjectManagerStore>();
  }

  public subscribeToStore(selector: any) {
    this.storeSubject.subscribe(selector);
  }

  public updateStore(mutation: any) {
    mutation(this.store);
    console.log(this.store);
    this.storeSubject.next(this.store);
  }

  public createProject$(): Observable<HttpResponse<Object>> {

    let httpResponseSubject = new Subject<HttpResponse<Object>>();

    this.http.post('/api/project', { test: "test" },  {observe: 'response'})
      .subscribe(response => {
        if (response.ok) {
          this.updateStore(store => store.project = response.body);
        }
        httpResponseSubject.next(response);
      });

    return httpResponseSubject;
  }

  public getLayers() {
    this.http.get("/api/layer")
      .subscribe(responseBody => {
        this.updateStore(store => store.layers = responseBody as Object[]);
      });
  }

  public uploadLayer$(uploadFile: File): Observable<HttpResponse<Object>> {

    let httpResponseSubject = new Subject<HttpResponse<Object>>();

    let formData = new FormData();
    formData.append("uploads[]", uploadFile, uploadFile.name);

    this.http.post('/api/layer', formData,  {observe: 'response'})
      .subscribe(response => {
        if (response.status === 201) {
          this.updateStore(store => store.layers = store.layers.concat([response.body as any]));
        }
        httpResponseSubject.next(response);
      });

    return httpResponseSubject;
  }
}
