import { Component } from '@angular/core';
import { CommonService } from './shared/services/commonService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mugulix';

  constructor(public _commonService: CommonService) {}
}
