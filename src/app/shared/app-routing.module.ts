import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { TrendComponent } from '../components/trend/trend.component';
import { ChanneldetailComponent } from '../components/channeldetail/channeldetail.component';
import { PagenotfoundComponent } from '../components/pagenotfound/pagenotfound.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'trendingVideos', component: TrendComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'  },
  { path: '**', component: PagenotfoundComponent }
];



@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: [],
  providers:[]
})
export class AppRoutingModule { }
