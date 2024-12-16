import { Component, Input } from '@angular/core';
import { MagicItem } from '../../magic-item.model';

@Component({
  selector: 'forge-magic-item-card',
  templateUrl: './magic-item-card.component.html',
  styleUrl: './magic-item-card.component.css'
})
export class MagicItemCardComponent {
  @Input() magicItem: MagicItem;

}
