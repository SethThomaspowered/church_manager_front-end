import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PeopleComponent } from './people/people.component';
import { GroupsComponent } from './groups/groups.component';
import { MoneyComponent } from './money/money.component'; 
import { DeleteComponent } from './delete/delete.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [

  {
    path: 'people',
    component: PeopleComponent
  },
  {
    path: 'groups',
    component: GroupsComponent
  },
  {
    path: 'money',
    component: MoneyComponent
  },
  {
    path: 'delete',
    component: DeleteComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
