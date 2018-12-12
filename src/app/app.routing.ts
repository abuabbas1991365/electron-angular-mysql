/*import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [{
  path: '',
  component: FullComponent,
  children: [{ 
    path: '', 
    redirectTo: '/starter', 
    pathMatch: 'full' 
  }, {
    path: '',
    loadChildren: './material-component/material.module#MaterialComponentsModule'
  }, {
    path: 'starter',
    loadChildren: './starter/starter.module#StarterModule'
  }]
}];

*/
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';

const AppRoute: Routes = [
   {  path:'',redirectTo:'login',pathMatch:'full'},
   {  path:'login', component:LoginComponent},
{
  path: '',
  component: FullComponent,
  children: [{ 
    path: '', 
    redirectTo: '/starter', 
    pathMatch: 'full' 
  }, {
    path: '',
    loadChildren: './material-component/material.module#MaterialComponentsModule'
  }, {
    path: 'starter',
    loadChildren: './starter/starter.module#StarterModule'
  }]
},




  
 
];

export const AppRoutes = RouterModule.forRoot(AppRoute);
