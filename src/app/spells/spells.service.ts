import { Injectable } from '@angular/core';
import { Spell } from './spell.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class SpellsService {
  spells: Spell[] = [];
  spellChangedEvent = new Subject<Spell[]>();

  constructor(private http: HttpClient) {}

  // get all spells
  getSpells() {
    this.http.get<Spell[]>('http://localhost:3000/spells')
    .subscribe(
      (spells: Spell[]) => {
      this.spells = spells;
      this.sortSend();
      },
      (error: any) => {
        console.log("ERROR: cannot get all spells.")
        console.log(error);
      }
    )
  }

  // get one spell
  getSpell (id: string): Spell | null {
    for (let i = 0; i < this.spells.length; i++) {
      if (this.spells[i]._id == id) {
        return this.spells[i];
      }
    }
    return null;
  }

  // add a new spell
  addSpell(spell: Spell) {
    if (!spell) {return;}

    const headers = new HttpHeaders({'Content-Type':'application/json'});

    this.http.post('http://localhost:3000/spells', spell, {headers: headers})
    .subscribe((responseData: {message: string, spell: Spell}) => {
      this.spells.push(responseData.spell);
      this.sortSend();
    });
  }

  // edit a spell
  editSpell(oldSpell: Spell, newSpell: Spell) {
    if (!oldSpell || !newSpell) {return;}

    const pos = this.spells.findIndex(m => m._id == oldSpell._id);
    if (pos < 0) {return;}

    newSpell._id = oldSpell._id;

    const headers = new HttpHeaders({"Content-Type": "application/json"});

    this.http.put("http://localhost:3000/spells/" + oldSpell._id, newSpell, {headers: headers})
    .subscribe((response: Response) => {
      this.spells[pos] = newSpell;
      this.sortSend();
    })
  }

  // delete spell
  deleteSpell(spell: Spell) {
    if (!spell) {return;}

    const pos = this.spells.findIndex(m => m._id == spell._id);
    if (pos < 0) {return;}

    this.http.delete("http://localhost:3000/spells/" + spell._id)
    .subscribe((response: Response) => {
      this.spells.splice(pos, 1);
      this.sortSend();
    });
  }

  // sort spells and send to component
  sortSend() {
    const clone = this.spells.slice();
    this.spellChangedEvent.next(clone);
  }
}
