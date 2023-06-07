import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rider } from '../models/rider';

@Injectable({
  providedIn: 'root'
})
export class RiderService {

  private url = 'http://localhost:8080/rider'
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(this.url + '/getAll')
  }

  delete(id: number): Observable<any>{
    return this.http.post(this.url + '/' + id + '/delete', null)
  }

  add(rider: Rider): Observable<any>{
    return this.http.post(this.url, rider)
  }

  view(ver: any, r: Rider): Observable<any>{
    return this.http.get(this.url)
  }

  update(rider: Rider): Observable<any>{
    return this.http.post(this.url + '/' + rider.id + '/update', rider)
  }
  
}
