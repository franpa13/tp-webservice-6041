import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private readonly http = inject(HttpClient);

  getTopMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('https://imdb-top-100-movies.p.rapidapi.com/', {
      headers: {
        'x-rapidapi-key': environment.rapidApiKey,
        'x-rapidapi-host': environment.imdbHost,
      },
    });
  }
}
