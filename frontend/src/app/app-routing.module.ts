import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BstComponent } from './bst/bst.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OltComponent } from './olt/olt.component';
import { OnuComponent } from './onu/onu.component';
import { PopComponent } from './pop/pop.component';
import { RadioComponent } from './radio/radio.component';
import { RegisterComponent } from './register/register.component';
import { RouterComponent } from './router/router.component';
import { AfterSignin } from './Services/afterSignIn.service';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {
    path: 'home', component: HomeComponent, canActivate: [AfterSignin], children: [
    {path:'', component: ClientComponent, outlet:'app'},
    {path:'clients', component:ClientComponent, outlet:'app'},
    {path:'radios', component:RadioComponent, outlet:'app'},
    {path:'routeurs', component: RouterComponent, outlet: 'app'},
    {path:'bsts', component:BstComponent, outlet:'app'},
    {path:'olts', component: OltComponent, outlet:'app'},
    {path:'onus', component:OnuComponent, outlet: 'app'},
    {path: 'pops', component: PopComponent, outlet: 'app'}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
