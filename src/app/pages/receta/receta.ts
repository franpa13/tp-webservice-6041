import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { RecetaModel } from '../../models/receta.model';
import { RecetasService } from '../../services/recetas.service';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-receta',
  imports: [FormsModule, HlmInput, HlmButton],
  templateUrl: './receta.html',
  styleUrl: './receta.css',
})
export class Receta {
  private readonly recetaService = inject(RecetasService);
  private readonly translateService = inject(TranslateService);
  receta: string = ""
  recetas = signal<RecetaModel[]>([])
  openModal = signal(false)
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
    this.translateService.translate(desc).subscribe({
      next: (data: any) => {
        return this.traducido.set(data.data.translations.translatedText)
      },
      error: (err: any) => {
        console.log(err, "error");
      }
    })
  }
  closeModal() {
    this.openModal.set(false)
  }
}
