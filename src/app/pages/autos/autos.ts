import { Component, inject, signal, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCar, lucideX, lucideLoader } from '@ng-icons/lucide';
import { CarsService } from '../../services/cars.service';
import { CarMake, CarModel } from '../../models/car.model';
import { HlmButton } from '../../../libs/button/src/lib/hlm-button';
import { HlmIcon } from '../../../libs/icon/src/lib/hlm-icon';
@Component({
  selector: 'app-autos',
  imports: [NgIcon, HlmButton, HlmIcon],
  providers: [provideIcons({ lucideCar, lucideX, lucideLoader })],
  templateUrl: './autos.html',
})
export class AutosComponent implements OnInit {
  private readonly carsService = inject(CarsService);

  makes = signal<CarMake[]>([]);
  loadingMakes = signal(true);
  errorMakes = signal<string | null>(null);

  selectedMake = signal<CarMake | null>(null);
  models = signal<CarModel[]>([]);
  loadingModels = signal(false);

  ngOnInit(): void {
    this.carsService.getMakes().subscribe({
      next: data => {
        this.makes.set(data);
        this.loadingMakes.set(false);
      },
      error: () => {
        this.errorMakes.set('No se pudieron cargar las marcas. Verificá tu API Key.');
        this.loadingMakes.set(false);
      },
    });
  }

  openModal(make: CarMake): void {
    this.selectedMake.set(make);
    this.models.set([]);
    this.loadingModels.set(true);

    this.carsService.getModels(make.id).subscribe({
      next: data => {
        this.models.set(data);
        this.loadingModels.set(false);
      },
      error: () => {
        this.loadingModels.set(false);
      },
    });
  }

  closeModal(): void {
    this.selectedMake.set(null);
  }
}
