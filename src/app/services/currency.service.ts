import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Currency, CurrencyListResponse, ConvertResponse } from '../models/currency.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private readonly http = inject(HttpClient);
  private readonly BASE = 'https://api.apilayer.com/currency_data';
  private readonly headers = { apikey: environment.apiLayerKey };

  private currenciesCache: Currency[] = [];

  getCurrencies(): Observable<Currency[]> {
    if (this.currenciesCache.length) return of(this.currenciesCache);
    return this.http
      .get<CurrencyListResponse>(`${this.BASE}/list`, { headers: this.headers })
      .pipe(
        map(res =>
          Object.entries(res.currencies).map(([code, name]) => ({ code, name })),
        ),
        tap(list => (this.currenciesCache = list)),
      );
  }

  convert(from: string, to: string, amount: number): Observable<ConvertResponse> {
    return this.http.get<ConvertResponse>(`${this.BASE}/convert`, {
      headers: this.headers,
      params: { from, to, amount: amount.toString() },
    });
  }
}
