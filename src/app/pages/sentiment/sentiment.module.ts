import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { SentimentRoutes } from './sentiment.routing';

import { SentimentComponent } from './sentiment.component';
import { ItemCardComponent } from './components/item-card/item-card.component';

@NgModule({
  declarations: [SentimentComponent, ItemCardComponent],
  imports: [SharedModule, RouterModule.forChild(SentimentRoutes)],
})
export class SentimentModule {}
