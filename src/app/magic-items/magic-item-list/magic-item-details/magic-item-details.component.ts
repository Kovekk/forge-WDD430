import { Component, OnInit } from '@angular/core';
import { MagicItem } from '../../magic-item.model';
import { MagicItemsService } from '../../magic-items.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'forge-magic-item-details',
  templateUrl: './magic-item-details.component.html',
  styleUrl: './magic-item-details.component.css'
})
export class MagicItemDetailsComponent implements OnInit {
  selectedMagicItem: MagicItem;

  constructor(
    private magicItemService: MagicItemsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const id = params["id"];
        this.selectedMagicItem = this.magicItemService.getMagicItem(id);
      }
    )
  }

  onDelete() {
    this.magicItemService.deleteMagicItem(this.selectedMagicItem);
    this.router.navigate(['/magic-items'], {relativeTo: this.activatedRoute});
  }
}
