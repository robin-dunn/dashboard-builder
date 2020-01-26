import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './models/project';
import { MapPin } from './models/mapPin';
import { Layer } from './models/layer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>("/api/project");
  }

  public addMapPin(pin: MapPin): Observable<MapPin> {
    return this.http.post<MapPin>("/api/layer/pin", pin);
  }

  public createProject(name: string): Observable<Project> {
    return this.http.post<Project>("/api/project", { name: name });
  }

  public createLayer(projectId: number): Observable<Layer> {
    return this.http.post<Layer>("/api/layer", { projectId: projectId });
  }

  public getLayers(params: { isSystemLayer: boolean, projectId?: number }): Observable<Layer[]> {
    let url =`/api/layer?isSystemLayer=${params.isSystemLayer}`;
    if (params.projectId) url += `&projectId=${params.projectId}`;
    return this.http.get<Layer[]>(url);
  }

  public uploadLayer(uploadFile: File, projectId: number, isSystemLayer: boolean = false): Observable<Layer> {

    let formData = new FormData();
    formData.append("projectId", projectId.toString());
    formData.append("isSystemLayer", isSystemLayer.toString());
    formData.append("uploadFile", uploadFile, uploadFile.name);

    return this.http.post<Layer>(`/api/layer/upload`, formData);
  }
}
