import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostBinding,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardComponent,
  ListItemComponent,
  Message,
  SearchBarComponent,
  slideDeletAnimation,
  zoomInAnimation,
} from '@sl/components';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { animateChild, group, query, transition, trigger } from '@angular/animations';
import { filter, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, CardComponent, ListItemComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('homeInit', [transition('void => *', [query('@*', [group([animateChild()])])])]),
    trigger('searchbarInit', [transition(':enter', zoomInAnimation())]),
    trigger('conferencesInit', [transition(':enter', zoomInAnimation())]),
    trigger('messagesInit', [transition(':enter', zoomInAnimation())]),
    trigger('messageItem', [transition(':leave', slideDeletAnimation())]),
  ],
})
export class HomeComponent implements OnInit {
  private readonly dataService = inject(DataService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  @HostBinding('@homeInit')
  init = false;

  conferences$ = this.dataService.conferences$;
  messages$ = this.dataService.messages$;

  trackMessageById = (index: number, { id }: Message) => id;

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationStart),
        take(1),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.init = true;
      });
  }

  public deleteMessage(messageId: string): void {
    this.dataService.deleteMessage(messageId);
  }
}
