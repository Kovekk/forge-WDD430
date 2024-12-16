import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpellsComponent } from './spells/spells.component';
import { MagicItemsComponent } from './magic-items/magic-items.component';
import { SpellEditComponent } from './spells/spell-edit/spell-edit.component';
import { SpellListComponent } from './spells/spell-list/spell-list.component';
import { MagicItemEditComponent } from './magic-items/magic-item-edit/magic-item-edit.component';
import { MagicItemDetailsComponent } from './magic-items/magic-item-list/magic-item-details/magic-item-details.component';
import { NoSelectionComponent } from './magic-items/no-selection/no-selection.component';

const routes: Routes = [
  {path: '', redirectTo: '/spells', pathMatch: 'full'},
  {path: 'spells', component: SpellsComponent, children: [
    {path: '', component: SpellListComponent},
    {path: 'new', component: SpellEditComponent},
    {path: 'edit/:id', component: SpellEditComponent}
  ]},
  {path: 'magic-items', component: MagicItemsComponent, children: [
    {path: '', component: NoSelectionComponent},
    {path: 'new', component: MagicItemEditComponent},
    {path: ':id', component: MagicItemDetailsComponent},
    {path: ':id/edit', component: MagicItemEditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
