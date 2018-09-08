import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

//------------------- PAGES -------------------------
import { LoginPageComponent } from '../login-page/login-page.component';
import { SignUpPageComponent } from '../sign-up-page/sign-up-page.component';
import { ProfileComponent } from '../profile/profile.component';
//----------------------------------------------------


const routes: Routes = 
[
 {path:"", redirectTo:"/Login", pathMatch:"full"},
 {path:"Login", component:LoginPageComponent},
 {path:"SignUp", component:SignUpPageComponent},
 {path:"Profile",component:ProfileComponent}
];
 
@NgModule({
 imports: [
   CommonModule,
   RouterModule.forRoot(routes)
 ],
 exports: [RouterModule],
 declarations: []
})

export class Routing {}
