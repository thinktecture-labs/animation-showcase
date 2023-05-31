import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, Conference, ConferenceInfoDrawerComponent } from '@sl/components';
import { DataService } from '../../data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-conferences',
  standalone: true,
  imports: [CommonModule, CardComponent, ConferenceInfoDrawerComponent],
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConferencesComponent {
  private readonly dataService = inject(DataService);

  selectedConference$ = new BehaviorSubject<Conference | undefined>(undefined);
  conferences$ = this.dataService.conferences$;
}
