import { Component, inject, signal, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeftRight, lucideRefreshCw } from '@ng-icons/lucide';
import { CurrencyService } from '../../services/currency.service';
import { Currency } from '../../models/currency.model';
import { HlmButton } from '../../../libs/button/src/lib/hlm-button';
import { HlmIcon } from '../../../libs/icon/src/lib/hlm-icon';
import { HlmInput } from '../../../libs/input/src/lib/hlm-input';

@Component({
  selector: 'app-conversor',
  imports: [FormsModule, DecimalPipe, NgIcon, HlmButton, HlmIcon, HlmInput],
  providers: [provideIcons({ lucideArrowLeftRight, lucideRefreshCw })],
  templateUrl: './conversor.html',
})
export class ConversorComponent implements OnInit {
  private readonly currencyService = inject(CurrencyService);

  currencies = signal<Currency[]>([]);
  loading = signal(true);
  converting = signal(false);
  error = signal<string | null>(null);

  amount = 1;
  fromCurrency = 'USD';
  toCurrency = 'EUR';

  result = signal<number | null>(null);
  resultInfo = signal<{ from: string; to: string; amount: number; rate: number } | null>(null);

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe({
      next: list => {
        this.currencies.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar las monedas. Verificá tu API Key de apilayer.');
        this.loading.set(false);
      },
    });
  }

  swap(): void {
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];
    this.result.set(null);
  }

  convert(): void {
    if (!this.amount || this.amount <= 0) return;
    this.converting.set(true);
    this.result.set(null);

    this.currencyService.convert(this.fromCurrency, this.toCurrency, this.amount).subscribe({
      next: res => {
        this.result.set(res.result);
        this.resultInfo.set({
          from: res.query.from,
          to: res.query.to,
          amount: res.query.amount,
          rate: res.info.quote,
        });
        this.converting.set(false);
      },
      error: () => {
        this.error.set('Error al convertir. Verificá tu API Key.');
        this.converting.set(false);
      },
    });
  }

  getCurrencyName(code: string): string {
    return this.currencies().find(c => c.code === code)?.name ?? code;
  }
}
