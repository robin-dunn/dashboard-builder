import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  constructor(private http: HttpClient) {
  }

  public getLayers() : Observable<any> {
    return this.http.get("/api/layer");
  }
}
