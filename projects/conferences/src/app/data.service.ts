import { Injectable } from '@angular/core';
import { Conference, Message } from '@sl/components';
import { BehaviorSubject, Observable, of } from 'rxjs';

const MESSAGES_DATA: Message[] = [
  { id: '11', author: 'So Duri', shorthand: 'SD' },
  { id: '12', author: 'Dim Sum', shorthand: 'DS' },
  { id: '13', author: 'Lorem Ipsum', shorthand: 'LI' },
  { id: '14', author: 'Max Mustermann', shorthand: 'MM' },
  { id: '15', author: 'Sandra Müller', shorthand: 'SM' },
  { id: '17', author: 'Michael Gonzales', shorthand: 'MG' },
];

const CONFERENCES_DATA: Conference[] = [
  {
    id: '1',
    title: 'BASTA!',
    imageUrl: 'https://basta.net/wp-content/uploads/2023/02/BASTA_MZ23_OpenGraph_v1b.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid blanditiis debitis delectus dolore earum error eum ex ipsum itaque maiores minus nam nesciunt, nostrum numquam placeat quasi quia sequi!',
  },
  {
    id: '2',
    title: 'Angular Days',
    imageUrl:
      'https://javascript-days.de/wp-content/uploads/2022/01/JSD_MUC21_Kombibanner_FB_1200x600_63404_v1.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid blanditiis debitis delectus dolore earum error eum ex ipsum itaque maiores minus nam nesciunt, nostrum numquam placeat quasi quia sequi!',
  },
  {
    id: '3',
    title: 'DWX',
    imageUrl: 'https://www.developer-week.de/app/uploads/2022/07/DWX23_1500x500-Twitter.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid blanditiis debitis delectus dolore earum error eum ex ipsum itaque maiores minus nam nesciunt, nostrum numquam placeat quasi quia sequi!',
  },
  {
    id: '4',
    title: 'MD Dev-Days',
    imageUrl: 'https://md-devdays.de/assets/Banner_LandingPage.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid blanditiis debitis delectus dolore earum error eum ex ipsum itaque maiores minus nam nesciunt, nostrum numquam placeat quasi quia sequi!',
  },
  {
    id: '5',
    title: 'iJS',
    imageUrl:
      'https://javascript-conference.com/wp-content/uploads/2020/02/IJS_20_Website_OpenGraph_1200x630_56631_v2.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid blanditiis debitis delectus dolore earum error eum ex ipsum itaque maiores minus nam nesciunt, nostrum numquam placeat quasi quia sequi!',
  },
];

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private messages = MESSAGES_DATA;
  conferences$: Observable<Conference[]> = of(CONFERENCES_DATA);
  messages$$ = new BehaviorSubject<Message[]>(this.messages);
  messages$ = this.messages$$.asObservable();

  public getMessage(messageId: string): Observable<Message> {
    return of(MESSAGES_DATA.filter(({ id }) => id === messageId)?.[0]);
  }

  public deleteMessage(messageId: string): void {
    this.messages = this.messages.filter(({ id }) => id !== messageId);

    this.messages$$.next(this.messages);
  }

  public getConference(conferenceId: string): Observable<Conference> {
    return of(CONFERENCES_DATA.filter(({ id }) => id === conferenceId)?.[0]);
  }
}
