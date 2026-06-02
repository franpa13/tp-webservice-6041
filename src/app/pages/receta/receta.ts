import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { RecetaModel } from '../../models/receta.model';
import { RecetasService } from '../../services/recetas.service';
import { TranslateService } from '../../services/translate.service';
import { HlmIcon } from "@spartan-ng/helm/icon";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCar, lucideLoader, lucideX } from '@ng-icons/lucide';

@Component({
  selector: 'app-receta',
  imports: [FormsModule, HlmInput, HlmButton, HlmIcon, NgIcon, HlmButton, HlmIcon],
  providers: [provideIcons({ lucideCar, lucideX, lucideLoader })],
  templateUrl: './receta.html',
  styleUrl: './receta.css',
})
export class Receta {
  private readonly recetaService = inject(RecetasService);
  private readonly translateService = inject(TranslateService);

  receta: string = ""
  recetas = signal<RecetaModel[]>([])
  openModal = signal(false)
  loading = signal(false)
  traducido = signal("")
  buscar() {
    this.recetaService.getRecetas(this.receta).subscribe({
      next: (data) => {
        this.recetas.set(data)
      },
      error: (err: any) => {
        console.log(err, "error");
      }
    })
  }

  traducir(desc: string) {

    this.openModal.set(true)
    this.loading.set(true)
    this.translateService.translate(desc).subscribe({
      next: (data: any) => {
        this.traducido.set(data.data.translations.translatedText)
        this.loading.set(false)
      },
      error: (err: any) => {
        console.log(err, "error");
        this.loading.set(false)
      }
    })
  }

  closeModal() {
 
    this.loading.set(false)
    this.traducido.set("")
    this.openModal.set(false)
  }
}
