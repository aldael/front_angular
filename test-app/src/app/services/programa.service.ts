import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rider } from '../models/rider';
import { Programa } from '../models/programa';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  private url = 'http://localhost:8080/programa'
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(this.url + '/getAll')
  }

  delete(id: number): Observable<any>{
    return this.http.post(this.url + '/{id}/delete', null)
  }

  add(programa: Programa): Observable<any>{
    return this.http.post(this.url, programa)
  }

  view(ver: any, r: Programa): Observable<any>{
    return this.http.get(this.url)
  }

  update(programa: Programa): Observable<any>{
    return this.http.post(this.url + '/' + programa.id + '/update', programa)
  }
  
}
