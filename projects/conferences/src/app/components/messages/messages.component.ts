import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent, slideDeletAnimation, slideFadeAnimationFactory } from '@sl/components';
import { DataService } from '../../data.service';
import { query, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, ListItemComponent],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('messages', [transition(':enter', [query(':enter', slideFadeAnimationFactory())])]),
    trigger('messageItem', [transition(':leave', [slideDeletAnimation()])]),
  ],
})
export class MessagesComponent {
  private readonly dataService = inject(DataService);
  messages$ = this.dataService.messages$;

  public deleteMessage(messageId: string): void {
    this.dataService.deleteMessage(messageId);
  }
}
