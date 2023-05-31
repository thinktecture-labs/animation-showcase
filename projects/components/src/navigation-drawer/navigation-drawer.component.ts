import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

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
})
export class NavigationDrawerComponent {}
