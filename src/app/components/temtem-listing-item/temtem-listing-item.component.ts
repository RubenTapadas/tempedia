import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-temtem-listing-item',
  templateUrl: './temtem-listing-item.component.html',
  styleUrls: ['./temtem-listing-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemtemListingItemComponent implements OnInit {

  @Input() info;

  constructor() { }

  ngOnInit(): void {
  }

}
