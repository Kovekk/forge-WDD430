import { Component, OnDestroy, OnInit } from '@angular/core';
import { MagicItem } from '../magic-item.model';
import { Subscription } from 'rxjs';
import { MagicItemsService } from '../magic-items.service';

@Component({
  selector: 'forge-magic-item-list',
  templateUrl: './magic-item-list.component.html',
  styleUrl: './magic-item-list.component.css'
})
export class MagicItemListComponent implements OnInit, OnDestroy {
  magicItems: MagicItem[] = [];
  subscription: Subscription;

  constructor(private magicItemService: MagicItemsService) {}

  ngOnInit(): void {
    // this.magicItemService.addMagicItem();
    this.magicItemService.getMagicItems();
    this.subscription = this.magicItemService.magicItemChangedEvent.subscribe(
      (magicItemList: MagicItem[]) => {
        this.magicItems = magicItemList;
      }
    );
  }

  testClick() {
    console.log(this.magicItems);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
