import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardComponent,
  ListItemComponent,
  Message,
  SearchBarComponent,
  ViewTransitionDirective,
  ViewTransitionStore,
} from '@sl/components';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    CardComponent,
    ListItemComponent,
    RouterLink,
    ViewTransitionDirective,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly dataService = inject(DataService);
  private appStore = inject(ViewTransitionStore);

  conferences$ = this.dataService.conferences$;
  messages$ = this.dataService.messages$;
  recentOpenedDetails$ = this.appStore.triggerElementId$;

  trackMessageById = (index: number, { id }: Message) => id;

  public deleteMessage(messageId: string): void {
    this.dataService.deleteMessage(messageId);
  }
}
