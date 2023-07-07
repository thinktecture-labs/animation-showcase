import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  BottomBarComponent,
  MediumAndLargeScreenSizeDirective,
  NavigationDrawerComponent,
  XSmallAndSmallScreenSizeDirective,
} from '@sl/components';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationDrawerComponent,
    BottomBarComponent,
    XSmallAndSmallScreenSizeDirective,
    MediumAndLargeScreenSizeDirective,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [trigger('navigation', [])],
})
export class AppComponent {}
