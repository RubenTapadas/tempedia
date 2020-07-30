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
      'https://temtem-api.mael.tech/api/temtems?fields=' + filters.join()
    );
  }
}
