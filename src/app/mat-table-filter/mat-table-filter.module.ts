import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableFilterComponent} from "./mat-table-filter.component";


const routes: Routes = [
  // { path: '/', component: MatTableFilterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class MatTableFilterModule {}
