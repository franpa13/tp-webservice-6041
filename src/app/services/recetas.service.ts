import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RecetaModel } from '../models/receta.model';
const headers = {
  'x-rapidapi-host': 'low-carb-recipes.p.rapidapi.com',
  'x-rapidapi-key': '2c3c94f44bmsh0b2d02685dda731p1beed7jsnf8d0835cf53d'
}
@Injectable({
  providedIn: 'root',
})
export class RecetasService {
  private http = inject(HttpClient)

  getRecetas(nameReceta: string) {
    return this.http.get<RecetaModel[]>(`https://low-carb-recipes.p.rapidapi.com/search?name=${nameReceta}&maxAddedSugar=0&limit=10`,{headers})

  }
}
