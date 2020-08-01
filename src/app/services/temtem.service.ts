import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TemtemService {
  constructor(private http: HttpClient) {}

  getAllTypes$ = this.http
    .get('https://temtem-api.mael.tech/api/types')
    .pipe(shareReplay(1));

  getAllTemtems() {
    const filters = ['name', 'types', 'number', 'icon', 'lumaIcon'];
    return this.http.get(
      'https://temtem-api.mael.tech/api/temtems?fields=' +
        filters.join() +
        '&expand=types'
    );
  }

  getTemtem(temtemNumber) {
    return this.http.get(
      'https://temtem-api.mael.tech/api/temtems/' +
        temtemNumber +
        '?expand=traits,types'
    );
  }

  calcTypeWeaknesses(attacking: string, defeding: string[]) {
    const atk = attacking;
    const def = defeding.join();

    return this.http.get(
      'https://temtem-api.mael.tech/api/weaknesses/calculate?attacking=' +
        atk +
        '&defending=' +
        def
    );
  }

  getTemtemByNames(names: string[]): Observable<any> {
    const filters = ['name', 'types', 'number', 'icon', 'evolution'];
    return this.http.get(
      'https://temtem-api.mael.tech/api/temtems' +
        '?expand=types&fields=' +
        filters.join() +
        '&names=' +
        names.join()
    );
  }
}
