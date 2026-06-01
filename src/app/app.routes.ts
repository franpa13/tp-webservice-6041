import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'peliculas', pathMatch: 'full' },
  {
    path: 'peliculas',
    loadComponent: () => import('./pages/peliculas/peliculas').then(m => m.PeliculasComponent),
  },
  {
    path: 'autos',
    loadComponent: () => import('./pages/autos/autos').then(m => m.AutosComponent),
  },
  {
    path: 'conversor',
    loadComponent: () => import('./pages/conversor/conversor').then(m => m.ConversorComponent),
  },
  {
    path: 'audio',
    loadComponent: () => import('./pages/audio/audio').then(m => m.AudioComponent),
  },
  {
    path: 'otra-api',
    loadComponent: () => import('./pages/otra-api/otra-api').then(m => m.OtraApiComponent),
  },  {
    path: 'recetas',
    loadComponent: () => import('./pages/receta/receta').then(m => m.Receta),
  },
];
