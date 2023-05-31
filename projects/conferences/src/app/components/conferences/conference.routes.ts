import { Routes } from '@angular/router';
import { ConferenceDetailComponent } from './conference-detail/conference-detail.component';
import { ConferencesComponent } from './conferences.component';

const conferenceRoutes: Routes = [
  { path: '', component: ConferencesComponent },
  { path: ':id', component: ConferenceDetailComponent },
];

export default conferenceRoutes;
