import { Component, inject, signal, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie.model';
import { HlmCard } from '../../../libs/card/src/lib/hlm-card';
import { HlmCardContent } from '../../../libs/card/src/lib/hlm-card-content';
import { HlmCardTitle } from '../../../libs/card/src/lib/hlm-card-title';
import { HlmBadge } from '../../../libs/badge/src/lib/hlm-badge';

@Component({
  selector: 'app-peliculas',
  imports: [SlicePipe, HlmCard, HlmCardContent, HlmCardTitle, HlmBadge],
  templateUrl: './peliculas.html',
})
export class PeliculasComponent implements OnInit {
  private readonly moviesService = inject(MoviesService);

  movies = signal<Movie[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.moviesService.getTopMovies().subscribe({
      next: (data) => {
        this.movies.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar las películas. Verificá tu API Key en environment.ts.');
        this.loading.set(false);
      },
    });
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src =
      'https://placehold.co/300x450/1a1a1a/ffffff?text=Sin+imagen';
  }
}
