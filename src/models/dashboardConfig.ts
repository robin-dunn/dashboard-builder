import { IWidgetConfig } from "../models/widgetConfig";

export interface IDashboardConfig {
    title: string;
    widgets: IWidgetConfig[];
}