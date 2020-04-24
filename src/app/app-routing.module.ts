import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // auto navigate to dashboard & change '/' path to '/dashboard'
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent }, // tells the router to match that URL to path: 'heroes' and display the HeroesComponent when the URL is something like localhost:4200/heroes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // configure the router at the application's root level, and performs the initial navigation based on the current browser URL
  exports: [RouterModule], // it will be available throughout the app
})
export class AppRoutingModule { }
