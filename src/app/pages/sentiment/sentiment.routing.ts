import { Routes } from '@angular/router';

import { SentimentComponent } from './sentiment.component';

export const SentimentRoutes: Routes = [
  {
    path: ':symbol',
    component: SentimentComponent,
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
