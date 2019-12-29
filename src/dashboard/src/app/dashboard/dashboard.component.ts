import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { IDashboardConfig } from '../../../../models/dashboardConfig';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  public dashboardConfig: IDashboardConfig;

  ngOnInit() {
    this.dashboardService.dashboardConfig$.subscribe((dashboard: IDashboardConfig) => {
      this.dashboardConfig = dashboard;
      console.log("DASH", dashboard);
    });
    this.dashboardService.getDashboard();
  }
}
