import { Routes } from '@angular/router';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { MessagesComponent } from './messages.component';

const messageRoutes: Routes = [
  { path: '', component: MessagesComponent },
  { path: ':id', component: MessageDetailComponent },
];

export default messageRoutes;
