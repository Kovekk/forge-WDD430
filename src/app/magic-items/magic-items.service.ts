import { Injectable } from '@angular/core';
import { MagicItem } from './magic-item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class MagicItemsService {
  magicItems: MagicItem[] = [];
  magicItemChangedEvent = new Subject<MagicItem[]>();
  selectedMagicItem: MagicItem;
  magicItemSelectedEvent = new Subject<MagicItem>();

  constructor(private http: HttpClient) {}

  // get all magic items
  getMagicItems() {
    this.http.get<MagicItem[]>('http://localhost:3000/magic-items')
    .subscribe(
      (magicItems: MagicItem[]) => {
      this.magicItems = magicItems;
      // this.magicItems.sort((a: MagicItem, b: MagicItem): number => {
      //   if (a.name < b.name) {return -1}
      //   else if (a.name > b.name) {return 1}
      //   else {return 0};
      // });
      this.sortSend();
      },
      (error: any) => {
        console.log("ERROR: cannot get all magic items.")
        console.log(error);
      }
    )
  }

  // get one magic item
  getMagicItem(id: string): MagicItem | null {
    for (let i = 0; i < this.magicItems.length; i++) {
      if (this.magicItems[i]._id == id) {
        return this.magicItems[i];
      }
    }
    return null;
  }

  // add a new magic item
  addMagicItem(magicItem: MagicItem) {
    if (!magicItem) {return;}

    const headers = new HttpHeaders({'Content-Type':'application/json'});

    // Test item for database
    // const newMagicItem = new MagicItem(null, "sword", "weapon", "longsword", "common", "just a normal sword probably", false);

    this.http.post('http://localhost:3000/magic-items', magicItem, {headers: headers})
    .subscribe((responseData: {message: string, magicItem: MagicItem}) => {
      this.magicItems.push(responseData.magicItem);
      this.sortSend();
    });
  }

  // edit a magic item
  editMagicItem(oldMagicItem: MagicItem, newMagicItem: MagicItem) {
    if (!oldMagicItem || !newMagicItem) {return;}

    const pos = this.magicItems.findIndex(m => m._id == oldMagicItem._id);
    if (pos < 0) {return;}

    newMagicItem._id = oldMagicItem._id;

    const headers = new HttpHeaders({"Content-Type": "application/json"});

    this.http.put("http://localhost:3000/magic-items/" + oldMagicItem._id, newMagicItem, {headers: headers})
    .subscribe((response: Response) => {
      this.magicItems[pos] = newMagicItem;
      this.sortSend();
    })
  }

  // delete magic item
  deleteMagicItem(magicItem: MagicItem) {
    if (!magicItem) {return;}

    const pos = this.magicItems.findIndex(m => m._id == magicItem._id);
    if (pos < 0) {return;}

    this.http.delete("http://localhost:3000/magic-items/" + magicItem._id)
    .subscribe((response: Response) => {
      this.magicItems.splice(pos, 1);
      this.sortSend();
    });
  }

  // sort magic items and send to component
  sortSend() {
    const clone = this.magicItems.slice();
    this.magicItemChangedEvent.next(clone);
  }
}
