import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { TemtemService } from 'src/app/services/temtem.service';
import { take } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-temtem-listing-item',
  templateUrl: './temtem-listing-item.component.html',
  styleUrls: ['./temtem-listing-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemtemListingItemComponent implements OnInit {
  @Input() info;
  typeIcons$ = new BehaviorSubject([]);

  constructor(private temtemService: TemtemService) {}

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
  }
}

//this.typeIcons = types.filter((type) => type.name === typeName).icon
