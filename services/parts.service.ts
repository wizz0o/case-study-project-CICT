import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PartsService {
  apiUrl = 'http://localhost/computer_parts_api/api.php';

  constructor(private http: HttpClient) {}

  getParts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addPart(part: any): Observable<any> {
    return this.http.post(this.apiUrl, part);
  }

  updatePart(part: any): Observable<any> {
    return this.http.put(this.apiUrl, part);
  }

  deletePart(id: number): Observable<any> {
    return this.http.request('DELETE', this.apiUrl, { body: { id } });
  }
}