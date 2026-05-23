import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TtsRequest {
  model: string;
  input: string;
  voice: string;
}

@Injectable({ providedIn: 'root' })
export class AudioService {
  private readonly http = inject(HttpClient);
  private readonly BASE = 'https://open-ai-text-to-speech1.p.rapidapi.com';
  private readonly headers = {
    'x-rapidapi-key': environment.rapidApiKey,
    'x-rapidapi-host': environment.audioHost,
    'Content-Type': 'application/json',
  };

  textToSpeech(body: TtsRequest): Observable<Blob> {
    return this.http.post(`${this.BASE}/`, body, {
      headers: this.headers,
      responseType: 'blob',
    });
  }
}
