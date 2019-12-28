import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IDashboardConfig } from '../../../../models/dashboardConfig';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  public dashboardConfig:IDashboardConfig;

  ngOnInit() {
    this.apiService.getDashboard().subscribe((dashboard:IDashboardConfig) => {
      this.dashboardConfig = dashboard;
      console.log("DASH", dashboard);
    });
  }
}
