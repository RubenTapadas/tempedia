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
    public temtemService: TemtemService
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
    temtemCollector: false,
    lumaHunter: false,
  });

  profileImage$ = new BehaviorSubject('');

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
              filters.types.every((i) =>
                temtem.types.map((type) => type.name).includes(i)
              ))
        );
        this.temtems$.next(temtems as any);
      }
    );

    const customOptions = JSON.parse(localStorage.getItem('customOptions'));
    if (customOptions) {
      this.customOptions$.next(customOptions);
    }

    const profileImage = localStorage.getItem('profileImage');
    if (profileImage) {
      this.profileImage$.next(profileImage);
    }
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

  getUsername() {
    return localStorage.getItem('username') ?? '';
  }

  changeUsername(username: string) {
    localStorage.setItem('username', username);
  }

  customOptionsToggle(field: string) {
    this.customOptions$.pipe(take(1)).subscribe((customOptions) => {
      const newCustomOptions = {
        ...customOptions,
        [field]: !customOptions[field],
      };
      localStorage.setItem('customOptions', JSON.stringify(newCustomOptions));
      this.customOptions$.next(newCustomOptions);
    });
  }

  changeImage(imageUrl) {
    this.profileImage$.next(imageUrl);
    localStorage.setItem('profileImage', imageUrl);
  }

  trackByFn(index, item) {
    return item.someUniqueIdentifier;
  }
}
