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

  iconEvolveFirst =
    'https://gamepedia.cursecdn.com/temtem_gamepedia_en/thumb/5/55/Priority_Low.png/50px-Priority_Low.png?version=62d81f25829d74eee2196aaed7a31520';
  iconEvolveSecond =
    'https://gamepedia.cursecdn.com/temtem_gamepedia_en/thumb/b/b8/Priority_Normal.png/50px-Priority_Normal.png?version=8a4bb5bef79884df8c834a5dfd83a997';

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

  getNextEvoInfo(temtem) {
    const nextEvo = temtem.evolution.evolutionTree.some(
      (et) => et.stage === temtem.evolution.stage + 1
    );

    const currentInfo = temtem.evolution.evolutionTree.find(
      (et) => et.stage === temtem.evolution.stage
    );

    return nextEvo ? currentInfo : '';
  }
}
