import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId:       module.id,
  selector:       'app-root',
  templateUrl:    'app.component.html',
  styleUrls:      [ 'app.component.css' ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
  appTitle: string = 'Doodlie';
 }
