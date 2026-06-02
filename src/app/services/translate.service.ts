import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
const hedears = {
  'x-rapidapi-key': '2c3c94f44bmsh0b2d02685dda731p1beed7jsnf8d0835cf53d',
  'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
}
@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private http = inject(HttpClient)

  translate(desc: string) {
    let body = {
      q: desc,
      source: "en",
      target: "es"
    }
    return this.http.post(`https://deep-translate1.p.rapidapi.com/language/translate/v2`,  body,{ headers: hedears })
  }

}
