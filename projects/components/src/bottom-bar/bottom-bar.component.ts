import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'sl-bottom-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomBarComponent {}
