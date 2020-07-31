import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { TemtemService } from 'src/app/services/temtem.service';
import { take } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { TemtemProfileComponent } from '../temtem-profile/temtem-profile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-temtem-listing-item',
  templateUrl: './temtem-listing-item.component.html',
  styleUrls: ['./temtem-listing-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemtemListingItemComponent implements OnInit {
  @Input() info;
  typeIcons$ = new BehaviorSubject([]);
  caught$ = new BehaviorSubject({
    lumas: [],
    temtems: [],
  });

  isCaught$ = new BehaviorSubject(false);
  isLuma$ = new BehaviorSubject(false);

  constructor(
    private ref: ChangeDetectorRef,
    private temtemService: TemtemService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.temtemService.getAllTypes$.pipe(take(1)).subscribe((types) => {
      this.typeIcons$.next(
        (types as any)
          .filter((type) => {
            return this.info.types.includes(type.name);
          })
          .map((type) => type.icon)
      );
    });

    const caught = JSON.parse(localStorage.getItem('caught'));

    if (caught) {
      this.caught$.next(caught);
    }

    if (caught?.temtems) {
      this.isCaught$.next(caught.temtems.includes(this.info.number));
    }
    if (caught?.lumas) {
      this.isLuma$.next(caught.lumas.includes(this.info.number));
    }
  }

  temtemToggle(temtemNumber) {
    let caught = JSON.parse(localStorage.getItem('caught'));
    let temtems = caught?.temtems;
    const location = caught?.temtems?.indexOf(temtemNumber);

    if (!caught) {
      caught = {
        lumas: [],
        temtems: [],
      };
      temtems = [temtemNumber];
      this.isCaught$.next(true);
    } else if (temtems.length === 0) {
      temtems = [temtemNumber];
      this.isCaught$.next(true);
    } else if (location === -1) {
      temtems.push(temtemNumber);
      this.isCaught$.next(true);
    } else {
      temtems.splice(location, 1);
      this.isCaught$.next(false);
    }

    localStorage.setItem('caught', JSON.stringify({ ...caught, temtems }));
    this.caught$.next({ ...caught, temtems });
  }

  temtemLumaToggle(lumaNumber) {
    let caught = JSON.parse(localStorage.getItem('caught'));
    let lumas = caught?.lumas;
    const location = caught?.lumas?.indexOf(lumaNumber);

    if (!caught) {
      caught = {
        lumas: [],
        temtems: [],
      };
      lumas = [lumaNumber];
      this.isLuma$.next(true);
    } else if (lumas.length === 0) {
      lumas = [lumaNumber];
      this.isLuma$.next(true);
    } else if (location === -1) {
      lumas.push(lumaNumber);
      this.isLuma$.next(true);
    } else {
      lumas.splice(location, 1);
      this.isLuma$.next(false);
    }

    localStorage.setItem('caught', JSON.stringify({ ...caught, lumas }));
    this.caught$.next({ ...caught, lumas });
  }

  openTemtem(temtemNumber) {
    this.dialog.open(TemtemProfileComponent, {
      data: { temtemNumber },
    });
  }
}
