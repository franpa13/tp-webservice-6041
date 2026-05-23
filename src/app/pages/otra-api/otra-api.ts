import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideSearch, lucideLoader, lucideWind, lucideDroplets,
  lucideThermometer, lucideMapPin, lucideRefreshCw,
} from '@ng-icons/lucide';
import { WeatherService } from '../../services/weather.service';
import { GeoLocation, WeatherResponse } from '../../models/weather.model';
import { HlmButton } from '../../../libs/button/src/lib/hlm-button';
import { HlmIcon } from '../../../libs/icon/src/lib/hlm-icon';
import { HlmInput } from '../../../libs/input/src/lib/hlm-input';
import { DecimalPipe } from '@angular/common';

interface WmoInfo { desc: string; emoji: string; bg: string; }

const WMO: Record<number, WmoInfo> = {
  0:  { desc: 'Cielo despejado',       emoji: '☀️',  bg: 'from-amber-400 to-orange-300'   },
  1:  { desc: 'Mayormente despejado',   emoji: '🌤️', bg: 'from-amber-300 to-sky-300'       },
  2:  { desc: 'Parcialmente nublado',   emoji: '⛅',  bg: 'from-sky-400 to-slate-300'       },
  3:  { desc: 'Nublado',               emoji: '☁️',  bg: 'from-slate-400 to-slate-300'     },
  45: { desc: 'Niebla',               emoji: '🌫️', bg: 'from-slate-300 to-slate-200'      },
  48: { desc: 'Niebla con escarcha',   emoji: '🌫️', bg: 'from-slate-300 to-slate-200'      },
  51: { desc: 'Llovizna ligera',       emoji: '🌦️', bg: 'from-sky-400 to-blue-300'         },
  53: { desc: 'Llovizna moderada',     emoji: '🌧️', bg: 'from-sky-500 to-blue-400'         },
  61: { desc: 'Lluvia ligera',         emoji: '🌧️', bg: 'from-blue-500 to-blue-400'        },
  63: { desc: 'Lluvia moderada',       emoji: '🌧️', bg: 'from-blue-600 to-blue-500'        },
  65: { desc: 'Lluvia intensa',        emoji: '🌧️', bg: 'from-blue-700 to-blue-600'        },
  71: { desc: 'Nieve ligera',          emoji: '❄️',  bg: 'from-sky-200 to-indigo-200'       },
  80: { desc: 'Chubascos ligeros',     emoji: '🌦️', bg: 'from-sky-400 to-blue-300'         },
  95: { desc: 'Tormenta eléctrica',    emoji: '⛈️',  bg: 'from-slate-700 to-slate-600'     },
};

@Component({
  selector: 'app-otra-api',
  imports: [FormsModule, DecimalPipe, NgIcon, HlmButton, HlmIcon, HlmInput],
  providers: [provideIcons({ lucideSearch, lucideLoader, lucideWind, lucideDroplets, lucideThermometer, lucideMapPin, lucideRefreshCw })],
  templateUrl: './otra-api.html',
})
export class OtraApiComponent {
  private readonly weatherService = inject(WeatherService);

  cityInput = '';
  loading = signal(false);
  error = signal<string | null>(null);
  location = signal<GeoLocation | null>(null);
  weather = signal<WeatherResponse | null>(null);

  search(): void {
    if (!this.cityInput.trim()) return;
    this.loading.set(true);
    this.error.set(null);
    this.weather.set(null);

    this.weatherService.getCityWeather(this.cityInput.trim()).subscribe({
      next: ({ location, weather }) => {
        this.location.set(location);
        this.weather.set(weather);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Ciudad no encontrada. Intentá con otro nombre.');
        this.loading.set(false);
      },
    });
  }

  formatTime(iso: string): string {
    return iso.replace('T', ' ').slice(0, 16);
  }

  getWmo(code: number): WmoInfo {
    // busca el código exacto o el más cercano hacia abajo
    const found = WMO[code];
    if (found) return found;
    const keys = Object.keys(WMO).map(Number).sort((a, b) => b - a);
    const match = keys.find(k => k <= code);
    return match !== undefined ? WMO[match] : { desc: 'Desconocido', emoji: '🌡️', bg: 'from-slate-400 to-slate-300' };
  }
}
