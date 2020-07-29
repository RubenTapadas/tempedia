import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TemtemService {
  constructor(private http: HttpClient) {}

  getAll$ = this.http.get(
    'https://temtem-api.mael.tech/api/temtems?fields=name&types&number&icon&lumaIcon'
  );
}
