import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ProjectManagerStore } from "./projectManagerStore";

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {

  store: ProjectManagerStore = new ProjectManagerStore();

  constructor(
    private http: HttpClient) {
  }

  public createProject$(): Observable<HttpResponse<Object>> {

    let httpResponseSubject = new Subject<HttpResponse<Object>>();

    this.http.post('/api/project', { test: "test" },  { observe: "response" })
      .subscribe(response => {
        if (response.ok) {
          this.store.update(store => store.project = response.body);
        }
        httpResponseSubject.next(response);
      });

    return httpResponseSubject;
  }

  public openProject(projectId: number) {
    console.log("open project");
  }

  public getLayers() {
    this.http.get("/api/layer")
      .subscribe(responseBody => {
        this.store.update(store => store.layers = responseBody as Object[]);
      });
  }

  public uploadLayer$(uploadFile: File): Observable<HttpResponse<Object>> {

    let httpResponseSubject = new Subject<HttpResponse<Object>>();

    let formData = new FormData();
    formData.append("uploads[]", uploadFile, uploadFile.name);

    this.http.post('/api/layer', formData,  {observe: 'response'})
      .subscribe(response => {
        if (response.ok) {
          this.store.update(store => store.layers = store.layers.concat([response.body as any]));
        }
        httpResponseSubject.next(response);
      });

    return httpResponseSubject;
  }
}
