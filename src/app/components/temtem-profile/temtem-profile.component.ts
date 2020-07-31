import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemtemService } from 'src/app/services/temtem.service';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-temtem-profile',
  templateUrl: './temtem-profile.component.html',
  styleUrls: ['./temtem-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemtemProfileComponent implements OnInit {
  temtem$ = new BehaviorSubject(null);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private temtemService: TemtemService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.temtemService
        .getTemtem(this.data.temtemNumber)
        .pipe(take(1))
        .subscribe((temtem) => this.temtem$.next(temtem));
    }
  }
}
