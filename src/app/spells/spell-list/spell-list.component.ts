import { Component, OnDestroy, OnInit } from '@angular/core';
import { Spell } from '../spell.model';
import { Subscription } from 'rxjs';
import { SpellsService } from '../spells.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'forge-spell-list',
  templateUrl: './spell-list.component.html',
  styleUrl: './spell-list.component.css'
})
export class SpellListComponent implements OnInit, OnDestroy {
  spells: Spell[] = [];
  subscription: Subscription;
  testID: string = "6759c9696f0a8b0b2ee8c167";

  constructor(
    private spellService: SpellsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.spellService.getSpells();
    this.subscription = this.spellService.spellChangedEvent.subscribe(
      (spellList: Spell[]) => {
        this.spells = spellList;
      }
    );
  }

  testClick() {
    const oldSpell = this.spells[0];
    const spell = new Spell(
      null, "test Spell", "This spell is here to test the editing capabilities of the database", "90 ft", "VSM", true, "Instantaneous", false, "1 Action", 4, "Evocation", "2d4 fire"
    )
    const spells = this.spellService.editSpell(oldSpell, spell);
    console.log(this.spells);
  }

  onDelete(index: number) {
    this.spellService.deleteSpell(this.spells[index]);
    this.router.navigate(['/spells'], {relativeTo: this.activatedRoute});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
