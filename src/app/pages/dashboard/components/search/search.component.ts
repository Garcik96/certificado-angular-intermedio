import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IButton } from '../../../../shared/models/button';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @Input() title!: string;
  @Input() buttonSearch!: IButton;
  @Input() form!: FormGroup;
}
