import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDashboardConfig } from "../../../../models/dashboardConfig";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getDashboard(): Observable<IDashboardConfig> {
    return this.http.get<IDashboardConfig>("/api/dashboard");
  }
}
