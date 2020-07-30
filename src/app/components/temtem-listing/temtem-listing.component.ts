import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
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
  constructor(
    private ref: ChangeDetectorRef,
    private temtemService: TemtemService
  ) {}

  temtemsUnfiltered$ = this.temtemService.getAllTemtems().pipe(shareReplay(1));
  types$ = this.temtemService.getAllTypes$;
  temtems$ = new BehaviorSubject([]);
  filters$ = new BehaviorSubject({
    name: null,
    types: null,
    number: null,
  });
  activeTypes$ = new BehaviorSubject({});

  customOptions$ = new BehaviorSubject({
    tetemCollector: false,
    lumaHunter: false,
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

  changeFilter(fieldName: string, value: string) {
    this.filters$.pipe(take(1)).subscribe((filters) => {
      this.filters$.next({ ...(filters as any), [fieldName]: value });
    });
  }

  changeFilterType(typeName: string) {
    this.filters$.pipe(take(1)).subscribe((filters) => {
      let newTypes = filters.types;
      const location = filters.types?.indexOf(typeName);

      if (!filters.types) {
        newTypes = [typeName];
      } else if (location !== -1) {
        newTypes.splice(location, 1);
      } else {
        newTypes.push(typeName);
      }

      if (newTypes.length === 0) [(newTypes = null)];

      this.filters$.next({ ...filters, types: newTypes });

      this.activeTypes$.next(
        newTypes
          ? Object.assign(newTypes.map((type) => ({ [type]: true }))).reduce(
              (r, c) => Object.assign(r, c),
              {}
            )
          : {}
      );
    });
  }
}
