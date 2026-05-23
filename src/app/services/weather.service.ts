import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, map } from 'rxjs';
import { GeoResponse, GeoLocation, WeatherResponse } from '../models/weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly http = inject(HttpClient);

  searchCity(name: string): Observable<GeoLocation[]> {
    return this.http
      .get<GeoResponse>('https://geocoding-api.open-meteo.com/v1/search', {
        params: { name, count: '5', language: 'es', format: 'json' },
      })
      .pipe(map(res => res.results ?? []));
  }

  getWeather(lat: number, lon: number): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat.toString(),
        longitude: lon.toString(),
        current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day',
        timezone: 'auto',
        forecast_days: '1',
      },
    });
  }

  getCityWeather(name: string): Observable<{ location: GeoLocation; weather: WeatherResponse }> {
    return this.searchCity(name).pipe(
      switchMap(locations => {
        const loc = locations[0];
        return this.getWeather(loc.latitude, loc.longitude).pipe(
          map(weather => ({ location: loc, weather })),
        );
      }),
    );
  }
}
