import { Component, Input, OnInit } from '@angular/core';
import { IDataSentiment } from '../../../../shared/models/sentiment';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
})
export class ItemCardComponent implements OnInit {
  @Input() sentiments!: IDataSentiment[];

  constructor() {}

  ngOnInit(): void {}
}
