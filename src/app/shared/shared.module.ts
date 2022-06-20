import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ButtonComponent } from './components/button/button.component';
import { StockCardComponent } from './components/stock-card/stock-card.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [ButtonComponent, StockCardComponent, LoadingComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [ButtonComponent, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule, StockCardComponent, LoadingComponent],
})
export class SharedModule {}
