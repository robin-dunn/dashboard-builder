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
}
