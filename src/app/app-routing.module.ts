import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatTableFilterComponent} from "./mat-table-filter/mat-table-filter.component";
import {HomePageComponent} from "./home-page/home-page.component";
// import {CanActivateViaQueryParam} from "./can-activate-via-query-params.duard";

const routes: Routes = [
  {
    path: 'app-mat-table-filter',
    // canActivate: [CanActivateViaQueryParam],
    component: MatTableFilterComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
