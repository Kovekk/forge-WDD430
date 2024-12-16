import { Component, OnInit } from '@angular/core';
import { Spell } from '../spell.model';
import { NgForm } from '@angular/forms';
import { SpellsService } from '../spells.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'forge-spell-edit',
  templateUrl: './spell-edit.component.html',
  styleUrl: './spell-edit.component.css'
})
export class SpellEditComponent implements OnInit {
  spell: Spell;
  originalSpell: Spell;
  editMode = false;

  constructor(
    private spellService: SpellsService,
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
        this.originalSpell = this.spellService.getSpell(id);
        if (!this.originalSpell) {
          return;
        }
        this.editMode = true;
        this.spell = JSON.parse(JSON.stringify(this.originalSpell));
      }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    if (!value['ritual']) {
      value['ritual'] = false;
    }
    if (!value['concentration']) {
      value['concentration'] = false;
    }
    let newSpell = new Spell(null, value["name"], value["description"], value["range"], value["components"], value["ritual"], value["duration"], value["concentration"], value["castingTime"], value["level"], value["school"], value["damage"]);
    if (this.editMode == true) {
      console.log(this.originalSpell);
      console.log(newSpell);
      this.spellService.editSpell(this.originalSpell, newSpell);
    } else {
      this.spellService.addSpell(newSpell);
    }
    this.router.navigate(['/spells']);
  }

  onCancel() {
    this.router.navigate(['/spells']);
  }
}
