import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { DashboardRoutes } from './dashboard.routing';

import { DashboardComponent } from './dashboard.component';
import { SearchComponent } from './components/search/search.component';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { ItemCardComponent } from './components/item-card/item-card.component';

@NgModule({
  declarations: [DashboardComponent, SearchComponent, StockListComponent, ItemCardComponent],
  imports: [SharedModule, RouterModule.forChild(DashboardRoutes)],
})
export class DashboardModule {}
