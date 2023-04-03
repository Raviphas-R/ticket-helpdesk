import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EditTicketComponent } from './component/edit-ticket/edit-ticket.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: ':id', component: EditTicketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
