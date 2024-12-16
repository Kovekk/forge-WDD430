import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MagicItem } from '../magic-item.model';
import { MagicItemsService } from '../magic-items.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'forge-magic-item-edit',
  templateUrl: './magic-item-edit.component.html',
  styleUrl: './magic-item-edit.component.css'
})
export class MagicItemEditComponent implements OnInit {
  magicItem: MagicItem;
  originalMagicItem: MagicItem;
  editMode = false;

  constructor(
    private magicItemService: MagicItemsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        if (!id) {
          this.editMode = false;
          return;
        }
        this.originalMagicItem = this.magicItemService.getMagicItem(id);
        if (!this.originalMagicItem) {
          return;
        }
        this.editMode = true;
        this.magicItem = JSON.parse(JSON.stringify(this.originalMagicItem));
      }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    if (!value['attunement']) {
      value['attunement'] = false;
    }

    let newItem = new MagicItem(null, value['name'], value['category'], value['type'], value['rarity'], value['description'], value['attunement']);

    if (this.editMode == true) {
      this.magicItemService.editMagicItem(this.originalMagicItem, newItem);
    } else {
      this.magicItemService.addMagicItem(newItem);
    }
    this.router.navigate(['/magic-items']);
  }

  onCancel() {
    this.router.navigate(['/magic-items']);
  }

}
