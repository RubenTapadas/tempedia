import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TemtemService } from '../../services/temtem.service';
import { take, shareReplay } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-temtem-listing',
  templateUrl: './temtem-listing.component.html',
  styleUrls: ['./temtem-listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemtemListingComponent implements OnInit {
  constructor(private temtemService: TemtemService) {}

  temtemsUnfiltered$ = this.temtemService.getAllTemtems().pipe(shareReplay(1));
  temtems$ = new BehaviorSubject([]);
  filters$ = new BehaviorSubject({
    name: null,
    types: null,
    number: null,
  });

  ngOnInit(): void {
    combineLatest(this.temtemsUnfiltered$, this.filters$).subscribe(
      ([temtemsUnfiltered, filters]) => {
        const temtems = (temtemsUnfiltered as any).filter(
          (temtem) =>
            (!filters.name ||
              temtem.name.toLowerCase().includes(filters.name.toLowerCase())) &&
            (!filters.number ||
              temtem.number.toString().includes(filters.number.toString())) &&
            (!filters.types ||
              this.arrayShareValue(temtem.types, filters.types))
        );
        this.temtems$.next(temtems as any);
      }
    );
  }

  arrayShareValue(array1: any[], array2: any[]): boolean {
    let shares = false;
    array1.forEach((entry) => {
      if (array2.includes(entry)) {
        shares = true;
      }
    });

    return shares;
  }
}
