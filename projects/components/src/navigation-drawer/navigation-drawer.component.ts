import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DRAWER_ANIMATIONS } from './navigation-drawer.animations';

@Component({
  selector: 'sl-navigation-drawer',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatRippleModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
  ],
  templateUrl: './navigation-drawer.component.html',
  styleUrls: ['./navigation-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: DRAWER_ANIMATIONS,
})
export class NavigationDrawerComponent {
  @HostBinding('@drawerInit')
  init = true;
}
