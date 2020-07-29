import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-temtem-listing-item',
  templateUrl: './temtem-listing-item.component.html',
  styleUrls: ['./temtem-listing-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemtemListingItemComponent implements OnInit {
  @Input() info;
  @Input() typeIcons;

  constructor() {}

  ngOnInit(): void {}

  findTypeIcon(typeName: string): string {
    return this.typeIcons.find((type) => type.name === typeName).icon;
  }
}
