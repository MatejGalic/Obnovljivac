import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  public getWind(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/wind').pipe(
      catchError((err) => {
        return of([]);
      })
    );
  }
}
