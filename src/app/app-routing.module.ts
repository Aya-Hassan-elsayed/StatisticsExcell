import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './component/statistics/statistics.component';
import path from 'path';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {path:'excell',component:StatisticsComponent},
  {path:'home',component:HomeComponent},
  {path:'app',component:AppComponent},

  { path: '', redirectTo: '/app', pathMatch: 'full' }, // Redirect to component1 by default

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
