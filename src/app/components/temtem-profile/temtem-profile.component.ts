import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemtemService } from 'src/app/services/temtem.service';
import { take } from 'rxjs/operators';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-temtem-profile',
  templateUrl: './temtem-profile.component.html',
  styleUrls: ['./temtem-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemtemProfileComponent implements OnInit {
  temtem$: Observable<any> = this.temtemService.getTemtem(
    this.data.temtemNumber
  );
  weak$ = new BehaviorSubject(null);
  resistant$ = new BehaviorSubject(null);

  evolutions$ = new BehaviorSubject(null);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public temtemService: TemtemService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      /* this.temtemService
        .getTemtem(this.data.temtemNumber)
        .pipe(take(1))
        .subscribe((temtem) => {
          console.log({ temtem });
        }); */

      combineLatest(this.temtemService.getAllTypes$, this.temtem$)
        .pipe(take(1))
        .subscribe(([types, temtem]) => {
          (types as any).forEach((type) => {
            this.temtemService
              .calcTypeWeaknesses(
                type.name,
                temtem.types.map((type) => type.name)
              )
              .pipe(take(1))
              .subscribe((calc) => {
                const attacking = (calc as any).attacking;

                if ((calc as any).result === 2) {
                  if (
                    this.weak$.value &&
                    !this.weak$.value.some((weak) => weak === attacking)
                  ) {
                    this.weak$.next([...this.weak$.value, type]);
                  } else {
                    this.weak$.next([type]);
                  }
                } else if ((calc as any).result === 0.5) {
                  if (
                    this.resistant$.value &&
                    !this.resistant$.value.some((weak) => weak === attacking)
                  ) {
                    this.resistant$.next([...this.resistant$.value, type]);
                  } else {
                    this.resistant$.next([type]);
                  }
                }
              });
          });

          if (temtem.evolution.evolves) {
            this.temtemService
              .getTemtemByNames(
                temtem.evolution.evolutionTree.map((evo) => evo.name)
              )
              .pipe(take(1))
              .subscribe((evo) => this.evolutions$.next(evo));
          }
        });
    }
  }
}
