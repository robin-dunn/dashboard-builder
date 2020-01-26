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

  public getLayers(args: { isSystemLayer: boolean, projectId?: number }): Observable<Layer[]> {
    let url =`/api/layer?isSystemLayer=${args.isSystemLayer.toString()}`;
    if (args.projectId) url += `&projectId=${args.projectId}`;
    return this.http.get<Layer[]>(url);
  }

  public uploadLayer(args: { file: File, projectId: number, isSystemLayer: boolean, layerName?: string }): Observable<Layer> {

    let formData = new FormData();
    formData.append("projectId", args.projectId.toString());
    formData.append("isSystemLayer", args.isSystemLayer.toString());
    formData.append("uploadFile", args.file, args.file.name);

    if (args.layerName){
      formData.append("layerName", args.layerName);
    }

    return this.http.post<Layer>(`/api/layer/upload`, formData);
  }
}
