import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Compound {
  id: number;
  name: string;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompoundService {

  private apiUrl = 'http://localhost:5000/api/compounds';

  constructor(private http: HttpClient) { }

  getCompounds(page: number, pageSize: number): Observable<Compound[]> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());

  return this.http.get<Compound[]>(this.apiUrl, { params });
}


  getCompound(id: number): Observable<Compound> {
  return this.http.get<Compound>(`${this.apiUrl}/${id}`);
}

  updateCompound(id: number, compound: Partial<Compound>): Observable<Compound> {
    return this.http.put<Compound>(`${this.apiUrl}/${id}`, compound);
  }

  getAllCompounds(): Observable<Compound[]> {
  return this.http.get<Compound[]>(this.apiUrl); // no params
}

}
