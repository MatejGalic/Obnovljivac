import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { WeatherForecast } from '../models/weather-forecast';

@Injectable({
  providedIn: 'root',
})
export class WindService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  public getWeatherForecast(): Observable<WeatherForecast[]> {
    return this.http
      .get<WeatherForecast[]>(this.baseUrl + 'weatherforecast')
      .pipe(
        catchError((err) => {
          return of([]);
        })
      );
  }
}
