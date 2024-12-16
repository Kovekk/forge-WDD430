import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { SpellsComponent } from './spells/spells.component';
import { SpellListComponent } from './spells/spell-list/spell-list.component';
import { SpellEditComponent } from './spells/spell-edit/spell-edit.component';
import { MagicItemsComponent } from './magic-items/magic-items.component';
import { MagicItemListComponent } from './magic-items/magic-item-list/magic-item-list.component';
import { MagicItemEditComponent } from './magic-items/magic-item-edit/magic-item-edit.component';
import { MagicItemCardComponent } from './magic-items/magic-item-list/magic-item-card/magic-item-card.component';
import { MagicItemDetailsComponent } from './magic-items/magic-item-list/magic-item-details/magic-item-details.component';
import { NoSelectionComponent } from './magic-items/no-selection/no-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SpellsComponent,
    SpellListComponent,
    SpellEditComponent,
    MagicItemsComponent,
    MagicItemListComponent,
    MagicItemEditComponent,
    MagicItemCardComponent,
    MagicItemDetailsComponent,
    NoSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
