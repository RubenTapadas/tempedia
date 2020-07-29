import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TemtemService } from '../../services/temtem.service';
import { take, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-temtem-listing',
  templateUrl: './temtem-listing.component.html',
  styleUrls: ['./temtem-listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemtemListingComponent implements OnInit {
  constructor(private temtemService: TemtemService) {}

  temtems$ = this.temtemService.getAllTemtems().pipe(shareReplay(1));
  temtemTypes$ = this.temtemService.getAllTypes().pipe(shareReplay(1));

  ngOnInit(): void {}
}
