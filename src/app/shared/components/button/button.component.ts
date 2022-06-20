import { Component, Input } from '@angular/core';

import { IButton } from '../../models/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() data!: IButton;
  @Input() disabled!: boolean;

  doAction(): void {
    this.data.action();
  }
}
