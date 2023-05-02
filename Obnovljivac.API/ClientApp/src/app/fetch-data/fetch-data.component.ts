import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { WeatherForecast } from '../models/weather-forecast';
import { WindService } from '../services/wind.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
})
export class FetchDataComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private windService: WindService) {}
  ngOnInit(): void {
    this.windService
      .getWeatherForecast()
      .pipe(take(1))
      .subscribe((data) => {
        this.forecasts = data;
      });
  }
}
