import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// pages
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TrendComponent } from './components/trend/trend.component';
import { ChanneldetailComponent } from './components/channeldetail/channeldetail.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

// routing
import { AppRoutingModule } from './shared/app-routing.module';
import { RouterLinkActive, RouterModule } from '@angular/router';

// services
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PagenotfoundComponent,
    TrendComponent,
    ChanneldetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
