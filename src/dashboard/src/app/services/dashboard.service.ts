import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IDashboardConfig } from "../../../../models/dashboardConfig";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public dashboardConfig$ = new Subject<IDashboardConfig>();

  public getDashboard() {
    return this.http.get<IDashboardConfig>("/api/dashboard")
      .subscribe(response => this.dashboardConfig$.next(response));
  }
}
