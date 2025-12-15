import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { Member } from '../features/members/member/member';
import { MemberDetailed } from '../features/members/member-detailed/member-detailed';
import { Lists } from '../features/lists/lists';
import { Messages } from '../features/messages/messages';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'members',component:Member},
    {path:'members/:id',component:MemberDetailed},
    {path:'lists',component:Lists},
    {path:'messages',component:Messages},
    {path:'**',component:Home},
];
