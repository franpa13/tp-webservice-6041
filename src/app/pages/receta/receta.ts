import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { RecetaModel } from '../../models/receta.model';
import { RecetasService } from '../../services/recetas.service';

@Component({
  selector: 'app-receta',
  imports: [FormsModule, HlmInput, HlmButton],
  templateUrl: './receta.html',
  styleUrl: './receta.css',
})
export class Receta {
  private readonly recetaService = inject(RecetasService);

  receta: string = ""
  recetas = signal<RecetaModel[]>([])
 
  buscar() {
    this.recetaService.getRecetas(this.receta).subscribe({
      next: (data) => {
        this.recetas.set(data)
      },
    })
    error: (err: any) => {
      console.log(err, "error");

    }
  }

  traducir(receta: RecetaModel) {

  }
}
