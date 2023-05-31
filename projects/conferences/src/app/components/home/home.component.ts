import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ListItemComponent, SearchBarComponent } from '@sl/components';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, CardComponent, ListItemComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly dataService = inject(DataService);

  conferences$ = this.dataService.conferences$;
  messages$ = this.dataService.messages$;

  public deleteMessage(messageId: string): void {
    this.dataService.deleteMessage(messageId);
  }
}
