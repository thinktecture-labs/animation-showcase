import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardComponent,
  Conference,
  ConferenceInfoDrawerComponent,
  getCSSPropertyValue,
  slideInOutAnimationFactory,
  staggerFadeFactory,
} from '@sl/components';
import { DataService } from '../../data.service';
import { BehaviorSubject } from 'rxjs';
import { query, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-conferences',
  standalone: true,
  imports: [CommonModule, CardComponent, ConferenceInfoDrawerComponent],
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('cards', [
      transition(':enter', [query(':enter', staggerFadeFactory(), { optional: true })]),
    ]),
    trigger('drawer', [
      transition(':enter', slideInOutAnimationFactory('X', '100%', '0')),
      transition(
        ':leave',
        slideInOutAnimationFactory(
          'X',
          '0',
          '100%',
          getCSSPropertyValue('--md-sys-motion-duration-short-3'),
          getCSSPropertyValue('--md-sys-motion-easing-accelerating'),
        ),
      ),
    ]),
  ],
})
export class ConferencesComponent {
  private readonly dataService = inject(DataService);

  selectedConference$ = new BehaviorSubject<Conference | undefined>(undefined);
  conferences$ = this.dataService.conferences$;
}
