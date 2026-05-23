import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CarMake, CarModel } from '../models/car.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CarsService {
  private readonly http = inject(HttpClient);
  private readonly BASE = 'https://car-specs.p.rapidapi.com';
  private readonly headers = {
    'x-rapidapi-key': environment.rapidApiKey,
    'x-rapidapi-host': environment.carsHost,
    'Content-Type': 'application/json',
  };

  // Cache: evita llamadas repetidas a la API
  private readonly makesCache: CarMake[] = [];
  private readonly modelsCache = new Map<number, CarModel[]>();

  getMakes(): Observable<CarMake[]> {
    if (this.makesCache.length) return of(this.makesCache);
    return this.http.get<CarMake[]>(`${this.BASE}/v2/cars/makes`, { headers: this.headers }).pipe(
      tap(makes => this.makesCache.push(...makes)),
    );
  }

  getModels(makeId: number): Observable<CarModel[]> {
    if (this.modelsCache.has(makeId)) return of(this.modelsCache.get(makeId)!);
    return this.http.get<CarModel[]>(`${this.BASE}/v2/cars/makes/${makeId}/models`, { headers: this.headers }).pipe(
      tap(models => this.modelsCache.set(makeId, models)),
    );
  }
}
